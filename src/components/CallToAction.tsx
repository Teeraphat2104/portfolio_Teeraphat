import { useNavigate } from 'react-router-dom'
import { Container } from './Container'

export const CallToAction: React.FC = () => {
 const navigate = useNavigate()

 return (
 <div className="relative py-16">
 <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 pointer-events-none">
 <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 " />
 <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 " />
 </div>
 <Container>
 <div className="relative">
 <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
 <h1 className="text-center text-4xl font-bold text-gray-800 md:text-5xl">
 Let's build something together
 </h1>
 <p className="text-center text-xl text-gray-600 ">
 I am always open to discussing new projects, interesting opportunities, or ideas.
 </p>
 <div className="flex flex-wrap justify-center gap-6">
 <button
 onClick={() => navigate('/contact')}
 className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
 >
 <span className="relative text-base font-semibold text-white ">Get in Touch</span>
 </button>
 <button
 onClick={() => navigate('/projects')}
 className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 :border-gray-700 :bg-gray-800 sm:w-max"
 >
 <span className="relative text-base font-semibold text-primary ">View Projects</span>
 </button>
 </div>
 </div>
 </div>
 </Container>
 </div>
 )
}
