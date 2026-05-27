import React, { useEffect } from 'react';
import type { Project } from './Projects';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 199,
          animation: 'fadeIn 0.2s ease-out',
        }}
      />

      {/* Slide-out Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(640px, 100vw)',
          backgroundColor: 'var(--card-bg)',
          borderLeft: '1px solid var(--border)',
          zIndex: 200,
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.05em',
              }}
            >
              [ARCHITECTURE DEEP-DIVE]
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 600 }}>{project.title}</h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              transition: 'border-color 0.2s, background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            title="Close Drawer"
            aria-label="Close"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          {/* Section 1: Overview */}
          <div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              01 // PROJECT OVERVIEW
            </span>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{project.longDescription}</p>
          </div>

          {/* Section 2: Architecture Diagram */}
          <div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              02 // SYSTEM ARCHITECTURE MODEL
            </span>
            <div
              style={{
                position: 'relative',
                overflowX: 'auto',
                backgroundColor: 'var(--code-bg)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '1.25rem',
              }}
            >
              <pre
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  lineHeight: '1.4',
                  color: 'var(--text-primary)',
                  margin: 0,
                  whiteSpace: 'pre',
                }}
              >
                {project.diagram}
              </pre>
            </div>
          </div>

          {/* Section 3: Engineering Challenges */}
          <div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              03 // CORE TECHNICAL CHALLENGES
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {project.challenges.map((challenge, index) => (
                <div
                  key={index}
                  style={{
                    borderLeft: '2px solid var(--text-primary)',
                    paddingLeft: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      CHALLENGE_0{index + 1}: PROBLEM
                    </span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {challenge.problem}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      CHALLENGE_0{index + 1}: ARCHITECTURAL SOLUTION
                    </span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Performance Benchmarks */}
          <div>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              04 // PERFORMANCE BENCHMARKS
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
              }}
            >
              {project.metrics.map((metric, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '1rem',
                    backgroundColor: 'var(--code-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.65rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {metric.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '1rem',
          }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Review Codebase
          </a>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{
              padding: '0.6rem 1.2rem',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
