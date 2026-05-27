import React from 'react';

interface Skill {
  name: string;
  meter: string;
  level: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsProps {
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ hoveredSkill, setHoveredSkill }) => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'LANGUAGES',
      skills: [
        { name: 'TypeScript', meter: '■■■■■■■■□□', level: 'Expert' },
        { name: 'Go', meter: '■■■■■■■□□□', level: 'Advanced' },
        { name: 'Rust', meter: '■■■■■□□□□□', level: 'Intermediate' },
        { name: 'SQL', meter: '■■■■■■■■□□', level: 'Expert' },
        { name: 'Python', meter: '■■■■■■□□□□', level: 'Advanced' },
      ],
    },
    {
      title: 'BACKEND / DISTRIBUTED',
      skills: [
        { name: 'Node.js', meter: '■■■■■■■■□□', level: 'Expert' },
        { name: 'gRPC', meter: '■■■■■■□□□□', level: 'Advanced' },
        { name: 'WebSockets', meter: '■■■■■■■□□□', level: 'Advanced' },
        { name: 'REST APIs', meter: '■■■■■■■■■□', level: 'Expert' },
        { name: 'GraphQL', meter: '■■■■■■□□□□', level: 'Advanced' },
      ],
    },
    {
      title: 'DATABASES & CACHE',
      skills: [
        { name: 'PostgreSQL', meter: '■■■■■■■■□□', level: 'Expert' },
        { name: 'Redis', meter: '■■■■■■■□□□', level: 'Advanced' },
        { name: 'MongoDB', meter: '■■■■■■□□□□', level: 'Advanced' },
        { name: 'Kafka', meter: '■■■■■□□□□□', level: 'Intermediate' },
        { name: 'Elasticsearch', meter: '■■■■■□□□□□', level: 'Intermediate' },
      ],
    },
    {
      title: 'DEVOP & CLOUD',
      skills: [
        { name: 'Docker', meter: '■■■■■■■□□□', level: 'Advanced' },
        { name: 'Kubernetes', meter: '■■■■■□□□□□', level: 'Intermediate' },
        { name: 'Terraform', meter: '■■■■■□□□□□', level: 'Intermediate' },
        { name: 'AWS', meter: '■■■■■■□□□□', level: 'Advanced' },
        { name: 'GitHub Actions', meter: '■■■■■■■□□□', level: 'Advanced' },
      ],
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <span className="mono-tag">[02 / EXPERTISE]</span>
        <h2 style={{ marginBottom: '3rem' }}>Technical Skill Matrix</h2>

        <p
          style={{
            marginBottom: '3rem',
            maxWidth: '600px',
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
          }}
        >
          Hover over any key technology below to automatically filter and highlight projects utilizing
          that specific system stack.
        </p>

        <div className="grid-2">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '2rem',
                backgroundColor: 'var(--card-bg)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  borderBottom: '1px dotted var(--border)',
                  paddingBottom: '0.5rem',
                }}
              >
                {category.title}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {category.skills.map((skill, sIdx) => {
                  const isHovered = hoveredSkill === skill.name;
                  const hasActiveSelection = hoveredSkill !== null;
                  const isDimmed = hasActiveSelection && !isHovered;

                  return (
                    <div
                      key={sIdx}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '4px',
                        border: '1px solid transparent',
                        backgroundColor: isHovered ? 'var(--code-bg)' : 'transparent',
                        borderColor: isHovered ? 'var(--border)' : 'transparent',
                        opacity: isDimmed ? 0.35 : 1,
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span
                          style={{
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--mono)',
                            fontSize: '0.7rem',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {/* Monochrome block progress meter */}
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.85rem',
                          color: isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                          letterSpacing: '0.05em',
                          transition: 'color 0.2s',
                        }}
                      >
                        [{skill.meter}]
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
