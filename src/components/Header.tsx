import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps {
 simple?: boolean
}

const NavLink: React.FC<{ to: string; label: string; isActive: boolean; onClick: () => void }> = ({ to, label, isActive, onClick }) => (
 <Link
 to={to}
 onClick={onClick}
 className={`block transition md:px-4 ${
 isActive ? 'text-primary font-semibold' : 'hover:text-primary :text-white'
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
 { path: '/', label: 'HOME' },
 { path: '/projects', label: 'PROJECTS' },
 { path: '/about', label: 'ABOUT' },
 { path: '/contact', label: 'CONTACT' },
 ]

 return (
 <header
 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
 isScrolled || simple
 ? 'bg-white/75 backdrop-blur-2xl border-b border-gray-100 '
 : 'bg-transparent border-b border-transparent'
 } ${menuOpen ? 'bg-white ' : ''}`}
 >
 <div className="max-w-7xl mx-auto px-6 md:px-12">
 <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
 <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-fit">
 <Link to="/" onClick={closeMenu} aria-label="logo" className="flex items-center space-x-2">
 <div aria-hidden="true" className="flex space-x-1">
 <div className="size-3 rounded-full bg-gray-900 " />
 <div className="h-5 w-1.5 bg-primary" />
 </div>
 <span className="text-xl font-bold text-gray-900 ">
 {simple ? '<- TEERAPHAT.SYS[ENG]' : 'TEERAPHAT.SYS[ENG]'}
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
 className={`m-auto h-0.5 w-5 rounded bg-gray-950 transition duration-300 origin-top ${
 menuOpen ? 'rotate-45 translate-y-1.5' : ''
 }`}
 />
 <div
 aria-hidden="true"
 className={`m-auto mt-2 h-0.5 w-5 rounded bg-gray-950 transition duration-300 origin-bottom ${
 menuOpen ? '-rotate-45 -translate-y-1' : ''
 }`}
 />
 </button>
 </div>
 </div>

 {simple ? (
 <button
 onClick={() => navigate('/')}
 className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
 >
 {'<- BACK'}
 </button>
 ) : (
 <>
 <div
 aria-hidden="true"
 className={`fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 lg:hidden ${
 menuOpen ? 'origin-top scale-y-100' : ''
 }`}
 onClick={closeMenu}
 />
 <div
 className={`invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 lg:visible lg:relative lg:flex lg:w-fit lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg: ${
 menuOpen ? 'visible scale-100 opacity-100' : ''
 }`}
 >
 <div className="w-full text-gray-600 lg:w-auto lg:pr-4 lg:pt-0">
 <div className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
 {navLinks.map((link) => (
 <NavLink
 key={link.path}
 to={link.path}
 label={link.label}
 isActive={location.pathname === link.path}
 onClick={closeMenu}
 />
 ))}
 </div>
 </div>

 <div className="mt-12 lg:mt-0">
 <button
 onClick={() => { closeMenu(); navigate('/contact') }}
 className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
 >
 <span className="relative text-sm font-semibold text-white">Get in Touch</span>
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
