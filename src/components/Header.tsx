import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps {
  simple?: boolean
}

export const Header: React.FC<HeaderProps> = ({ simple }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (simple) return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [simple])

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${
        isScrolled || simple
          ? 'bg-white/75 backdrop-blur-xl border-b border-neutral-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1000px] mx-auto px-6 h-full flex items-center justify-between">
        <Link
          to="/"
          className="font-mono font-semibold text-[0.95rem] tracking-tight flex items-center gap-1.5 text-neutral-900 hover:opacity-60 transition-opacity"
        >
          <span className="w-2 h-2 bg-neutral-900 rounded-full" />
          {simple ? '<- TEERAPHAT.SYS[ENG]' : 'TEERAPHAT.SYS[ENG]'}
        </Link>

        {simple ? (
          <button
            onClick={() => navigate('/')}
            className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            {'<- BACK'}
          </button>
        ) : (
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  location.pathname === link.path
                    ? 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900 block" />
                )}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
