import { Container } from '../components/Container'

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
 <div className="pt-24 pb-16 animate-[fadeIn_0.8s_ease-out]">
 <Container>
 <div className="md:w-2/3 lg:w-1/2 mb-16">
 <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ">
 About Me
 </h1>
 </div>

 <div className="max-w-3xl space-y-4 mb-16">
 <p className="text-lg leading-relaxed text-gray-700 ">
 I am a Full-Stack Software Engineer specializing in backend
 architecture, distributed systems, and high-performance web
 applications. My work spans from designing database schemas for
 high-density academic platforms to building real-time queue
 management systems with sub-15ms dispatch times.
 </p>
 <p className="text-lg leading-relaxed text-gray-500 ">
 I focus on writing systems that are reliable, observable, and
 maintainable — bridging the gap between operational strength and
 clean product aesthetics.
 </p>
 </div>

 <section className="mb-16">
 <h2 className="text-2xl font-bold text-gray-800 mb-8">
 Experience
 </h2>
 <div className="space-y-8">
 {experience.map((exp) => (
 <div
 key={exp.title}
 className="relative pl-6 border-l border-gray-200 "
 >
 <span className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-primary" />
 <span className="font-mono text-sm text-gray-400">
 {exp.period}
 </span>
 <h3 className="text-lg font-semibold text-gray-800 mt-1">
 {exp.title}
 </h3>
 <span className="text-base text-gray-500 block">
 {exp.company}
 </span>
 <p className="text-base text-gray-500 mt-2 leading-relaxed">
 {exp.description}
 </p>
 </div>
 ))}
 </div>
 </section>

 <section className="mb-16">
 <h2 className="text-2xl font-bold text-gray-800 mb-8">
 Skills & Technologies
 </h2>
 <div className="space-y-6">
 {Object.entries(skills).map(([category, skillList]) => (
 <div key={category}>
 <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 ">
 {category}
 </h3>
 <div className="flex flex-wrap gap-2">
 {skillList.map((skill) => (
 <span
 key={skill}
 className="font-mono text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-primary :border-primary transition-colors"
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
 <h2 className="text-2xl font-bold text-gray-800 mb-8">
 Education
 </h2>
 <div className="space-y-8">
 {education.map((edu) => (
 <div
 key={edu.title}
 className="relative pl-6 border-l border-gray-200 "
 >
 <span className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-primary" />
 <span className="font-mono text-sm text-gray-400">
 {edu.period}
 </span>
 <h3 className="text-lg font-semibold text-gray-800 mt-1">
 {edu.title}
 </h3>
 <span className="text-base text-gray-500 block">
 {edu.institution}
 </span>
 <p className="text-base text-gray-500 mt-2 leading-relaxed">
 {edu.description}
 </p>
 </div>
 ))}
 </div>
 </section>
 </Container>
 </div>
 );
};
