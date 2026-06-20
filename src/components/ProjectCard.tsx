import { BiRightArrowAlt } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import type { ProjectMeta } from "../types";

interface ProjectCardProps {
  project: ProjectMeta;
}

const tagColors: Record<string, string> = {
  React: 'bg-blue-soft text-blue-deep border-blue/15',
  TypeScript: 'bg-blue-soft text-blue-deep border-blue/15',
  'Next.js': 'bg-ink/5 text-ink border-ink/10',
  'Node.js': 'bg-mint-soft text-mint-deep border-mint/15',
  PostgreSQL: 'bg-blue-soft text-blue-deep border-blue/15',
  MongoDB: 'bg-mint-soft text-mint-deep border-mint/15',
  Go: 'bg-blue-soft text-blue-deep border-blue/15',
  Laravel: 'bg-ink/5 text-ink border-ink/10',
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group p-6 md:p-8 bg-white border border-rule rounded-2xl cursor-pointer transition-all duration-300 hover:border-ink/30 hover:-translate-y-0.5 flex flex-col h-full"
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-semibold text-mint-deep mono uppercase tracking-[0.15em] bg-mint-soft px-2 py-1 rounded-md inline-block mb-3">
              {project.role}
            </span>
            <h3 className="display text-xl md:text-2xl font-semibold text-ink leading-tight tracking-[-0.02em]">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-body leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`text-xs font-medium px-2.5 py-1 border rounded-md mono ${
                tagColors[tech] || 'bg-paper text-ink border-rule'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
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
          View project
          <BiRightArrowAlt className="w-4 h-4" />
        </span>
      </div>
    </article>
  );
};