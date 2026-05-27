import React from 'react';

interface Position {
  role: string;
  company: string;
  duration: string;
  location: string;
  highlights: string[];
}

export const Experience: React.FC = () => {
  const experiences: Position[] = [
    {
      role: 'Full-Stack Developer (Intern)',
      company: 'Airportels',
      duration: '2025 - 2026',
      location: 'Hybrid (Remote + Office, Nonthaburi, Thailand)',
      highlights: [
        'Designed and implemented RESTful APIs for luggage check-in, storage tracking, and retrieval workflows used in live airport operations.',
        'Architected the MySQL relational schema for storage slots, booking records, and customer data with integrity constraints.',
        'Built interactive frontend views using React and Laravel Blade, integrating AJAX and jQuery for real-time status updates without page reloads.',
        'Handled end-to-end request and response cycles, input validation, and error handling across the full stack.',
        'Collaborated with team members via Git and Lark, participating in code reviews and iterative feature delivery.',
      ],
    },
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <span className="mono-tag">[04 / TIMELINE]</span>
        <h2 style={{ marginBottom: '3.5rem' }}>Professional Experience</h2>

        <div
          style={{
            position: 'relative',
            paddingLeft: '2rem',
            borderLeft: '1px dashed var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            marginLeft: '8px',
          }}
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
              }}
            >
              {/* Timeline marker */}
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(-2rem - 6px)',
                  top: '6px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-primary)',
                  border: '4px solid var(--bg)',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    {exp.company}
                  </span>
                </div>

                <div
                  style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {exp.duration}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Accomplishment highlights list */}
              <ul
                style={{
                  listStyle: 'none',
                  paddingLeft: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {exp.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      position: 'relative',
                      paddingLeft: '1.25rem',
                    }}
                  >
                    {/* Bullet marker */}
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'var(--text-tertiary)',
                        borderRadius: '50%',
                      }}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
