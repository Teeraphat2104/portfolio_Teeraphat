import { ProjectCard } from "../components/ProjectCard";
import { getAllProjectMetas } from "../lib/projects";
import { Container } from "../components/Container";

export const ProjectsPage: React.FC = () => {
  const projects = getAllProjectMetas();

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-mint-deep mono uppercase tracking-[0.2em]">/all_projects</span>
            <span className="h-px w-8 bg-mint/40" />
          </div>
          <h1 className="display text-4xl md:text-5xl xl:text-6xl font-semibold text-ink tracking-[-0.025em] leading-[1.05] mb-5">
            Every system, every metric, every failure mode.
          </h1>
          <p className="text-body text-lg leading-relaxed">
            A selection of non-trivial architectural solutions addressing consistency, distribution, and real-time operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-sm">No projects yet.</p>
          </div>
        )}
      </Container>
    </div>
  );
};