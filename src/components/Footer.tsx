import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 py-8 mt-16">
      <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-neutral-400">
          © {new Date().getFullYear()} TEERAPHAT.SYS[ENG]
        </span>
        <div className="flex items-center gap-6">
          <Link to="/" className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
            HOME
          </Link>
          <Link to="/projects" className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
            PROJECTS
          </Link>
          <Link to="/about" className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
            ABOUT
          </Link>
          <Link to="/contact" className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
            CONTACT
          </Link>
        </div>
      </div>
    </footer>
  )
}
