export interface ProjectMetric {
  label: string
  value: string
}

export interface ProjectChallenge {
  problem: string
  solution: string
}

export interface FieldDef {
  field: string
  type: string
  nullable: string
  default: string
}

export interface TableSchema {
  name: string
  cols: number
  description: string
  fields: FieldDef[]
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
  body: string
}
