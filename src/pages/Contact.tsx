import { BiLogoGithub, BiLogoLinkedin, BiEnvelope } from 'react-icons/bi'
import { Container } from '../components/Container'

export const Contact: React.FC = () => {
  const links = [
    {
      label: 'GitHub',
      value: 'github.com/teeraphat2104',
      href: 'https://github.com/teeraphat2104',
      icon: <BiLogoGithub className="w-5 h-5" />,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/teeraphat-lansantahd-a99166385',
      href: 'https://www.linkedin.com/in/teeraphat-lansantahd-a99166385/',
      icon: <BiLogoLinkedin className="w-5 h-5" />,
    },
    {
      label: 'Email',
      value: 'tlansantad@gmail.com',
      href: 'mailto:tlansantad@gmail.com',
      icon: <BiEnvelope className="w-5 h-5" />,
    },
  ]

  return (
    <div className="pt-16 pb-10 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="md:w-2/3 lg:w-1/2 mb-6">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
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
              className="border border-gray-200 p-6 bg-white transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5 group"
            >
              <div className="text-gray-900 mb-4">{link.icon}</div>
              <h3 className="font-medium text-gray-900 mb-1">{link.label}</h3>
              <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </div>
  )
}