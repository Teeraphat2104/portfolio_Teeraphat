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

export type Section =
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'mermaid'; code: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'fieldGrid'; fields: FieldDef[] }
  | { type: 'tableGroup'; tables: TableSchema[] }
  | { type: 'blockquote'; text: string }
  | { type: 'hr' }

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
  sections: Section[]
}
