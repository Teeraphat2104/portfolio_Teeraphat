import { BiStar } from 'react-icons/bi'
import { Container } from './Container'

const highlights = [
  {
    title: 'Barbershop Queue System',
    role: 'Lead Developer',
    text: 'Real-time queue management with sub-15ms dispatch times, serving 200+ daily appointments. Built with React, Node.js, and PostgreSQL with WebSocket-based live updates.',
  },
  {
    title: 'Graduate Management System',
    role: 'Full-Stack Developer',
    text: 'High-density academic platform supporting 10k+ concurrent users with real-time data processing, analytics dashboards, and automated workflow orchestration.',
  },
  {
    title: 'University Database System',
    role: 'Full-Stack Developer',
    text: 'Distributed database architecture with normalized schemas, optimized query pipelines, and comprehensive data integrity constraints across 50+ tables.',
  },
]

export const TestimonialsSection: React.FC = () => {
  return (
    <div id="reviews">
      <Container>
        <div className="mb-8 space-y-4 px-6 md:px-0">
          <div className="text-xs text-gray-400 tracking-[0.2em] mb-2">03.</div>
          <h2 className="text-2xl font-medium text-gray-900 md:text-4xl text-left">
            Featured Projects
          </h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-5 space-y-5">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="aspect-auto p-8 border border-gray-200 bg-white break-inside-avoid"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <BiStar className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h6 className="text-base font-medium text-gray-900">{item.title}</h6>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <p className="mt-8 text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}