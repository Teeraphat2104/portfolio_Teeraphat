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
      role: 'Senior Full-Stack Engineer',
      company: 'Aether Systems Inc.',
      duration: '2024 - PRESENT',
      location: 'Remote, SF',
      highlights: [
        'Designed and coordinated migration of core monolithic transactional services into lightweight Go microservices connected via gRPC, achieving a 34% reduction in infrastructure operating costs.',
        'Refactored analytical dashboard frontend utilizing React and a custom client virtualized list system, boosting large data set render times by 10x (interactive under 12ms).',
        'Implemented distributed cache synchronization policies using Redis cluster and pub/sub nodes, reducing stale query occurrences on replicated database nodes to zero.',
      ],
    },
    {
      role: 'Software Systems Engineer',
      company: 'Logicloud Global',
      duration: '2022 - 2024',
      location: 'Austin, TX',
      highlights: [
        'Built dynamic reverse proxy middleware in Rust with WebAssembly plugins to evaluate token-bucket rate limiting logic on active edge API gateways, preventing request flood outages.',
        'Designed SQL transaction schemas and indexing architectures on PostgreSQL clusters, reducing concurrent deadlock occurrence rates by 95% under high-frequency writes.',
        'Structured automated CI/CD validation checks via GitHub Actions and Terraform, decreasing deployment pipeline failures and cutting average cycle times down by 14 minutes.',
      ],
    },
    {
      role: 'Associate Software Developer',
      company: 'Vector Code Labs',
      duration: '2020 - 2022',
      location: 'New York, NY',
      highlights: [
        'Developed full-stack web features using Node.js, Express, and React, building flexible user interaction workflows and secure JWT-based auth systems.',
        'Optimized internal database search routines by incorporating Elasticsearch indexes, dropping search query response latency averages from 1.2s down to 85ms.',
        'Collaborated with product designers to draft standard monochrome responsive layouts, yielding accessible interface compatibility across mobile web browsers.',
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
