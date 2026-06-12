import type { ProjectMeta } from '../types'
import data from '../data/projects.json'

export function getAllProjectMetas(): ProjectMeta[] {
  return data as ProjectMeta[]
}

export function getProjectById(id: string): ProjectMeta | undefined {
  return (data as ProjectMeta[]).find((p) => p.id === id)
}
