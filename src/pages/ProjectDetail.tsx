import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { getProjectById } from '../lib/projects'
import { MermaidRenderer } from '../components/MermaidRenderer'
import { Container } from '../components/Container'

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
 tokens.push(`<span class="text-blue-600">${key[1]}</span>`)
 i += key[0].length
 continue
 }
 const str = rest.match(/^"(?:[^"\\]|\\.)*?"/)
 if (str) {
 tokens.push(`<span class="text-emerald-600">${str[0]}</span>`)
 i += str[0].length
 continue
 }
 const typ = rest.match(/^(boolean|string|number|object|array|null|undefined|never|any|void|symbol|bigint|true|false)\b/)
 if (typ) {
 tokens.push(`<span class="text-violet-600">${typ[0]}</span>`)
 i += typ[0].length
 continue
 }
 const num = rest.match(/^(\d+\.?\d*)\b/)
 if (num) {
 tokens.push(`<span class="text-amber-600">${num[0]}</span>`)
 i += num[0].length
 continue
 }
 const com = rest.match(/^(\/\/.*)/)
 if (com) {
 tokens.push(`<span class="text-neutral-400 italic">${com[0]}</span>`)
 i += com[0].length
 continue
 }
 tokens.push(line[i])
 i++
 }
 return tokens.join('')
 }).join('\n')
}

const markdownComponents: Components = {
 h1: ({ children }) => (
 <h1 className="text-2xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">{children}</h1>
 ),
 h2: ({ children }) => (
 <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3 border-b border-gray-100 pb-2">{children}</h2>
 ),
 h3: ({ children }) => (
 <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{children}</h3>
 ),
 h4: ({ children }) => (
 <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">{children}</h4>
 ),
 p: ({ children }) => (
 <p className="text-base text-gray-600 leading-relaxed mb-4">{children}</p>
 ),
 ul: ({ children }) => (
 <ul className="space-y-1.5 mb-4 ml-5 list-disc marker:text-gray-400">{children}</ul>
 ),
 ol: ({ children }) => (
 <ol className="space-y-1.5 mb-4 ml-5 list-decimal marker:text-gray-400">{children}</ol>
 ),
 li: ({ children }) => (
 <li className="text-base text-gray-600 leading-relaxed pl-1">{children}</li>
 ),
 strong: ({ children }) => (
 <strong className="font-semibold text-gray-900 ">{children}</strong>
 ),
 code: ({ className, children }) => {
 const isInline = !className
 if (isInline) {
 return (
 <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 text-gray-800 ">
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
 <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-t-lg border border-gray-200 border-b-0">
 <span className="w-2 h-2 rounded-full bg-red-400" />
 <span className="w-2 h-2 rounded-full bg-yellow-400" />
 <span className="w-2 h-2 rounded-full bg-green-400" />
 <span className="font-mono text-xs uppercase tracking-wider text-gray-500 ml-2">{lang}</span>
 </div>
 <pre className="bg-white border border-gray-200 rounded-b-lg p-5 overflow-x-auto text-sm leading-relaxed font-mono">
 <code dangerouslySetInnerHTML={{ __html: highlightJsonLike(String(children)) }} />
 </pre>
 </div>
 )
 }
 return (
 <pre className="bg-gray-50 border border-gray-200 rounded-lg p-5 overflow-x-auto mb-6 text-sm leading-relaxed font-mono">
 <code>{children}</code>
 </pre>
 )
 },
 pre: ({ children }) => <>{children}</>,
 blockquote: ({ children }) => (
 <blockquote className="border-l-4 border-gray-300 pl-4 py-1 mb-4 text-gray-500 italic">{children}</blockquote>
 ),
 a: ({ href, children }) => (
 <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors">
 {children}
 </a>
 ),
 hr: () => <hr className="border-t border-gray-200 my-8" />,
 table: ({ children }) => (
 <div className="overflow-x-auto mb-6">
 <table className="w-full border-collapse text-sm">{children}</table>
 </div>
 ),
 th: ({ children }) => (
 <th className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900 ">{children}</th>
 ),
 td: ({ children }) => (
 <td className="border border-gray-200 px-4 py-2 text-gray-600 ">{children}</td>
 ),
}

export const ProjectDetail: React.FC = () => {
 const { id } = useParams<{ id: string }>()
 const navigate = useNavigate()
 const project = id ? getProjectById(id) : undefined
 const [activeTab, setActiveTab] = useState<'overview' | 'challenges'>('overview')

 if (!project) {
 return (
 <div className="pt-24 text-center">
 <Container>
 <h1 className="text-2xl font-bold text-gray-800 mb-4">Project not found</h1>
 <Link to="/projects" className="text-primary hover:underline">
 ← Back to projects
 </Link>
 </Container>
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
 <div className="pt-24 pb-16 animate-[fadeIn_0.8s_ease-out]">
 <Container>
 <button
 onClick={() => navigate('/projects')}
 className="group font-mono text-sm text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-2 mb-6"
 >
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
 <line x1="19" y1="12" x2="5" y2="12" />
 <polyline points="12 19 5 12 12 5" />
 </svg>
 BACK TO PROJECTS
 </button>

 <div className="flex justify-between items-baseline flex-wrap gap-2 mb-3">
 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{project.title}</h1>
 <span className="font-mono text-sm text-gray-400 ">{project.role}</span>
 </div>
 <p className="text-base text-gray-600 max-w-3xl mb-6 leading-relaxed">{project.description}</p>

 <div className="flex flex-wrap gap-2 mb-6">
 {project.technologies.map((tech) => (
 <span
 key={tech}
 className="font-mono text-sm px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary transition-all"
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
 className="relative inline-flex h-11 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 mb-10"
 >
 <span className="relative text-base font-semibold text-white flex items-center gap-2">
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <polygon points="5 3 19 12 5 21 5 3" />
 </svg>
 Live Demo
 </span>
 </a>
 )}

 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
 {project.metrics.map((metric) => (
 <div
 key={metric.label}
 className="p-5 bg-gradient-to-br from-primary/5 to-purple-400/5 rounded-2xl border border-gray-100 flex flex-col gap-1.5"
 >
 <span className="font-mono text-xs text-gray-400 tracking-wider uppercase">{metric.label}</span>
 <span className="font-mono text-base font-semibold text-gray-900 ">{metric.value}</span>
 </div>
 ))}
 </div>

 <div className="flex gap-1 mb-8 border-b border-gray-100 ">
 {[
 { key: 'overview' as const, label: 'Architecture & Flow' },
 { key: 'challenges' as const, label: 'Challenges & Solutions' },
 ].map((tab) => (
 <button
 key={tab.key}
 onClick={() => setActiveTab(tab.key)}
 className={`relative px-5 py-2.5 text-sm font-medium transition-colors ${
 activeTab === tab.key
 ? 'text-primary'
 : 'text-gray-500 hover:text-gray-900 :text-white'
 }`}
 >
 {tab.label}
 {activeTab === tab.key && (
 <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
 )}
 </button>
 ))}
 </div>

 <div className="prose-custom">
 {activeTab === 'overview' ? (
 <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xl shadow-gray-600/10 ">
 <ReactMarkdown
 remarkPlugins={[remarkGfm]}
 components={markdownComponents}
 >
 {overviewContent}
 </ReactMarkdown>
 </div>
 ) : challengesContent ? (
 <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xl shadow-gray-600/10 ">
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
 <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xl shadow-gray-600/10 ">
 <div className="flex items-start gap-4">
 <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-sm font-semibold text-red-600 font-mono">
 {i + 1}
 </span>
 <div className="flex-1">
 <span className="font-mono text-xs text-red-500 uppercase tracking-wider block mb-1.5">PROBLEM</span>
 <p className="text-base text-gray-800 leading-relaxed">{c.problem}</p>
 <div className="w-8 h-0.5 bg-gray-200 my-5" />
 <span className="font-mono text-xs text-emerald-600 uppercase tracking-wider block mb-1.5">SOLUTION</span>
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
