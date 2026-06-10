import { useParams, useNavigate } from 'react-router-dom'

export const ProjectDemo: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-24 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <button
        onClick={() => navigate(`/projects/${id}`)}
        className="font-mono text-sm text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-2 mb-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        BACK TO PROJECT
      </button>
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Demo: {id}</h2>
        <p className="text-neutral-500">Interactive demo content coming soon.</p>
      </div>
    </div>
  )
}
