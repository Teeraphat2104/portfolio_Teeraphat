import { useNavigate } from 'react-router-dom'
import type { ProjectMeta } from '../types'

interface ProjectCardProps {
  project: ProjectMeta
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group relative border border-neutral-200 rounded-xl p-6 md:p-7 bg-white cursor-pointer transition-all duration-300 hover:border-neutral-900 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_8px_-2px_rgba(0,0,0,0.03)] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <span className="font-mono text-[0.65rem] text-neutral-400 uppercase tracking-[0.12em] block mb-1.5">PROJECT</span>
          <h3 className="text-lg md:text-xl font-semibold text-neutral-900 leading-snug group-hover:text-neutral-900 transition-colors">
            {project.title}
          </h3>
        </div>
        <span className="flex-shrink-0 font-mono text-[0.7rem] text-neutral-400 bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-md whitespace-nowrap">
          {project.role}
        </span>
      </div>

      <p className="text-[0.9rem] text-neutral-500 leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.7rem] px-2 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-500 group-hover:border-neutral-300 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  )
}
