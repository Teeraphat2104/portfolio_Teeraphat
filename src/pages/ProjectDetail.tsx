import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getProjectById } from '../lib/projects'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = id ? getProjectById(id) : undefined
  const [activeTab, setActiveTab] = useState<'architecture' | 'challenges'>('architecture')
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mermaidRef.current && project) {
      mermaidRef.current.innerHTML = ''
      const diagrams = project.content.match(/```mermaid\n([\s\S]*?)```/g)
      if (diagrams && diagrams.length > 0) {
        diagrams.forEach((diagram, i) => {
          const code = diagram.replace('```mermaid\n', '').replace('```', '').trim()
          const id = `mermaid-${i}`
          try {
            mermaid.render(id, code).then((result) => {
              const div = document.createElement('div')
              div.innerHTML = result.svg
              mermaidRef.current?.appendChild(div)
            })
          } catch {
            // fallback: skip invalid mermaid
          }
        })
      }
    }
  }, [project])

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

  const sections = project.content.split('## ').filter(Boolean)

  const challengesSection = sections.find((s) => s.startsWith('Challenges'))
  const systemFlowSection = sections.find((s) => s.startsWith('System Flow'))
  const userFlowSection = sections.find((s) => s.startsWith('User Flow'))

  const renderContent = (text: string) => {
    return text
      .split('\n')
      .filter((line) => !line.startsWith('```mermaid'))
      .filter((line) => !line.startsWith('```'))
      .map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-6 mb-3 text-neutral-900">{line.replace('### ', '')}</h3>
        if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ') || line.startsWith('7. ')) {
          return <li key={i} className="text-[0.95rem] text-neutral-600 ml-5 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>
        }
        if (line.startsWith('- ')) return <li key={i} className="text-[0.95rem] text-neutral-600 ml-5 list-disc">{line.replace('- ', '')}</li>
        if (line.trim() === '') return null
        if (line.includes('**')) {
          const parts = line.split(/(\*\*.*?\*\*)/)
          return <p key={i} className="text-[0.95rem] text-neutral-600 leading-relaxed mb-2">{parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="text-neutral-900">{part.slice(2, -2)}</strong> : part)}</p>
        }
        return <p key={i} className="text-[0.95rem] text-neutral-600 leading-relaxed mb-2">{line}</p>
      })
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <button
        onClick={() => navigate('/projects')}
        className="font-mono text-sm text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-2 mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        BACK TO PROJECTS
      </button>

      <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
        [PROJECT / {project.id.toUpperCase()}]
      </span>

      <div className="flex justify-between items-baseline flex-wrap gap-2 mb-3">
        <h1 className="text-[clamp(1.5rem,4vw,2.2rem)] font-semibold text-neutral-900">{project.title}</h1>
        <span className="font-mono text-[0.8rem] text-neutral-400">ROLE: {project.role}</span>
      </div>
      <p className="text-[0.95rem] text-neutral-500 max-w-[800px] mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech) => (
          <span key={tech} className="font-mono text-[0.75rem] px-2 py-1 rounded border border-neutral-200 bg-neutral-50 text-neutral-500">{tech}</span>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 mb-10 p-5 bg-neutral-50 rounded-lg border border-neutral-200">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col gap-1">
            <span className="font-mono text-[0.7rem] text-neutral-400 tracking-[0.05em]">{metric.label}</span>
            <span className="font-mono text-base font-semibold text-neutral-900">{metric.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-8 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'architecture'
              ? 'text-neutral-900 border-b-2 border-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Architecture & Flow
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'challenges'
              ? 'text-neutral-900 border-b-2 border-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Challenges & Solutions
        </button>
      </div>

      {activeTab === 'architecture' ? (
        <div>
          <div ref={mermaidRef} className="mb-8 flex justify-center [&_svg]:max-w-full" />
          {(systemFlowSection || userFlowSection) && (
            <div className="space-y-6">
              {systemFlowSection && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">System Flow</h2>
                  {renderContent(systemFlowSection)}
                </section>
              )}
              {userFlowSection && (
                <section>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4 mt-8">User Flow</h2>
                  {renderContent(userFlowSection)}
                </section>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {challengesSection && (
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Challenges & Solutions</h2>
              {project.challenges.map((c, i) => (
                <div key={i} className="mb-8 p-6 bg-white rounded-lg border border-neutral-200">
                  <div className="mb-4">
                    <span className="font-mono text-[0.7rem] text-red-500 uppercase tracking-[0.15em] block mb-2">PROBLEM</span>
                    <p className="text-[0.95rem] text-neutral-900 leading-relaxed">{c.problem}</p>
                  </div>
                  <div className="w-8 h-[1px] bg-neutral-300 my-4" />
                  <div>
                    <span className="font-mono text-[0.7rem] text-green-600 uppercase tracking-[0.15em] block mb-2">SOLUTION</span>
                    <p className="text-[0.95rem] text-neutral-600 leading-relaxed">{c.solution}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      <div className="flex gap-4 mt-10 pt-8 border-t border-neutral-200">
        {project.demo && (
          <button
            onClick={() => navigate(project.demo!)}
            className="bg-neutral-900 text-white border border-neutral-900 px-5 py-2.5 rounded text-sm font-medium inline-flex items-center gap-2 transition-all hover:bg-transparent hover:text-neutral-900"
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
          className="bg-transparent text-neutral-900 border border-neutral-200 px-5 py-2.5 rounded text-sm font-medium inline-flex items-center gap-2 transition-all hover:border-neutral-900 hover:bg-neutral-50"
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
