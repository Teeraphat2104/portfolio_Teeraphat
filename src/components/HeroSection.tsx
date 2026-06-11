import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from './Container'

const typewriterWords = [
 'FULL-STACK ARCHITECTURE',
 'FRONT-END ARCHITECTURE',
 'BACK-END ARCHITECTURE',
 'CLOUD ARCHITECTURE & OPS',
 'SCALABLE SYSTEMS',
 'DATABASE DESIGN',
 'API DESIGN',
 'HIGH-PERFORMANCE APPLICATIONS',
]

export const HeroSection: React.FC = () => {
 const navigate = useNavigate()
 const [index, setIndex] = useState(0)
 const [subText, setSubText] = useState('')
 const [isDeleting, setIsDeleting] = useState(false)
 const [speed, setSpeed] = useState(100)

 useEffect(() => {
 const activeWord = typewriterWords[index]
 const timer = setTimeout(() => {
 if (!isDeleting) {
 setSubText(activeWord.substring(0, subText.length + 1))
 if (subText.length === activeWord.length) {
 setSpeed(2000)
 setIsDeleting(true)
 } else {
 setSpeed(60)
 }
 } else {
 setSubText(activeWord.substring(0, subText.length - 1))
 if (subText.length === 0) {
 setIsDeleting(false)
 setIndex((prev) => (prev + 1) % typewriterWords.length)
 setSpeed(500)
 } else {
 setSpeed(30)
 }
 }
 }, speed)
 return () => clearTimeout(timer)
 }, [subText, isDeleting, index, speed])

 return (
 <div className="relative" id="home">
 <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 pointer-events-none">
 <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 " />
 <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 " />
 </div>
 <Container>
 <div className="relative pt-36 ml-auto">
 <div className="lg:w-2/3 text-center mx-auto">
 <h1 className="text-gray-900 font-bold text-5xl md:text-6xl xl:text-7xl text-balance leading-[1.1] tracking-[-0.04em]">
 Building resilient backends,<br />
 <span className="text-primary ">refined digital interfaces.</span>
 </h1>

 <div className="mt-8 font-mono text-[0.9rem] text-gray-700 tracking-[0.05em] min-h-[28px] flex items-center justify-center gap-2">
 <span className="w-1.5 h-1.5 bg-primary rounded-full" />
 <span>{subText}</span>
 <span className="w-[2px] h-4 bg-gray-900 animate-[blink_0.8s_infinite]" />
 </div>

 <p className="mt-8 text-gray-600 max-w-[640px] mx-auto leading-relaxed">
 I am a Full-Stack Software Engineer focused on designing scalable
 system infrastructures, highly parallel web backends, and low-latency
 client environments. Bridging operational strength with clean product
 aesthetics.
 </p>

 <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
 <button
 onClick={() => navigate('/projects')}
 className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
 >
 <span className="relative text-base font-semibold text-white">Explore Work</span>
 </button>
 <button
 onClick={() => navigate('/contact')}
 className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 :border-gray-700 :bg-gray-800 sm:w-max"
 >
 <span className="relative text-base font-semibold text-primary ">Get in Touch</span>
 </button>
 </div>

 <div className="hidden py-8 mt-16 border-y border-gray-100 sm:flex justify-between">
 <div className="text-left">
 <h6 className="text-lg font-semibold text-gray-700 ">Engineering Principles</h6>
 <p className="mt-2 text-gray-500">Scalability / High Concurrency</p>
 </div>
 <div className="text-left">
 <h6 className="text-lg font-semibold text-gray-700 ">Development Domain</h6>
 <p className="mt-2 text-gray-500">API Design / Distributed DBs</p>
 </div>
 <div className="text-left">
 <h6 className="text-lg font-semibold text-gray-700 ">Product Focus</h6>
 <p className="mt-2 text-gray-500">High Density / Fluid UX</p>
 </div>
 </div>
 </div>
 </div>
 </Container>
 </div>
 )
}
