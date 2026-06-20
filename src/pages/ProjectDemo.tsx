import { useParams, useNavigate } from 'react-router-dom'

export const ProjectDemo: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <button
        onClick={() => navigate(`/projects/${id}`)}
        className="text-sm text-muted hover:text-ink transition-colors inline-flex items-center gap-2 mb-8 mono"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        back to project
      </button>
      <div className="text-center py-20 bg-white border border-rule rounded-2xl">
        <h2 className="display text-2xl font-semibold text-ink mb-3 tracking-[-0.02em]">Demo: {id}</h2>
        <p className="text-body">Interactive demo content coming soon.</p>
      </div>
    </div>
  )
}