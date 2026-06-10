export const About: React.FC = () => {
  const skills = [
    'TypeScript', 'React', 'Laravel', 'PostgreSQL', 'Docker',
    'REST APIs', 'SQL', 'GitHub Actions', 'Vite',
  ]

  const experience = [
    {
      period: '2022 — Present',
      title: 'Full-Stack Software Engineer',
      company: 'Current',
      description: 'Designing and building scalable web applications, RESTful APIs, and distributed systems. Focus on high-performance backend architecture and clean frontend interfaces.',
    },
    {
      period: '2021 — 2022',
      title: 'Software Developer',
      company: 'Previous',
      description: 'Developed full-stack solutions for queue management systems and database architectures. Implemented CI/CD pipelines and containerized deployments.',
    },
  ]

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-20 pb-16 animate-[fadeIn_0.8s_ease-out]">
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-neutral-400 block mb-4">
        [03 / ABOUT]
      </span>

      <section className="mb-16">
        <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold mb-6 pb-3 border-b border-neutral-200">
          About Me
        </h1>
        <div className="max-w-[700px] space-y-4">
          <p className="text-[1.05rem] leading-relaxed text-neutral-900">
            I am a Full-Stack Software Engineer specializing in backend architecture,
            distributed systems, and high-performance web applications. My work spans
            from designing database schemas for high-density academic platforms to
            building real-time queue management systems with sub-15ms dispatch times.
          </p>
          <p className="text-[1.05rem] leading-relaxed text-neutral-500">
            I focus on writing systems that are reliable, observable, and maintainable —
            bridging the gap between operational strength and clean product aesthetics.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold mb-6 pb-3 border-b border-neutral-200">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[0.8rem] px-3 py-1.5 rounded border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold mb-6 pb-3 border-b border-neutral-200">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.title} className="relative pl-6 border-l border-neutral-200">
              <span className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-neutral-900" />
              <span className="font-mono text-[0.75rem] text-neutral-400">{exp.period}</span>
              <h3 className="text-[1.05rem] font-semibold text-neutral-900 mt-1">{exp.title}</h3>
              <span className="text-[0.9rem] text-neutral-500">{exp.company}</span>
              <p className="text-[0.9rem] text-neutral-500 mt-2 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-neutral-900 text-white border border-neutral-900 px-5 py-2.5 rounded text-sm font-medium transition-all hover:bg-transparent hover:text-neutral-900"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </a>
      </section>
    </div>
  )
}
