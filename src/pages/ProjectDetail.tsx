import { BiArrowBack, BiPlayCircle } from 'react-icons/bi'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getProjectById } from '../lib/projects'
import { getTechIcon } from '../lib/techIcons'
import { MermaidRenderer } from '../components/MermaidRenderer'
import { Container } from '../components/Container'
import type { Components } from 'react-markdown'
import type { TableSchema } from '../types'

function highlightJsonLike(code: string): string {
  const esc = code
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

  return esc.split('\n').map(line => {
    const tokens: string[] = []
    let i = 0
    while (i < line.length) {
      const rest = line.slice(i)
      const key = rest.match(/^("(?:[^"\\]|\\.)*?")\s*(?=:)/)
      if (key) {
        tokens.push(`<span class="text-gray-700">${key[1]}</span>`)
        i += key[0].length
        continue
      }
      const str = rest.match(/^"(?:[^"\\]|\\.)*?"/)
      if (str) {
        tokens.push(`<span class="text-gray-600">${str[0]}</span>`)
        i += str[0].length
        continue
      }
      const typ = rest.match(/^(boolean|string|number|object|array|null|undefined|never|any|void|symbol|bigint|true|false)\b/)
      if (typ) {
        tokens.push(`<span class="text-gray-800 font-semibold">${typ[0]}</span>`)
        i += typ[0].length
        continue
      }
      const num = rest.match(/^(\d+\.?\d*)\b/)
      if (num) {
        tokens.push(`<span class="text-gray-500">${num[0]}</span>`)
        i += num[0].length
        continue
      }
      const com = rest.match(/^(\/\/.*)/)
      if (com) {
        tokens.push(`<span class="text-gray-400 italic">${com[0]}</span>`)
        i += com[0].length
        continue
      }
      tokens.push(line[i])
      i++
    }
    return tokens.join('')
  }).join('\n')
}

function TableGroup({ tables }: { tables: TableSchema[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
      {tables.map((table, j) => (
        <div key={j} className="border border-gray-200 bg-white">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{table.name}</span>
            <span className="text-xs text-gray-400 tabular-nums">{table.cols} cols</span>
          </div>
          {table.fields.length > 0 && (
            <div className="divide-y divide-gray-100">
              {table.fields.map((f, k) => (
                <div key={k} className="px-4 py-2 text-xs text-gray-600 flex items-baseline gap-2">
                  <span className="font-mono text-gray-900">{f.field}</span>
                  <span className="text-gray-400">{f.type}</span>
                  <span className={f.nullable === 'No' ? 'text-gray-900' : 'text-gray-400'}>
                    {f.nullable === 'No' ? '\u00B7 NOT NULL' : '\u00B7 nullable'}
                  </span>
                  {f.default && f.default !== '' && f.default !== 'NULL' && (
                    <span className="text-gray-400">\u00B7 default {f.default}</span>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="px-4 py-2.5 border-t border-gray-200">
            <span className="text-xs text-gray-500 leading-relaxed">{table.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">{children}</a>
  ),
  code: ({ className, children }) => {
    const lang = className?.replace('language-', '') || ''
    const code = String(children).replace(/\n$/, '')

    if (lang === 'mermaid') {
      return <div className="mb-6"><MermaidRenderer code={code} /></div>
    }

    if (lang === 'table-group') {
      try {
        const tables = JSON.parse(code) as TableSchema[]
        return <TableGroup tables={tables} />
      } catch {
        return <pre className="bg-red-50 border border-red-200 p-4 text-sm text-red-700">Invalid table-group JSON</pre>
      }
    }

    if (!className) {
      return <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 border border-gray-200 text-gray-800">{children}</code>
    }

    const isHighlighted = ['json', 'yaml', 'bash', 'ts', 'tsx'].includes(lang)
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 border border-gray-200 border-b-0">
          <span className="w-2 h-2 bg-gray-400" />
          <span className="w-2 h-2 bg-gray-300" />
          <span className="w-2 h-2 bg-gray-400" />
          <span className="text-xs tracking-wider text-gray-500 ml-2">{lang}</span>
        </div>
        <pre className="bg-white border border-gray-200 p-5 overflow-x-auto text-sm leading-relaxed font-mono">
          {isHighlighted ? (
            <code dangerouslySetInnerHTML={{ __html: highlightJsonLike(code) }} />
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    )
  },
  pre: ({ children }) => <>{children}</>,
}

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = id ? getProjectById(id) : undefined
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges'>('overview')

  if (!project) {
    return (
      <div className="pt-16 text-center">
        <Container>
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Project not found</h1>
          <Link to="/projects" className="text-gray-700 hover:underline">
            ← Back to projects
          </Link>
        </Container>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-10 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <button
          onClick={() => navigate('/projects')}
          className="group text-sm text-gray-400 hover:text-black transition-colors inline-flex items-center gap-2 mb-6"
        >
          <BiArrowBack className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          BACK TO PROJECTS
        </button>

        <div className="flex justify-between items-baseline flex-wrap gap-2 mb-3">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight">{project.title}</h1>
          <span className="text-sm text-gray-400">{project.role}</span>
        </div>
        <p className="text-base text-gray-600 max-w-3xl mb-6 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => {
            const Icon = getTechIcon(tech)
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1 border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {tech}
              </span>
            )
          })}
        </div>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center px-6 bg-black text-white text-sm font-medium transition hover:bg-gray-800 active:bg-gray-900 mb-10"
          >
            <span className="relative flex items-center gap-2">
              <BiPlayCircle className="w-4 h-4" />
              Live Demo
            </span>
          </a>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-5 bg-gray-50 border border-gray-200 flex flex-col gap-1.5"
            >
              <span className="text-xs text-gray-400 tracking-wider">{metric.label}</span>
              <span className="text-base font-medium text-gray-900 tabular-nums">{metric.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-1 mb-8 border-b border-gray-200">
          {[
            { key: 'overview' as const, label: 'Architecture & Flow' },
            { key: 'challenges' as const, label: 'Challenges & Solutions' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-black'
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        <div className="prose-custom">
          {activeTab === 'overview' ? (
            <div className="prose prose-gray max-w-none bg-white border border-gray-200 p-6 md:p-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {project.body}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="space-y-6">
              {project.challenges.map((c, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-xs tracking-wider block mb-1.5 text-red-600">PROBLEM</span>
                      <p className="text-base text-gray-900 leading-relaxed">{c.problem}</p>
                      <div className="w-8 h-px bg-gray-200 my-5" />
                      <span className="text-xs tracking-wider block mb-1.5 text-green-600">SOLUTION</span>
                      <p className="text-base text-gray-600 leading-relaxed">{c.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
