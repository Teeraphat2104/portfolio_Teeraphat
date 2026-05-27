import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { BarbershopDemoPage } from "./pages/BarbershopDemoPage";
import { UniversityDemoPage } from "./pages/UniversityDemoPage";
import { AlumniDemoPage } from "./pages/AlumniDemoPage";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";

function App() {
  const location = useLocation();
  const isDemoPage = location.pathname === "/barbershop-demo" || location.pathname === "/university-demo" || location.pathname === "/alumni-demo";

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      root.style.setProperty("--bg-rgb", "10, 10, 10");
    } else {
      root.style.setProperty("--bg-rgb", "250, 250, 250");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} simple={isDemoPage} />

      <Routes>
        <Route
          path="/"
          element={
            <main style={{ marginTop: "64px" }}>
              <Hero />
              <Skills hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
              <Projects hoveredSkill={hoveredSkill} />
              <Experience />
              <Contact />
            </main>
          }
        />
        <Route path="/barbershop-demo" element={<BarbershopDemoPage />} />
        <Route path="/university-demo" element={<UniversityDemoPage />} />
        <Route path="/alumni-demo" element={<AlumniDemoPage />} />
      </Routes>
    </>
  );
}

export default App;
