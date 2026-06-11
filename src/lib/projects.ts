import type { ProjectMeta, Project } from '../types'
import data from '../data/projects.json'

const bodyModules = import.meta.glob<string>(
  '/src/content/*.md',
  { eager: true, query: '?raw', import: 'default' }
)

export function getAllProjectMetas(): ProjectMeta[] {
  return data as ProjectMeta[]
}

export function getProjectById(id: string): Project | undefined {
  const meta = (data as ProjectMeta[]).find((p) => p.id === id)
  if (!meta) return undefined

  const bodyPath = Object.keys(bodyModules).find((path) =>
    path.includes(`/${id}.md`)
  )
  const content = bodyPath ? bodyModules[bodyPath] : ''

  return { ...meta, content }
}
