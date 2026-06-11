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
 <div className="mb-12 space-y-2 text-center">
 <h2 className="text-3xl font-bold text-gray-800 md:text-4xl ">Selected Projects</h2>
 <p className="lg:mx-auto lg:w-6/12 text-gray-600 ">
 A selection of non-trivial architectural solutions addressing consistency, distribution, and real-time operations.
 </p>
 </div>
 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
 {featured.map((project) => (
 <div
 key={project.id}
 onClick={() => navigate(`/projects/${project.id}`)}
 className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10 cursor-pointer transition-all hover:border-gray-300 :border-gray-600"
 >
 <div className="relative">
 <span className="font-mono text-[0.65rem] text-gray-400 uppercase tracking-[0.12em] block mb-2">
 {project.role}
 </span>
 <h3 className="text-2xl font-semibold text-gray-800 leading-snug">
 {project.title}
 </h3>
 <p className="mt-6 mb-8 text-gray-600 line-clamp-3 leading-relaxed">
 {project.description}
 </p>
 <div className="flex flex-wrap gap-1.5 mb-6">
 {project.technologies.slice(0, 4).map((tech) => (
 <span
 key={tech}
 className="font-mono text-[0.7rem] px-2 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-500 "
 >
 {tech}
 </span>
 ))}
 </div>
 <span className="inline-flex items-center gap-1 text-info text-sm font-medium">
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
 <div className="mt-12 text-center">
 <button
 onClick={() => navigate('/projects')}
 className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 :border-gray-700 :bg-gray-800 mx-auto sm:w-max"
 >
 <span className="relative text-base font-semibold text-primary ">View All Projects</span>
 </button>
 </div>
 )}
 </Container>
 </div>
 )
}
