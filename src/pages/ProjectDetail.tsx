import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { getProjectById } from '../lib/projects'
import { MermaidRenderer } from '../components/MermaidRenderer'

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-semibold text-neutral-900 mt-10 mb-4 tracking-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-3 border-b border-neutral-100 pb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-neutral-800 mt-4 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-[0.95rem] text-neutral-600 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 mb-4 ml-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 mb-4 ml-5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[0.95rem] text-neutral-600 leading-relaxed pl-1 marker:text-neutral-400">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-neutral-900">{children}</strong>
  ),
  code: ({ className, children }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="font-mono text-[0.85em] bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-800">
          {children}
        </code>
      )
    }
    const lang = className?.replace('language-', '') ?? ''
    if (lang === 'mermaid') {
      return <MermaidRenderer code={String(children).trim()} />
    }
    if (lang === 'json' || lang === 'yaml' || lang === 'bash' || lang === 'ts' || lang === 'tsx') {
      return (
        <div className="mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-neutral-800 rounded-t-lg border-b border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-neutral-400 ml-2">{lang}</span>
          </div>
          <pre className="bg-neutral-900 text-neutral-100 rounded-b-lg p-5 overflow-x-auto text-[0.85rem] leading-relaxed font-mono">
            <code>{children}</code>
          </pre>
        </div>
      )
    }
    return (
      <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 overflow-x-auto mb-6 text-[0.85rem] leading-relaxed font-mono">
        <code>{children}</code>
      </pre>
    )
  },
  pre: ({ children }) => <>{children}</>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-neutral-300 pl-4 py-1 mb-4 text-neutral-500 italic">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-colors">
      {children}
    </a>
  ),
  hr: () => <hr className="border-t border-neutral-200 my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse text-[0.9rem]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-neutral-200 bg-neutral-50 px-4 py-2 text-left font-semibold text-neutral-900">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-neutral-200 px-4 py-2 text-neutral-600">{children}</td>
  ),
}

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = id ? getProjectById(id) : undefined
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges'>('overview')

  if (!project) {
    return (
      <div className="max-w-[1000px] mx-auto px-6 pt-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
        <Link to="/projects" className="text-neutral-500 hover:text-neutral-900 underline">
          ← Back to projects
        </Link>
      </div>
    )
  }

  const overviewContent = project.content
    .replace(/^---[\s\S]*?---\n*/, '')
    .replace(/## Challenges & Solutions[\s\S]*$/, '')

  const challengesContent = project.content.match(/## Challenges & Solutions[\s\S]*$/)
    ? project.content.match(/## Challenges & Solutions[\s\S]*$/)![0]
    : ''

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <button
        onClick={() => navigate('/projects')}
        className="group font-mono text-sm text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-2 mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        BACK TO PROJECTS
      </button>

      <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
        [PROJECT / {project.id.toUpperCase()}]
      </span>

      <div className="flex justify-between items-baseline flex-wrap gap-2 mb-3">
        <h1 className="text-[clamp(1.5rem,4vw,2.2rem)] font-semibold text-neutral-900 tracking-tight">{project.title}</h1>
        <span className="font-mono text-[0.8rem] text-neutral-400">{project.role}</span>
      </div>
      <p className="text-[0.95rem] text-neutral-500 max-w-[800px] mb-6 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.75rem] px-2.5 py-1 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-all"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {project.metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-200 flex flex-col gap-1.5"
          >
            <span className="font-mono text-[0.65rem] text-neutral-400 tracking-[0.08em] uppercase">{metric.label}</span>
            <span className="font-mono text-base font-semibold text-neutral-900">{metric.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-8 border-b border-neutral-200">
        {[
          { key: 'overview' as const, label: 'Architecture & Flow' },
          { key: 'challenges' as const, label: 'Challenges & Solutions' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="prose-custom">
        {activeTab === 'overview' ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {overviewContent}
            </ReactMarkdown>
          </div>
        ) : challengesContent ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {challengesContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="space-y-6">
            {project.challenges.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-sm font-semibold text-red-600 font-mono">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <span className="font-mono text-[0.7rem] text-red-500 uppercase tracking-[0.15em] block mb-1.5">PROBLEM</span>
                    <p className="text-[0.95rem] text-neutral-900 leading-relaxed">{c.problem}</p>
                    <div className="w-8 h-0.5 bg-neutral-200 my-5" />
                    <span className="font-mono text-[0.7rem] text-emerald-600 uppercase tracking-[0.15em] block mb-1.5">SOLUTION</span>
                    <p className="text-[0.95rem] text-neutral-600 leading-relaxed">{c.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-10 pt-8 border-t border-neutral-200">
        {project.demo && (
          <button
            onClick={() => navigate(project.demo!)}
            className="bg-neutral-900 text-white border border-neutral-900 px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-all hover:bg-neutral-800 active:scale-[0.98]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Live Demo
          </button>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="bg-transparent text-neutral-900 border border-neutral-200 px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-all hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.98]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          Source Code
        </a>
      </div>
    </div>
  )
}
