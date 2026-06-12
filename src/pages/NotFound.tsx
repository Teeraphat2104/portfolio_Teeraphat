import { Link } from 'react-router-dom'
import { Container } from '../components/Container'

export const NotFound: React.FC = () => {
  return (
    <div className="pt-20 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="text-center">
          <span className="text-[8rem] font-medium text-gray-200 leading-none block mb-4">404</span>
          <h1 className="text-3xl font-medium text-gray-900 mb-4">Page not found</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center px-6 bg-black text-white text-sm font-medium transition hover:bg-gray-800 active:bg-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </Container>
    </div>
  )
}