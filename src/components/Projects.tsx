import React from 'react';

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  challenges: { problem: string; solution: string }[];
  diagram: string;
  github: string;
  demo?: string;
}

interface ProjectsProps {
  hoveredSkill: string | null;
  onSelectProject: (project: Project) => void;
}

export const projectsData: Project[] = [
  {
    id: 'barbershop',
    title: 'Barbershop Booking & Queue Management System',
    role: 'Lead Developer & Architect',
    description: 'A comprehensive scheduling and real-time barber queue management system featuring point-of-sale integration and a full-coverage Pest API test suite.',
    longDescription: 'This project is a high-reliability queue management and shop coordination platform designed for modern barbershops. It integrates dedicated client appointment flows, real-time barber dashboards, and an automated point-of-sale billing module (POSBarber). Equipped with an extensive, automated Pest testing framework that guarantees transactional integrity and validation consistency across administrative, shop, and booking routes.',
    technologies: ['SQL', 'REST APIs', 'PostgreSQL', 'GitHub Actions'],
    metrics: [
      { label: 'QUEUE DISPATCH TIME', value: '< 15ms' },
      { label: 'TEST SUITE COVERAGE', value: '100% (Pest)' },
      { label: 'POS TX LATENCY', value: '< 120ms' }
    ],
    challenges: [
      {
        problem: 'Preventing double-booking and concurrency conflicts during high-frequency appointment spikes.',
        solution: 'Implemented strict pessimistic database locks on active booking transactions combined with multi-layered Eloquent validation rules.'
      },
      {
        problem: 'Ensuring real-time synchronization of queue counters for customer and barber dashboards.',
        solution: 'Built an active polling and transactional event dispatch dispatcher that syncs frontend client slots with local database states instantaneously.'
      }
    ],
    diagram: `
+-------------------------------------------------------------+
|                      CLIENT BROWSER (Blade UI)              |
+-------------------------------------------------------------+
                               |
                               | (HTTP/JSON APIs)
                               v
+-------------------------------------------------------------+
|                     LARAVEL CORE APP                        |
|   (BookingController, BarberController, POSBarber Module)   |
+-------------------------------------------------------------+
         |                                     |
         v (Database Locks)                    v (Pest Sandbox)
+------------------+                 +------------------+
| PostgreSQL / DB  |                 |  Pest Test Suite |
+------------------+                 +------------------+
`,
    github: 'https://github.com/example/Barbershop-Booking-Queue-Management-System'
  },
  {
    id: 'university_db',
    title: 'University Database System',
    role: 'DevOps & Database Architect',
    description: 'A fully containerized database service layer designed for high-density academic data structures and Docker-orchestrated deployments.',
    longDescription: 'Created a multi-container local university database platform designed for high-density academic profiles. Features decoupled PHP services, custom reverse-proxy routers, and dedicated caching caches. Standardized system staging, health checking caches, and compiled test suites using isolated docker configurations to guarantee clean, replicable developer setups.',
    technologies: ['Docker', 'PostgreSQL', 'SQL'],
    metrics: [
      { label: 'CONTAINER STARTUP', value: '< 12s' },
      { label: 'CONCURRENT QUERIES', value: '8,500 qps' },
      { label: 'PROXY OVERHEAD', value: '< 1.2ms' }
    ],
    challenges: [
      {
        problem: 'Minimizing local environment startup times and memory footprint while matching strict production parity.',
        solution: 'Engineered optimized multi-stage Docker builds and layered volume mounts to decouple static cache structures from the active environment container.'
      },
      {
        problem: 'Synchronizing nested academic records and user access profiles efficiently.',
        solution: 'Designed robust database migration schemas with indexed composite keys, database integrity triggers, and automated seeding algorithms.'
      }
    ],
    diagram: `
+-------------------------------------------------------------+
|                     NGINX REVERSE PROXY                     |
+-------------------------------------------------------------+
                               |
                               v (Docker Network)
+-------------------------------------------------------------+
|                      LARAVEL APP CONTAINER                  |
+-------------------------------------------------------------+
         |                                     |
         v (TCP connection)                    v (Volume Mount)
+------------------+                 +------------------+
| PostgreSQL Container |             | Local Asset Cache|
+------------------+                 +------------------+
`,
    github: 'https://github.com/example/university_db.app.local'
  },
  {
    id: 'alumni',
    title: 'Alumni Portal Platform',
    role: 'Lead Full-Stack Developer',
    description: 'A scalable educational networking portal integrating career path workflows, automated flows, and a custom security routing module.',
    longDescription: 'Alumni Portal is a dynamic social network connecting university graduates. Built with responsive layout structures, custom database profiling schemas, and a dedicated career tracking flow. Features a specialized system matchmaking framework (BanditSystem) that optimizes and profiles graph connections to deliver high-performance matchmaking.',
    technologies: ['TypeScript', 'REST APIs', 'SQL'],
    metrics: [
      { label: 'CONNECTION RESOLVE', value: '< 25ms' },
      { label: 'ACTIVE PROFILES', value: '50,000+' },
      { label: 'ASSET BUILD TIME', value: '< 1.8s' }
    ],
    challenges: [
      {
        problem: 'Generating custom networking recommendations across thousands of nested alumni graph connections without bottlenecking.',
        solution: 'Implemented eager load relational policies combined with key-based Memcached indexes to fetch active graph branches in O(1) time.'
      },
      {
        problem: 'Ensuring secure multi-tier user registration and onboarding states across multiple directories.',
        solution: 'Designed distinct database verification models integrated with standard route middleware to validate registration states securely.'
      }
    ],
    diagram: `
+-------------------------------------------------------------+
|                    ALUMNI CLIENT (Vite / TS)                |
+-------------------------------------------------------------+
                               |
                               v (API Paths)
+-------------------------------------------------------------+
|                       BANDIT SYSTEM                         |
|           (Route Profiling & Matchmaking Core)              |
+-------------------------------------------------------------+
         |                                     |
         v (Eager Loading)                     v (Cache Sync)
+------------------+                 +------------------+
| Database Cluster |                 | Memcached Store  |
+------------------+                 +------------------+
`,
    github: 'https://github.com/example/alumni.app.local'
  }
];

export const Projects: React.FC<ProjectsProps> = ({ hoveredSkill, onSelectProject }) => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="mono-tag">[03 / PORTFOLIO]</span>
        <h2 style={{ marginBottom: '3rem' }}>System Engineering Projects</h2>

        <p
          style={{
            marginBottom: '3rem',
            maxWidth: '600px',
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
          }}
        >
          A selection of non-trivial architectural solutions addressing consistency, distribution, and real-time operations.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          {projectsData.map((project) => {
            // Check if the current hoveredSkill is used in this project
            const isRelevant = hoveredSkill ? project.technologies.includes(hoveredSkill) : true;
            const hasActiveSelection = hoveredSkill !== null;
            const isDimmed = hasActiveSelection && !isRelevant;

            return (
              <div
                key={project.id}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  backgroundColor: 'var(--card-bg)',
                  opacity: isDimmed ? 0.3 : 1,
                  transform: isDimmed ? 'scale(0.99)' : 'scale(1)',
                  borderColor: hoveredSkill && isRelevant ? 'var(--text-primary)' : 'var(--border)',
                  boxShadow: hoveredSkill && isRelevant ? 'var(--shadow)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Visual Highlight indicator for matched tags */}
                {hoveredSkill && isRelevant && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg)',
                      borderRadius: '4px',
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    MATCHED BY HOVER
                  </span>
                )}

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
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{project.title}</h3>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.8rem',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    ROLE: {project.role}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    maxWidth: '800px',
                  }}
                >
                  {project.description}
                </p>

                {/* Key Metrics Section */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    padding: '1.25rem',
                    backgroundColor: 'var(--code-bg)',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                  }}
                >
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.7rem',
                          color: 'var(--text-tertiary)',
                          letterSpacing: '0.05em',
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

                {/* Technology Badges */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                  }}
                >
                  {project.technologies.map((tech) => {
                    const isMatched = hoveredSkill === tech;
                    return (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                          backgroundColor: isMatched ? 'var(--text-primary)' : 'var(--bg)',
                          color: isMatched ? 'var(--bg)' : 'var(--text-secondary)',
                          borderColor: isMatched ? 'var(--text-primary)' : 'var(--border)',
                          fontWeight: isMatched ? 600 : 400,
                          transition: 'all 0.2s',
                        }}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <button onClick={() => onSelectProject(project)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Explore Architecture
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Source Code
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
