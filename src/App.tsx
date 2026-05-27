import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import type { Project } from './components/Projects';
import { ProjectDrawer } from './components/ProjectDrawer';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

function App() {
  // Read initial theme preference from localStorage or user device settings
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync theme with DOM element and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Set matching theme colors for background blurring in header
    if (theme === 'dark') {
      root.style.setProperty('--bg-rgb', '10, 10, 10');
    } else {
      root.style.setProperty('--bg-rgb', '250, 250, 250');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      {/* Navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Main Single Page Scroller Sections */}
      <main style={{ marginTop: '64px' }}>
        <Hero />
        <Skills hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
        <Projects hoveredSkill={hoveredSkill} onSelectProject={setSelectedProject} />
        <Experience />
        <Contact />
      </main>

      {/* Slide-out Technical Project Drawer */}
      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default App;
