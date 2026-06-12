import { useNavigate } from 'react-router-dom'
import { Container } from './Container'
import { getAllProjectMetas } from '../lib/projects'

export const BlogSection: React.FC = () => {
  const navigate = useNavigate()
  const projects = getAllProjectMetas()
  const featured = projects.slice(0, 3)

  return (
    <div id="blog">
      <Container>
        <div className="mb-6 space-y-2">
          <div className="text-xs text-gray-400 tracking-[0.2em] mb-2">04.</div>
          <h2 className="text-3xl font-medium text-gray-900 md:text-4xl">Selected Projects</h2>
          <p className="lg:w-6/12 text-gray-600">
            A selection of non-trivial architectural solutions addressing consistency, distribution, and real-time operations.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="group p-6 sm:p-8 bg-white border border-gray-200 cursor-pointer transition-all duration-300 hover:border-gray-400"
            >
              <div className="relative">
                <span className="text-xs text-gray-400 tracking-wider block mb-2">
                  {project.role}
                </span>
                <h3 className="text-2xl font-medium text-gray-900 leading-snug">
                  {project.title}
                </h3>
                <p className="mt-6 mb-8 text-gray-600 line-clamp-3 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-gray-50 border border-gray-200 text-gray-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-gray-700 text-sm font-medium">
                  View project
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
        {featured.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/projects')}
              className="flex h-11 w-full items-center justify-center px-6 border border-gray-300 text-gray-700 text-sm font-medium transition hover:border-gray-900 hover:text-gray-900 mx-auto sm:w-max"
            >
              View All Projects
            </button>
          </div>
        )}
      </Container>
    </div>
  )
}