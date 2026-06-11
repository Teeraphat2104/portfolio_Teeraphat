import { Container } from '../components/Container'

export const Contact: React.FC = () => {
 const links = [
 {
 label: 'GitHub',
 value: 'github.com/teeraphat2104',
 href: 'https://github.com/teeraphat2104',
 icon: (
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
 </svg>
 ),
 },
 {
 label: 'LinkedIn',
 value: 'linkedin.com/in/teeraphat-lansantahd-a99166385',
 href: 'https://www.linkedin.com/in/teeraphat-lansantahd-a99166385/',
 icon: (
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
 <rect x="2" y="9" width="4" height="12" />
 <circle cx="4" cy="4" r="2" />
 </svg>
 ),
 },
 {
 label: 'Email',
 value: 'tlansantad@gmail.com',
 href: 'mailto:tlansantad@gmail.com',
 icon: (
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
 <polyline points="22,6 12,13 2,6" />
 </svg>
 ),
 },
 ]

 return (
 <div className="pt-24 pb-16 animate-[fadeIn_0.8s_ease-out]">
 <Container>
 <div className="md:w-2/3 lg:w-1/2 mb-12">
 <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
 Get in Touch
 </h1>
 <p className="text-gray-600 leading-relaxed">
 I am always open to discussing new projects, interesting opportunities,
 or ideas. Feel free to reach out through any of the channels below.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {links.map((link) => (
 <a
 key={link.label}
 href={link.href}
 target="_blank"
 rel="noreferrer"
 className="border border-gray-100 rounded-3xl p-6 bg-white shadow-2xl shadow-gray-600/10 transition-all duration-300 hover:border-gray-300 :border-gray-600 hover:-translate-y-1 group"
 >
 <div className="text-gray-900 mb-4">{link.icon}</div>
 <h3 className="font-semibold text-gray-800 mb-1">{link.label}</h3>
 <span className="font-mono text-sm text-gray-500 group-hover:text-primary transition-colors">
 {link.value}
 </span>
 </a>
 ))}
 </div>
 </Container>
 </div>
 )
}
