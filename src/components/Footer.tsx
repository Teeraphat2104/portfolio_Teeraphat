import { BiLogoGithub, BiLogoLinkedin, BiEnvelope } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Container } from './Container'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/teeraphat2104',
    icon: <BiLogoGithub className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/teeraphat-lansantahd-a99166385/',
    icon: <BiLogoLinkedin className="w-5 h-5" />,
  },
  {
    label: 'Email',
    href: 'mailto:tlansantad@gmail.com',
    icon: <BiEnvelope className="w-5 h-5" />,
  },
]

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 md:py-14 border-t border-gray-200 mt-10 bg-white">
      <Container>
        <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
          <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
            <div className="flex w-full justify-center space-x-8 text-gray-600 sm:w-7/12 md:justify-start">
              <ul className="list-inside list-disc space-y-6">
                <li><Link to="/" className="transition hover:text-black">Home</Link></li>
                <li><Link to="/projects" className="transition hover:text-black">Projects</Link></li>
                <li><Link to="/about" className="transition hover:text-black">About</Link></li>
                <li><Link to="/contact" className="transition hover:text-black">Contact</Link></li>
              </ul>

              <ul className="space-y-6">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer" className="flex items-center space-x-3 transition hover:text-black">
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="m-auto mt-6 w-10/12 space-y-4 text-center sm:mt-auto sm:w-5/12 sm:text-left">
              <span className="block text-gray-500">
                Full-Stack Software Engineer focused on scalable systems and refined interfaces.
              </span>
              <span className="block text-gray-400">
                &copy; {new Date().getFullYear()} TEERAPHAT.SYS[ENG]
              </span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-10">
          Built with React + Tailwind CSS
        </p>
      </Container>
    </footer>
  )
}