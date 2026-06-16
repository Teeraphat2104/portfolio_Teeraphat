import { BiPlayCircle, BiRightArrowAlt } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import type { ProjectMeta } from "../types";

interface ProjectCardProps {
  project: ProjectMeta;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group p-6 sm:p-8 bg-white border border-gray-200 cursor-pointer transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5 active:scale-[0.99] flex flex-col h-full"
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gray-400 tracking-wider block mb-1.5">
              PROJECT
            </span>
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug group-hover:text-black transition-colors">
              {project.title}
            </h3>
          </div>
          <span className="flex-shrink-0 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1 tracking-wider whitespace-nowrap">
            {project.role}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-gray-50 border border-gray-200 text-gray-500 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-auto flex items-center justify-between">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-11 items-center justify-center px-6 bg-black text-white text-sm font-medium transition hover:bg-gray-800 active:bg-gray-900"
          >
            <span className="relative flex items-center gap-2">
              <BiPlayCircle className="w-4 h-4" />
              Live Demo
            </span>
          </a>
        )}
        <span className="inline-flex items-center gap-1 text-sm text-gray-600 transition-colors group-hover:text-black font-medium ml-auto">
          View project
          <BiRightArrowAlt className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};
