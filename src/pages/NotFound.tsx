import { Link } from 'react-router-dom'
import { Container } from '../components/Container'

export const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <div className="display text-[8rem] md:text-[10rem] font-semibold text-mint/30 leading-none tracking-[-0.05em] mb-2">
            404
          </div>
          <h1 className="display text-3xl md:text-4xl font-semibold text-ink mb-4 tracking-[-0.02em]">
            Page not found
          </h1>
          <p className="text-body mb-8 leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center px-6 bg-ink text-white text-sm font-medium rounded-full transition hover:bg-ink/90 active:scale-[0.98]"
          >
            ← Back home
          </Link>
        </div>
      </Container>
    </div>
  )
}