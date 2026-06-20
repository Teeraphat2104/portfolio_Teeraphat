import { BiDownload, BiLogoFacebook, BiLogoGithub, BiLogoLinkedin, BiEnvelope, BiRightArrowAlt } from 'react-icons/bi'
import { Container } from '../components/Container'

export const Contact: React.FC = () => {
  const links = [
    {
      label: 'GitHub',
      handle: '@teeraphat2104',
      href: 'https://github.com/teeraphat2104',
      icon: BiLogoGithub,
      tone: 'ink' as const,
    },
    {
      label: 'LinkedIn',
      handle: 'in/teeraphat',
      href: 'https://www.linkedin.com/in/teeraphat-lansantahd-a99166385/',
      icon: BiLogoLinkedin,
      tone: 'blue' as const,
    },
    {
      label: 'Email',
      handle: 'tlansantad@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=tlansantad@gmail.com',
      icon: BiEnvelope,
      tone: 'mint' as const,
    },
    {
      label: 'Facebook',
      handle: 'tor.lansantad',
      href: 'https://www.facebook.com/tor.lansantad.teeraphat',
      icon: BiLogoFacebook,
      tone: 'blue' as const,
    },
    {
      label: 'Resume',
      handle: 'PDF · 1 page',
      href: '/Resume_Teeraphat_Lansantad.pdf',
      icon: BiDownload,
      tone: 'ink' as const,
    },
  ]

  const toneStyles: Record<string, string> = {
    mint: 'bg-mint-soft/50 border-mint/20 hover:border-mint/40',
    blue: 'bg-blue-soft/50 border-blue/20 hover:border-blue/40',
    ink: 'bg-paper border-rule hover:border-ink/30',
  }

  const toneIconStyles: Record<string, string> = {
    mint: 'text-mint-deep',
    blue: 'text-blue-deep',
    ink: 'text-ink',
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-mint-deep mono uppercase tracking-[0.2em]">/contact</span>
            <span className="h-px w-8 bg-mint/40" />
          </div>
          <h1 className="display text-4xl md:text-5xl xl:text-6xl font-semibold text-ink tracking-[-0.025em] leading-[1.05] mb-5">
            Let's build something together.
          </h1>
          <p className="text-lg text-body leading-relaxed">
            Open to full-time roles starting June 2026, interesting contract work, and conversations about backend architecture. Reach out through any channel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`group relative border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${toneStyles[link.tone]}`}
              >
                <div className={`mb-5 ${toneIconStyles[link.tone]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="display text-lg font-semibold text-ink tracking-[-0.01em] mb-1">
                  {link.label}
                </h3>
                <span className="text-sm text-body mono">
                  {link.handle}
                </span>
                <BiRightArrowAlt className="absolute top-6 right-6 w-5 h-5 text-muted opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
              </a>
            )
          })}
        </div>

        <div className="mt-16 bg-white border border-rule rounded-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inset-0 rounded-full bg-mint animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <span className="relative rounded-full h-3 w-3 bg-mint" />
            </span>
            <div>
              <div className="display text-base font-semibold text-ink">Available for hire</div>
              <div className="text-sm text-body">Full-time starting June 2026 · Bangkok / Remote</div>
            </div>
          </div>
          <a
            href="mailto:tlansantad@gmail.com"
            className="inline-flex h-11 items-center justify-center gap-2 px-5 bg-ink text-white text-sm font-medium rounded-full transition hover:bg-ink/90 active:scale-[0.98]"
          >
            Email me
            <BiRightArrowAlt className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </div>
  )
}