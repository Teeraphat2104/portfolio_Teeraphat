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
      <Container>
         <div className="relative pt-24 ml-auto">
          <div className="lg:w-2/3">
            <div className="text-xs text-gray-400 tracking-[0.2em] mb-4">2026.06.12 — PORTFOLIO</div>

            <h1 className="text-gray-900 font-medium text-5xl md:text-6xl xl:text-7xl text-balance leading-[1.1] tracking-[-0.02em]">
              Building resilient backends,<br />
              <span className="text-gray-500">refined digital interfaces.</span>
            </h1>

            <div className="mt-8 text-base text-gray-500 tracking-[0.05em] min-h-[28px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-black" />
              <span>{subText}</span>
              <span className="w-[2px] h-4 bg-black animate-[blink_0.8s_infinite]" />
            </div>

            <p className="mt-8 text-gray-600 max-w-[640px] leading-relaxed">
              I am a Full-Stack Software Engineer focused on designing scalable
              system infrastructures, highly parallel web backends, and low-latency
              client environments. Bridging operational strength with clean product
              aesthetics.
            </p>

            <div className="mt-8 flex flex-wrap gap-y-4 gap-x-6">
              <button
                onClick={() => navigate('/projects')}
                className="flex h-11 w-full items-center justify-center px-6 bg-black text-white text-sm font-medium transition hover:bg-gray-800 active:bg-gray-900 sm:w-max"
              >
                Explore Work
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex h-11 w-full items-center justify-center px-6 border border-gray-300 text-gray-700 text-sm font-medium transition hover:border-gray-900 hover:text-gray-900 sm:w-max"
              >
                Get in Touch
              </button>
            </div>

            <div className="hidden py-6 mt-8 border-t border-b border-gray-200 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-sm font-medium text-gray-900">Engineering Principles</h6>
                <p className="mt-2 text-gray-500 text-sm">Scalability / High Concurrency</p>
              </div>
              <div className="text-left">
                <h6 className="text-sm font-medium text-gray-900">Development Domain</h6>
                <p className="mt-2 text-gray-500 text-sm">API Design / Distributed DBs</p>
              </div>
              <div className="text-left">
                <h6 className="text-sm font-medium text-gray-900">Product Focus</h6>
                <p className="mt-2 text-gray-500 text-sm">High Density / Fluid UX</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}