import { useNavigate } from 'react-router-dom'
import { Container } from './Container'

export const CallToAction: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="relative py-16">
      <Container>
        <div className="relative">
          <div className="mt-6 space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-4xl font-medium text-gray-900 md:text-5xl">
              Let's build something together
            </h1>
            <p className="text-xl text-gray-600">
              I am always open to discussing new projects, interesting opportunities, or ideas.
            </p>
            <div className="flex flex-wrap gap-6">
              <button
                onClick={() => navigate('/contact')}
                className="flex h-12 w-full items-center justify-center px-8 bg-black text-white text-sm font-medium transition hover:bg-gray-800 active:bg-gray-900 sm:w-max"
              >
                Get in Touch
              </button>
              <button
                onClick={() => navigate('/projects')}
                className="flex h-12 w-full items-center justify-center px-8 border border-gray-300 text-gray-700 text-sm font-medium transition hover:border-gray-900 hover:text-gray-900 sm:w-max"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}