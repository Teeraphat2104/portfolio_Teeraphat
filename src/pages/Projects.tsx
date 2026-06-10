import { ProjectCard } from '../components/ProjectCard'
import { getAllProjectMetas } from '../lib/projects'

export const ProjectsPage: React.FC = () => {
  const projects = getAllProjectMetas()

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
        [02 / PORTFOLIO]
      </span>
      <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-4 pb-3 border-b border-neutral-200">
        All Projects
      </h1>
      <p className="text-[0.95rem] text-neutral-500 max-w-[600px] mt-6 mb-10">
        A selection of non-trivial architectural solutions addressing consistency, distribution, and real-time operations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
