export const About: React.FC = () => {
  const skills = {
    Frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js", "blade"],
    Backend: ["Node.js", "Express", "Go", "Laravel", "RESTful APIs"],
    Databases: ["PostgreSQL", "MongoDB"],
    "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD"],
    Tools: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "fork",
      "ngrok",
      "Lark",
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
            I am a Full-Stack Software Engineer specializing in backend
            architecture, distributed systems, and high-performance web
            applications. My work spans from designing database schemas for
            high-density academic platforms to building real-time queue
            management systems with sub-15ms dispatch times.
          </p>
          <p className="text-[1.05rem] leading-relaxed text-neutral-500">
            I focus on writing systems that are reliable, observable, and
            maintainable — bridging the gap between operational strength and
            clean product aesthetics.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold mb-6 pb-3 border-b border-neutral-200">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp) => (
            <div
              key={exp.title}
              className="relative pl-6 border-l border-neutral-200"
            >
              <span className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-neutral-900" />
              <span className="font-mono text-[0.75rem] text-neutral-400">
                {exp.period}
              </span>
              <h3 className="text-[1.05rem] font-semibold text-neutral-900 mt-1">
                {exp.title}
              </h3>
              <span className="text-[0.9rem] text-neutral-500">
                {exp.company}
              </span>
              <p className="text-[0.9rem] text-neutral-500 mt-2 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold mb-6 pb-3 border-b border-neutral-200">
          Skills & Technologies
        </h2>
        <div className="space-y-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                {category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[0.8rem] px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-semibold mb-6 pb-3 border-b border-neutral-200">
          Education
        </h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.title}
              className="relative pl-6 border-l border-neutral-200"
            >
              <span className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-neutral-900" />
              <span className="font-mono text-[0.75rem] text-neutral-400">
                {edu.period}
              </span>
              <h3 className="text-[1.05rem] font-semibold text-neutral-900 mt-1">
                {edu.title}
              </h3>
              <span className="text-[0.9rem] text-neutral-500">
                {edu.institution}
              </span>
              <p className="text-[0.9rem] text-neutral-500 mt-2 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
