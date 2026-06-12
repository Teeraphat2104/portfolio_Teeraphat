import { BiChip, BiServer, BiData, BiBot } from 'react-icons/bi'
import { Container } from './Container'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    icon: <BiChip className="w-8 h-8 text-gray-700" />,
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Go', 'Laravel'],
    icon: <BiServer className="w-8 h-8 text-gray-700" />,
  },
  {
    title: 'Databases & DevOps',
    skills: ['PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    icon: <BiData className="w-8 h-8 text-gray-700" />,
  },
  {
    title: 'Tools & AI',
    skills: ['Git', 'CI/CD', 'ChatGPT', 'Claude'],
    icon: <BiBot className="w-8 h-8 text-gray-700" />,
  },
]

export const FeaturesSection: React.FC = () => {
  return (
    <div id="features">
      <Container>
        <div className="md:w-2/3 lg:w-1/2">
          <div className="text-xs text-gray-400 tracking-[0.2em] mb-2">01.</div>
          <h2 className="my-4 text-2xl font-medium text-gray-900 md:text-4xl">
            Skills & Technologies
          </h2>
          <p className="text-gray-600">
            A full-stack engineering toolkit spanning frontend, backend, infrastructure, and AI-assisted development.
          </p>
        </div>
         <div className="mt-8 grid divide-x divide-y divide-gray-200 border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`group relative bg-white transition hover:z-[1] ${
                i === skillCategories.length - 1 ? 'bg-gray-50 group-hover:bg-white' : ''
              }`}
            >
              <div className="relative space-y-6 py-8 p-6">
                {cat.icon}
                <div className="space-y-2">
                  <h5 className="text-lg font-medium text-gray-900 transition group-hover:text-black">
                    {cat.title}
                  </h5>
                  <p className="text-gray-500">
                    {cat.skills.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}