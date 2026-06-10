import matter from 'gray-matter'
import type { ProjectMeta, Project } from '../types'

const rawModules = import.meta.glob<string>(
  '/src/content/*.mdx',
  { eager: true, query: '?raw' }
)

function parseProjectMeta(path: string, raw: string): ProjectMeta {
  const { data } = matter(raw)
  const id = path.split('/').pop()?.replace('.mdx', '') ?? 'unknown'
  return {
    id,
    title: data.title ?? id,
    role: data.role ?? '',
    description: data.description ?? '',
    technologies: data.technologies ?? [],
    metrics: data.metrics ?? [],
    challenges: data.challenges ?? [],
    github: data.github ?? '',
    demo: data.demo ?? undefined,
  }
}

export function getAllProjectMetas(): ProjectMeta[] {
  return Object.entries(rawModules)
    .map(([path, raw]) => parseProjectMeta(path, raw))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getProjectById(id: string): Project | undefined {
  const entry = Object.entries(rawModules).find(([path]) =>
    path.includes(`/${id}.mdx`)
  )
  if (!entry) return undefined
  const [path, raw] = entry
  const meta = parseProjectMeta(path, raw)
  return { ...meta, content: raw }
}
