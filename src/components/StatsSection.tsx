import { Container } from './Container'

export const StatsSection: React.FC = () => {
  return (
    <div id="solution">
      <Container>
        <div className="text-xs text-gray-400 tracking-[0.2em] mb-2">02.</div>

        <div className="space-y-6 justify-between md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
                    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="w-5/6">
                  <h3 className="font-medium text-lg text-gray-900">Architecture-First Design</h3>
                  <p className="text-gray-500">Schema-driven development with clear separation of concerns.</p>
                </div>
              </div>
              <div className="pt-4 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 bg-gray-100 flex-shrink-0 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
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