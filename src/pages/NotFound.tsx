import { Link } from 'react-router-dom'
import { Container } from '../components/Container'

export const NotFound: React.FC = () => {
 return (
 <div className="pt-32 animate-[fadeIn_0.8s_ease-out]">
 <Container>
 <div className="text-center">
 <span className="font-mono text-[8rem] font-bold text-gray-200 leading-none block mb-4">404</span>
 <h1 className="text-3xl font-bold text-gray-800 mb-4">Page not found</h1>
 <p className="text-gray-500 mb-8 max-w-md mx-auto">
 The page you are looking for does not exist or has been moved.
 </p>
 <Link
 to="/"
 className="relative inline-flex h-11 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
 >
 <span className="relative text-base font-semibold text-white">← Back to Home</span>
 </Link>
 </div>
 </Container>
 </div>
 )
}
