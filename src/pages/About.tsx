import { getTechIcon } from '../lib/techIcons'
import { Container } from '../components/Container'

const tagColors: Record<string, string> = {
  React: 'bg-blue-soft text-blue-deep border-blue/15',
  TypeScript: 'bg-blue-soft text-blue-deep border-blue/15',
  'Next.js': 'bg-ink/5 text-ink border-ink/10',
  'Node.js': 'bg-mint-soft text-mint-deep border-mint/15',
  PostgreSQL: 'bg-blue-soft text-blue-deep border-blue/15',
  MongoDB: 'bg-mint-soft text-mint-deep border-mint/15',
  Go: 'bg-blue-soft text-blue-deep border-blue/15',
  Laravel: 'bg-ink/5 text-ink border-ink/10',
}

export const About: React.FC = () => {
  const skills = {
    Frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    Backend: ["Node.js", "Express", "Go", "Laravel", "RESTful APIs"],
    Databases: ["PostgreSQL", "MongoDB"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD"],
    Tools: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Notion",
      "Figma",
    ],
    AI: ["ChatGPT", "GitHub Copilot", "Claude"],
  };

  const experience = [
    {
      period: "November 2025 — March 2026",
      title: "Full-Stack Software Engineer Intern",
      company: "Airportels Co., Ltd.",
      description: [
        "Developed and maintained web applications using Laravel.",
        "Designed and implemented RESTful APIs for internal and external services.",
        "Optimized database queries and improved application performance.",
        "Collaborated with product managers, designers, and developers to deliver new features.",
        "Built responsive and user-friendly interfaces for desktop and mobile devices.",
        "Participated in code reviews, testing, debugging.",
      ],
    },
    {
      period: "2025",
      title: "Full-Stack Developer",
      company: "Chaiyaphum Rajabhat University",
      description:
        "Developed Granduate Management System, a high-density academic platform supporting 10k+ concurrent users with real-time data processing and analytics.",
    },
  ];

  const education = [
    {
      period: "2022 — 2026",
      title: "B.Sc. in Computer Science",
      institution: "Chaiyaphum Rajabhat University",
      description:
        "Web Development, Database Systems, Software Engineering, Distributed Systems, and Computer Networks.",
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 animate-[fadeIn_0.8s_ease-out]">
      <Container>
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-mint-deep mono uppercase tracking-[0.2em]">/about</span>
            <span className="h-px w-8 bg-mint/40" />
          </div>
          <h1 className="display text-4xl md:text-5xl xl:text-6xl font-semibold text-ink tracking-[-0.025em] leading-[1.05]">
            Hi, I'm Tor.
          </h1>
        </div>

        <div className="max-w-3xl space-y-5 mb-16">
          <p className="text-xl md:text-2xl leading-snug text-ink display font-medium tracking-[-0.01em]">
            I build backends that stay up, schemas that scale, and the interfaces that ride on top of them.
          </p>
          <p className="text-lg leading-relaxed text-body">
            Full-stack engineer specializing in backend architecture, distributed systems, and high-performance web applications. My work spans from designing database schemas for high-density academic platforms to building real-time queue management systems with sub-15ms dispatch times.
          </p>
          <p className="text-lg leading-relaxed text-body">
            I focus on writing systems that are reliable, observable, and maintainable — bridging the gap between operational strength and clean product aesthetics.
          </p>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="display text-2xl md:text-3xl font-semibold text-ink tracking-[-0.02em]">
              Experience
            </h2>
            <span className="text-xs text-muted mono ml-2">02 positions</span>
          </div>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <article
                key={exp.title}
                className="relative bg-white border border-rule rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="display text-xl md:text-2xl font-semibold text-ink tracking-[-0.01em]">
                    {exp.title}
                  </h3>
                  <span className="text-xs text-muted mono">{exp.period}</span>
                </div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-mint-deep">{exp.company}</span>
                  <span className="text-[10px] font-semibold text-mint-deep mono uppercase tracking-[0.15em] bg-mint-soft px-2 py-0.5 rounded-md">
                    {idx === 0 ? 'Current' : 'Previous'}
                  </span>
                </div>
                <div className="text-base text-body leading-relaxed">
                  {Array.isArray(exp.description) ? (
                    <ul className="space-y-2">
                      {exp.description.map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-mint mt-1.5 flex-shrink-0">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{exp.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="display text-2xl md:text-3xl font-semibold text-ink tracking-[-0.02em]">
              Skills & Technologies
            </h2>
          </div>
          <div className="space-y-6 bg-white border border-rule rounded-2xl p-6 md:p-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-muted mono uppercase">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => {
                    const Icon = getTechIcon(skill)
                    return (
                      <span
                        key={skill}
                        className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 border rounded-md mono ${
                          tagColors[skill] || 'bg-paper text-ink border-rule'
                        }`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="display text-2xl md:text-3xl font-semibold text-ink tracking-[-0.02em]">
              Education
            </h2>
          </div>
          <article className="bg-white border border-rule rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h3 className="display text-xl md:text-2xl font-semibold text-ink tracking-[-0.01em]">
                {education[0].title}
              </h3>
              <span className="text-xs text-muted mono">{education[0].period}</span>
            </div>
            <div className="text-sm font-medium text-mint-deep mb-3">
              {education[0].institution}
            </div>
            <p className="text-base text-body leading-relaxed">
              {education[0].description}
            </p>
          </article>
        </section>
      </Container>
    </div>
  );
};