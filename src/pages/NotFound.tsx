import { Link } from 'react-router-dom'

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-32 text-center animate-[fadeIn_0.8s_ease-out]">
      <span className="font-mono text-[5rem] font-bold text-neutral-200 leading-none block mb-4">404</span>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-4">Page not found</h1>
      <p className="text-neutral-500 mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded text-sm font-medium transition-all hover:bg-neutral-800"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
