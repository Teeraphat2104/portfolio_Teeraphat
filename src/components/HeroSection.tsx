import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiRightArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import { Container } from './Container'

const liveMetrics = [
  { label: 'p99 dispatch', value: '15', unit: 'ms', tone: 'mint' as const },
  { label: 'concurrent users', value: '10k', unit: '+', tone: 'blue' as const },
  { label: 'tables shipped', value: '50', unit: '+', tone: 'mint' as const },
]

export const HeroSection: React.FC = () => {
  const navigate = useNavigate()
  const [now, setNow] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const hh = String(d.getUTCHours()).padStart(2, '0')
      const mm = String(d.getUTCMinutes()).padStart(2, '0')
      const ss = String(d.getUTCSeconds()).padStart(2, '0')
      setNow(`${hh}:${mm}:${ss} UTC`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative pt-12 pb-16 md:pt-16 md:pb-24">
      <Container>
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-rule rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-mint animate-[pulse-dot_2s_ease-in-out_infinite]" />
              <span className="relative rounded-full h-2 w-2 bg-mint" />
            </span>
            <span className="text-xs font-medium text-ink tracking-wide uppercase mono">Open to roles</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 text-xs text-muted mono">
            {now}
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="display text-5xl md:text-6xl xl:text-7xl font-semibold text-ink tracking-[-0.03em] text-balance leading-[1.05]">
            I build backends
            <br />
            that <span className="text-mint">don't fold</span>
            <br className="hidden sm:block" /> under load.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-body max-w-2xl mx-auto leading-relaxed">
            Full-stack engineer in Bangkok. Real-time queues, dense academic
            platforms, and the interfaces that ride on top — designed from
            schema up.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex h-12 items-center justify-center gap-2 px-6 bg-ink text-white text-sm font-medium rounded-full transition hover:bg-ink/90 active:scale-[0.98]"
            >
              View selected work
              <BiRightArrowAlt className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex h-12 items-center justify-center gap-2 px-6 bg-white border border-rule text-ink text-sm font-medium rounded-full transition hover:border-ink"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Big number block */}
        <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
          <div className="relative bg-white border border-rule rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Decorative gradient corner */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-mint-soft rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-soft rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-mint animate-[pulse-dot_2s_ease-in-out_infinite]" />
                    <span className="relative rounded-full h-2 w-2 bg-mint" />
                  </span>
                  <span className="text-xs font-medium text-ink mono uppercase tracking-wider">Live · production snapshot</span>
                </div>
                <span className="text-xs text-muted mono hidden sm:inline">updated {now}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {liveMetrics.map((m) => {
                  const isMint = m.tone === 'mint'
                  return (
                    <div
                      key={m.label}
                      className={`relative rounded-2xl p-5 md:p-6 border ${
                        isMint
                          ? 'bg-mint-soft/50 border-mint/20'
                          : 'bg-blue-soft/50 border-blue/20'
                      }`}
                    >
                      <div className={`text-[10px] font-semibold uppercase tracking-[0.15em] mono ${
                        isMint ? 'text-mint-deep' : 'text-blue-deep'
                      }`}>
                        {m.label}
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className={`display text-5xl md:text-6xl font-semibold tabular-nums ${
                          isMint ? 'text-mint-deep' : 'text-blue-deep'
                        }`}>
                          {m.value}
                        </span>
                        <span className={`display text-2xl md:text-3xl font-semibold ${
                          isMint ? 'text-mint' : 'text-blue'
                        }`}>
                          {m.unit}
                        </span>
                      </div>
                      <div className={`mt-3 flex items-center gap-1.5 text-xs mono ${
                        isMint ? 'text-mint-deep/70' : 'text-blue-deep/70'
                      }`}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 7L5 3L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        from production
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex justify-center">
          <a
            href="#selected-work"
            className="inline-flex flex-col items-center gap-2 text-muted hover:text-ink transition-colors group"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] mono">Scroll</span>
            <BiDownArrowAlt className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Container>
    </div>
  )
}