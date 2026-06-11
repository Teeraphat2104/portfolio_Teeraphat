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
 <div className="text-gray-600 " id="reviews">
 <Container>
 <div className="mb-20 space-y-4 px-6 md:px-0">
 <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl">
 Featured Projects
 </h2>
 </div>
 <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
 {highlights.map((item) => (
 <div
 key={item.title}
 className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10 break-inside-avoid"
 >
 <div className="flex gap-4">
 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
 </svg>
 </div>
 <div>
 <h6 className="text-lg font-medium text-gray-700 ">{item.title}</h6>
 <p className="text-sm text-gray-500 ">{item.role}</p>
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
