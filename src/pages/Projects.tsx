import { ProjectCard } from "../components/ProjectCard";
import { getAllProjectMetas } from "../lib/projects";
import { Container } from "../components/Container";

export const ProjectsPage: React.FC = () => {
  const projects = getAllProjectMetas();

  return (
    <div className="pt-16 pb-10 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="md:w-2/3 lg:w-1/2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-moss">
            All Projects
          </h1>
          <p className="mt-4 text-moss/80 leading-relaxed">
            A selection of non-trivial architectural solutions addressing
            consistency, distribution, and real-time operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sage text-sm">No projects yet.</p>
          </div>
        )}
      </Container>
    </div>
  );
};
