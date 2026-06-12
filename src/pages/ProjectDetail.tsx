import { BiArrowBack, BiPlayCircle } from 'react-icons/bi'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { getProjectById } from '../lib/projects'
import { MermaidRenderer } from '../components/MermaidRenderer'
import { Container } from '../components/Container'
import type { Section } from '../types'

function renderInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="font-mono text-sm bg-gray-100 px-1.5 py-0.5 border border-gray-200 text-gray-800">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gray-800 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-800 transition-colors">$1</a>')
}

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

function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="bg-white border border-gray-200 p-6 md:p-8">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'heading': {
            const text = renderInline(section.text)
            const shared = 'font-medium text-gray-900 tracking-tight'
            switch (section.level) {
              case 1: return <h1 key={i} className={`${shared} text-2xl mt-10 mb-4`} dangerouslySetInnerHTML={{ __html: text }} />
              case 2: return <h2 key={i} className={`${shared} text-xl mt-8 mb-3 border-b border-gray-200 pb-2`} dangerouslySetInnerHTML={{ __html: text }} />
              case 3: return <h3 key={i} className={`${shared} text-lg mt-6 mb-3`} dangerouslySetInnerHTML={{ __html: text }} />
              default: return <h4 key={i} className={`${shared} text-base mt-4 mb-2`} dangerouslySetInnerHTML={{ __html: text }} />
            }
          }
          case 'paragraph':
            return (
              <p
                key={i}
                className="text-base text-gray-600 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: renderInline(section.text) }}
              />
            )
          case 'mermaid':
            return <div key={i} className="mb-6"><MermaidRenderer code={section.code} /></div>
          case 'code': {
            const isHighlighted = ['json', 'yaml', 'bash', 'ts', 'tsx'].includes(section.lang)
            return (
              <div key={i} className="mb-6">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 border border-gray-200 border-b-0">
                  <span className="w-2 h-2 bg-gray-400" />
                  <span className="w-2 h-2 bg-gray-300" />
                  <span className="w-2 h-2 bg-gray-400" />
                  <span className="text-xs tracking-wider text-gray-500 ml-2">{section.lang}</span>
                </div>
                <pre className="bg-white border border-gray-200 p-5 overflow-x-auto text-sm leading-relaxed font-mono">
                  {isHighlighted ? (
                    <code dangerouslySetInnerHTML={{ __html: highlightJsonLike(section.code) }} />
                  ) : (
                    <code>{section.code}</code>
                  )}
                </pre>
              </div>
            )
          }
          case 'list': {
            const ListTag = section.ordered ? 'ol' : 'ul'
            const listClasses = section.ordered
              ? 'space-y-1.5 mb-4 ml-5 list-decimal marker:text-gray-400'
              : 'space-y-1.5 mb-4 ml-5 list-disc marker:text-gray-400'
            return (
              <ListTag key={i} className={listClasses}>
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-base text-gray-600 leading-relaxed pl-1"
                    dangerouslySetInnerHTML={{ __html: renderInline(item) }}
                  />
                ))}
              </ListTag>
            )
          }
          case 'table':
            return (
              <div key={i} className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {section.headers.map((h, j) => (
                        <th
                          key={j}
                          className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-medium text-gray-900"
                          dangerouslySetInnerHTML={{ __html: renderInline(h) }}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="border border-gray-200 px-4 py-2 text-gray-600"
                            dangerouslySetInnerHTML={{ __html: renderInline(cell) }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-gray-300 pl-4 py-1 mb-4 text-gray-500 italic"
                dangerouslySetInnerHTML={{ __html: renderInline(section.text) }}
              />
            )
          case 'hr':
            return <hr key={i} className="border-t border-gray-200 my-8" />
          default:
            return null
        }
      })}
    </div>
  )
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

  const challengeSectionIdx = project.sections.findIndex(
    (s) => s.type === 'heading' && (s.text === 'Challenges & Solutions' || s.text.startsWith('Challenges'))
  )

  const overviewSections = challengeSectionIdx >= 0
    ? project.sections.slice(0, challengeSectionIdx)
    : project.sections

  const challengeSections = challengeSectionIdx >= 0
    ? project.sections.slice(challengeSectionIdx)
    : null

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
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm px-2.5 py-1 border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              {tech}
            </span>
          ))}
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
            <SectionRenderer sections={overviewSections} />
          ) : challengeSections ? (
            <SectionRenderer sections={challengeSections} />
          ) : (
            <div className="space-y-6">
              {project.challenges.map((c, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-xs text-gray-400 tracking-wider block mb-1.5">PROBLEM</span>
                      <p className="text-base text-gray-900 leading-relaxed">{c.problem}</p>
                      <div className="w-8 h-px bg-gray-200 my-5" />
                      <span className="text-xs text-gray-400 tracking-wider block mb-1.5">SOLUTION</span>
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
