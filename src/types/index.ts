export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectChallenge {
  problem: string
  solution: string
}

export interface ProjectMeta {
  id: string
  title: string
  role: string
  description: string
  technologies: string[]
  metrics: ProjectMetric[]
  challenges: ProjectChallenge[]
  github: string
  demo?: string
}

export interface Project extends ProjectMeta {
  content: string
}
