import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { getAllProjectMetas } from '../lib/projects'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const projects = getAllProjectMetas()
  const featured = projects.slice(0, 3)

  const words = [
    'DISTRIBUTED SYSTEMS DESIGN',
    'FULL-STACK ARCHITECTURE',
    'CLOUD ARCHITECTURE & OPS',
    'HIGH-PERFORMANCE APPLICATIONS',
  ]
  const [index, setIndex] = useState(0)
  const [subText, setSubText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)

  useEffect(() => {
    const activeWord = words[index]
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
          setIndex((prev) => (prev + 1) % words.length)
          setSpeed(500)
        } else {
          setSpeed(30)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [subText, isDeleting, index, speed])

  return (
    <div className="animate-[fadeIn_0.8s_ease-out]">
      <section className="max-w-[1000px] mx-auto px-6 pt-24 pb-16 border-b border-dashed border-neutral-200">
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
          [01 / INTRO]
        </span>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.04em] mt-6 mb-8">
          Building resilient backends,
          <br />
          <span className="font-normal text-neutral-500">refined digital interfaces.</span>
        </h1>
        <div className="font-mono text-[0.9rem] text-neutral-900 tracking-[0.05em] min-h-[24px] mb-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
          <span>{subText}</span>
          <span className="w-[2px] h-3.5 bg-neutral-900 animate-[blink_0.8s_infinite]" />
        </div>
        <p className="text-[1.15rem] max-w-[640px] leading-relaxed text-neutral-500 mb-12">
          I am a Full-Stack Software Engineer focused on designing scalable
          system infrastructures, highly parallel web backends, and low-latency
          client environments. Bridging operational strength with clean product
          aesthetics.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <button
            onClick={() => navigate('/projects')}
            className="bg-neutral-900 text-white border border-neutral-900 px-5 py-2.5 rounded text-sm font-medium inline-flex items-center gap-2 transition-all hover:bg-transparent hover:text-neutral-900"
          >
            Explore Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="bg-transparent text-neutral-900 border border-neutral-200 px-5 py-2.5 rounded text-sm font-medium transition-all hover:border-neutral-900 hover:bg-neutral-50"
          >
            Get in Touch
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 pt-10 border-t border-dashed border-neutral-200">
          {[
            { label: 'ENGINEERING PRINCIPLES', value: 'Scalability / High Concurrency' },
            { label: 'DEVELOPMENT DOMAIN', value: 'API Design / Distributed DBs' },
            { label: 'PRODUCT FOCUS', value: 'High Density / Fluid UX' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-mono text-[0.7rem] text-neutral-400 tracking-[0.05em]">{stat.label}</span>
              <span className="text-[0.9rem] font-medium text-neutral-900">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-6 pt-20 pb-12">
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
          [02 / FEATURED WORK]
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-4 pb-3 border-b border-neutral-200">
          Selected Projects
        </h2>
        <p className="text-[0.95rem] text-neutral-500 max-w-[600px] mb-10 mt-6">
          A selection of non-trivial architectural solutions addressing consistency, distribution, and real-time operations.
        </p>
        <div className="flex flex-col gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/projects')}
            className="font-mono text-sm text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-2"
          >
            View All Projects →
          </button>
        </div>
      </section>
    </div>
  )
}
