import { BiMessageDetail, BiShield } from 'react-icons/bi'
import { Container } from './Container'

export const StatsSection: React.FC = () => {
  return (
    <div id="solution">
      <Container>
        <div className="text-xs text-gray-400 tracking-[0.2em] mb-2">02.</div>

            <div className="space-y-6 justify-between md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-8 lg:items-center">
          <div className="md:5/12 lg:w-1/2">
            <div className="w-full bg-gray-50 border border-gray-200 p-8 flex items-center justify-center">
              <svg viewBox="0 0 200 160" className="w-full max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="40" width="40" height="80" fill="currentColor" className="text-gray-300" />
                <rect x="60" y="20" width="40" height="100" fill="currentColor" className="text-gray-400" />
                <rect x="110" y="50" width="40" height="70" fill="currentColor" className="text-gray-300" />
                <rect x="160" y="10" width="30" height="110" fill="currentColor" className="text-gray-500" />
                <line x1="5" y1="130" x2="195" y2="130" stroke="currentColor" strokeWidth="2" className="text-gray-200" />
              </svg>
            </div>
          </div>
          <div className="md:7/12 lg:w-1/2">
            <h2 className="text-3xl font-medium text-gray-900 md:text-4xl">
              Engineering approach built for scale
            </h2>
            <p className="my-8 text-gray-600">
              Every system I build starts with a clear architecture — from database schema design through API contracts to deployment infrastructure. I prioritize consistency, observability, and maintainability at every layer.
            </p>
            <div className="divide-y space-y-4 divide-gray-200">
              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 bg-gray-100 flex-shrink-0 items-center justify-center">
                  <BiMessageDetail className="w-6 h-6 text-gray-700" />
                </div>
                <div className="w-5/6">
                  <h3 className="font-medium text-lg text-gray-900">Architecture-First Design</h3>
                  <p className="text-gray-500">Schema-driven development with clear separation of concerns.</p>
                </div>
              </div>
              <div className="pt-4 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 bg-gray-100 flex-shrink-0 items-center justify-center">
                  <BiShield className="w-6 h-6 text-gray-700" />
                </div>
                <div className="w-5/6">
                  <h3 className="font-medium text-lg text-gray-900">Distributed & Resilient</h3>
                  <p className="text-gray-500">Systems designed for high concurrency, fault tolerance, and real-time operations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}