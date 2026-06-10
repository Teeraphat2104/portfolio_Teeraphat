export const Contact: React.FC = () => {
  const links = [
    {
      label: 'GitHub',
      value: 'github.com/teeraphat2104',
      href: 'https://github.com/teeraphat2104',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/teeraphat',
      href: 'https://linkedin.com/in/teeraphat',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: 'teeraphat@example.com',
      href: 'mailto:teeraphat@example.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
        [04 / CONTACT]
      </span>
      <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-4 pb-3 border-b border-neutral-200">
        Get in Touch
      </h1>
      <p className="text-[0.95rem] text-neutral-500 max-w-[500px] mt-6 mb-12">
        I am always open to discussing new projects, interesting opportunities,
        or ideas. Feel free to reach out through any of the channels below.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="border border-neutral-200 rounded-lg p-6 bg-white transition-all duration-250 hover:border-neutral-900 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05),0_2px_8px_-1px_rgba(0,0,0,0.03)] group"
          >
            <div className="text-neutral-900 mb-4">{link.icon}</div>
            <h3 className="font-semibold text-neutral-900 mb-1">{link.label}</h3>
            <span className="font-mono text-[0.8rem] text-neutral-500 group-hover:text-neutral-900 transition-colors">
              {link.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
