import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps {
  simple?: boolean
}

const NavLink: React.FC<{ to: string; label: string; isActive: boolean; onClick: () => void }> = ({ to, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block transition-colors text-sm md:text-[13px] font-medium tracking-wide ${
      isActive ? 'text-ink' : 'text-muted hover:text-ink'
    }`}
  >
    <span>{label}</span>
  </Link>
)

export const Header: React.FC<HeaderProps> = ({ simple }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (simple) return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [simple])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || simple || menuOpen
          ? 'bg-paper/85 backdrop-blur-xl border-b border-rule'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
          <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-fit">
            <Link to="/" onClick={closeMenu} aria-label="logo" className="flex items-center gap-2 group">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-ink text-white display font-semibold text-sm">
                T
              </span>
              <span className="text-[15px] font-semibold text-ink tracking-tight display">
                teeraphat
              </span>
              <span className="text-[11px] text-muted mono hidden sm:inline-block ml-1 mt-0.5">
                · engineer
              </span>
            </Link>

            <div className="relative flex max-h-10 items-center lg:hidden">
              <button
                aria-label="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative -mr-6 p-6 active:scale-95 duration-300"
              >
                <div
                  aria-hidden="true"
                  className={`m-auto h-px w-5 bg-ink transition duration-300 origin-top ${
                    menuOpen ? 'rotate-45 translate-y-px' : ''
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`m-auto mt-1.5 h-px w-5 bg-ink transition duration-300 origin-bottom ${
                    menuOpen ? '-rotate-45 -translate-y-px' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {simple ? (
            <button
              onClick={() => navigate('/')}
              className="text-xs text-muted hover:text-ink transition-colors mono"
            >
              ← back
            </button>
          ) : (
            <>
              <div
                aria-hidden="true"
                className={`fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-paper/95 backdrop-blur-2xl transition duration-500 lg:hidden ${
                  menuOpen ? 'origin-top scale-y-100' : ''
                }`}
                onClick={closeMenu}
              />
              <div
                className={`invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 border border-rule bg-paper p-8 opacity-0 transition-all duration-300 lg:visible lg:relative lg:flex lg:w-fit lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-8 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 ${
                  menuOpen ? 'visible scale-100 opacity-100' : ''
                }`}
              >
                <div className="w-full lg:w-auto">
                  <div className="flex flex-col gap-5 lg:flex-row lg:gap-8 lg:items-center">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        label={link.label}
                        isActive={location.pathname === link.path}
                        onClick={closeMenu}
                      />
                    ))}
                    <a
                      href="/Resume_Teeraphat_Lansantad.pdf"
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMenu}
                      className="block text-sm font-medium text-muted hover:text-ink transition-colors tracking-wide"
                    >
                      Resume
                    </a>
                  </div>
                </div>

                <div className="mt-2 lg:mt-0">
                  <button
                    onClick={() => { closeMenu(); navigate('/contact') }}
                    className="inline-flex h-10 items-center justify-center px-5 bg-mint text-white text-sm font-medium rounded-full transition hover:bg-mint-deep active:scale-[0.98]"
                  >
                    Hire me
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}