import { BiLogoGithub, BiLogoLinkedin, BiEnvelope, BiHeart } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Container } from './Container'

const socialLinks = [
  {
    label: 'GitHub',
    handle: '@teeraphat2104',
    href: 'https://github.com/teeraphat2104',
    icon: BiLogoGithub,
  },
  {
    label: 'LinkedIn',
    handle: 'in/teeraphat',
    href: 'https://www.linkedin.com/in/teeraphat-lansantahd-a99166385/',
    icon: BiLogoLinkedin,
  },
  {
    label: 'Email',
    handle: 'tlansantad@gmail.com',
    href: 'mailto:tlansantad@gmail.com',
    icon: BiEnvelope,
  },
]

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-rule bg-paper">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-ink text-white display font-semibold text-sm">
                T
              </span>
              <span className="display text-[15px] font-semibold text-ink tracking-tight">
                teeraphat
              </span>
            </div>
            <p className="text-sm text-body max-w-sm leading-relaxed">
              Full-stack engineer in Bangkok. Currently building at{' '}
              <span className="text-ink font-medium">Airportels</span> — designing backends that don't fold under load.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-rule rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-mint animate-[pulse-dot_2s_ease-in-out_infinite]" />
                <span className="relative rounded-full h-2 w-2 bg-mint" />
              </span>
              <span className="text-xs font-medium text-ink mono uppercase tracking-wider">Available for hire</span>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold text-muted mono uppercase tracking-[0.2em] mb-4">Sitemap</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/projects', label: 'Work' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink hover:text-mint-deep transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-semibold text-muted mono uppercase tracking-[0.2em] mb-4">Find me</h4>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-ink hover:text-mint-deep transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted group-hover:text-mint-deep transition-colors" />
                      <span className="font-medium">{link.label}</span>
                      <span className="text-muted mono text-xs">{link.handle}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted mono">
          <span>© {new Date().getFullYear()} Teeraphat Lansantad. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            Built with care <BiHeart className="w-3 h-3 text-mint" /> using React + Tailwind
          </span>
        </div>
      </Container>
    </footer>
  )
}