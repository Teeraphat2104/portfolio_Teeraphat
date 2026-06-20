import { BiRightArrowAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { Container } from './Container'
import { getAllProjectMetas } from '../lib/projects'
import { getTechIcon } from '../lib/techIcons'

const tagColors: Record<string, string> = {
  React: 'bg-blue-soft text-blue-deep border-blue/15',
  TypeScript: 'bg-blue-soft text-blue-deep border-blue/15',
  'Next.js': 'bg-ink/5 text-ink border-ink/10',
  'Node.js': 'bg-mint-soft text-mint-deep border-mint/15',
  PostgreSQL: 'bg-blue-soft text-blue-deep border-blue/15',
  MongoDB: 'bg-mint-soft text-mint-deep border-mint/15',
  Go: 'bg-blue-soft text-blue-deep border-blue/15',
  Laravel: 'bg-ink/5 text-ink border-ink/10',
  PHP: 'bg-ink/5 text-ink border-ink/10',
}

export const BlogSection: React.FC = () => {
  const navigate = useNavigate()
  const projects = getAllProjectMetas()
  const featured = projects.slice(0, 4)

  return (
    <div id="selected-work" className="py-16 md:py-24">
      <Container>
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-mint-deep mono uppercase tracking-[0.2em]">/selected_work</span>
            <span className="h-px w-8 bg-mint/40" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="display text-3xl md:text-4xl xl:text-5xl font-semibold text-ink tracking-[-0.02em] max-w-2xl">
              A handful of systems I shipped end-to-end.
            </h2>
            <p className="text-body text-base max-w-md">
              Real-time queues, dense academic platforms, and database work — each one measured at the wire.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className={`group relative bg-white border border-rule rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 hover:border-ink/30 hover:-translate-y-0.5 flex flex-col h-full ${
                idx === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold text-mint-deep mono uppercase tracking-[0.15em] bg-mint-soft px-2 py-1 rounded-md">
                      {project.role}
                    </span>
                    <span className="text-[10px] text-muted mono">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className={`display font-semibold text-ink leading-tight tracking-[-0.02em] ${
                    idx === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                  }`}>
                    {project.title}
                  </h3>
                </div>
              </div>

              <p className="text-body leading-relaxed mb-6 text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, idx === 0 ? 6 : 4).map((tech) => {
                  const Icon = getTechIcon(tech)
                  const colorClass = tagColors[tech] || 'bg-paper text-ink border-rule'
                  return (
                    <span
                      key={tech}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 border rounded-md mono ${colorClass}`}
                    >
                      {Icon && <Icon className="w-3 h-3" />}
                      {tech}
                    </span>
                  )
                })}
              </div>

              <div className="border-t border-rule pt-4 mt-auto flex items-center justify-between">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue hover:text-blue-deep transition-colors mono"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-blue animate-[pulse-dot_2s_ease-in-out_infinite]" />
                      <span className="relative rounded-full h-1.5 w-1.5 bg-blue" />
                    </span>
                    Live demo
                  </a>
                ) : (
                  <span className="text-xs text-muted mono">Source available</span>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:gap-2 transition-all">
                  Read case study
                  <BiRightArrowAlt className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex h-11 items-center justify-center gap-2 px-6 bg-white border border-rule text-ink text-sm font-medium rounded-full transition hover:border-ink"
            >
              View all projects
              <BiRightArrowAlt className="w-4 h-4" />
            </button>
          </div>
        )}
      </Container>
    </div>
  )
}