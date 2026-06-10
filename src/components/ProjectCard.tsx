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
      className="border border-neutral-200 rounded-lg p-7 bg-white cursor-pointer transition-all duration-250 hover:border-neutral-900 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_8px_-1px_rgba(0,0,0,0.03)]"
    >
      <div className="flex justify-between items-baseline flex-wrap gap-2 mb-3">
        <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
        <span className="font-mono text-[0.8rem] text-neutral-400">ROLE: {project.role}</span>
      </div>
      <p className="text-[0.95rem] text-neutral-500 mb-5 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.75rem] px-2 py-1 rounded border border-neutral-200 bg-neutral-50 text-neutral-500"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
