import React from 'react';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiGo, SiPhp,
  SiNodedotjs, SiLaravel, SiExpress, SiGin, SiFastapi,
  SiPostgresql, SiMysql, SiMongodb,
  SiDocker, SiGithubactions,
  SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap, SiJquery, SiMui,
  SiGit, SiGithub, SiPostman, SiFigma,
} from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import { FiDatabase, FiServer, FiRefreshCw, FiTerminal, FiGitBranch, FiMessageSquare } from 'react-icons/fi';
import type { IconType } from 'react-icons';

interface Skill {
  name: string;
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

const iconMap: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Go: SiGo,
  PHP: SiPhp,
  SQL: FiDatabase,
  'Node.js': SiNodedotjs,
  Laravel: SiLaravel,
  'Express.js': SiExpress,
  'REST APIs': FiServer,
  Gin: SiGin,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  'GitHub Actions': SiGithubactions,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  jQuery: SiJquery,
  AJAX: FiRefreshCw,
  'Material UI': SiMui,
  'VS Code': FaCode,
  Git: SiGit,
  GitHub: SiGithub,
  Lark: FiMessageSquare,
  Postman: SiPostman,
  Bruno: FiTerminal,
  Fork: FiGitBranch,
  Figma: SiFigma,
};

const levelDots: Record<string, string> = {
  Expert: '···',
  Advanced: '··',
  Intermediate: '··',
  Beginner: '·',
};

export const Skills: React.FC<SkillsProps> = ({ hoveredSkill, setHoveredSkill }) => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'LANGUAGES',
      skills: [
        { name: 'HTML5', level: 'Expert' },
        { name: 'CSS3', level: 'Expert' },
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'TypeScript', level: 'Advanced' },
        { name: 'Go', level: 'Beginner' },
        { name: 'PHP', level: 'Intermediate' },
        { name: 'SQL', level: 'Beginner' },
      ],
    },
    {
      title: 'BACKEND / DISTRIBUTED',
      skills: [
        { name: 'Node.js', level: 'Beginner' },
        { name: 'Laravel', level: 'Advanced' },
        { name: 'Express.js', level: 'Beginner' },
        { name: 'REST APIs', level: 'Expert' },
        { name: 'Gin', level: 'Beginner' },
        { name: 'FastAPI', level: 'Beginner' },
      ],
    },
    {
      title: 'DATABASES & CACHE',
      skills: [
        { name: 'PostgreSQL', level: 'Beginner' },
        { name: 'MySQL', level: 'Advanced' },
        { name: 'MongoDB', level: 'Beginner' },
      ],
    },
    {
      title: 'DEVOP & CLOUD',
      skills: [
        { name: 'Docker', level: 'Beginner' },
        { name: 'GitHub Actions', level: 'Advanced' },
      ],
    },
    {
      title: 'Frameworks & LIBRARIES',
      skills: [
        { name: 'React', level: 'Expert' },
        { name: 'Next.js', level: 'Intermediate' },
        { name: 'Laravel', level: 'Intermediate' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Bootstrap', level: 'Intermediate' },
        { name: 'jQuery', level: 'Intermediate' },
        { name: 'AJAX', level: 'Advanced' },
        { name: 'Material UI', level: 'Beginner' },
      ],
    },
    {
      title: 'TOOLS & PLATFORMS',
      skills: [
        { name: 'VS Code', level: 'Expert' },
        { name: 'Git', level: 'Advanced' },
        { name: 'GitHub', level: 'Advanced' },
        { name: 'Lark', level: 'Intermediate' },
        { name: 'Postman', level: 'Beginner' },
        { name: 'Bruno', level: 'Beginner' },
        { name: 'Fork', level: 'Beginner' },
        { name: 'Figma', level: 'Beginner' },
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

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          {skillCategories.map((category, idx) => (
            <div key={idx}>
              <h3
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  color: 'var(--text-tertiary)',
                  marginBottom: '1rem',
                }}
              >
                {category.title}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {category.skills.map((skill, sIdx) => {
                  const isHovered = hoveredSkill === skill.name;
                  const hasActiveSelection = hoveredSkill !== null;
                  const isDimmed = hasActiveSelection && !isHovered;
                  const Icon = iconMap[skill.name];

                  return (
                    <div
                      key={sIdx}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        border: '1px solid',
                        borderColor: isHovered ? 'var(--text-primary)' : 'var(--border)',
                        backgroundColor: isHovered ? 'var(--accent)' : 'transparent',
                        color: isHovered ? 'var(--bg)' : 'var(--text-primary)',
                        opacity: isDimmed ? 0.3 : 1,
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer',
                      }}
                    >
                      {Icon && <Icon size={14} />}
                      <span>{skill.name}</span>
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.1em',
                          color: isHovered ? 'var(--bg)' : 'var(--text-tertiary)',
                          lineHeight: 1,
                        }}
                      >
                        {levelDots[skill.level] || '·'}
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
