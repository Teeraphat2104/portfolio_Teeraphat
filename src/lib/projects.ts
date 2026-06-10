import { parse } from 'yaml'
import type { ProjectMeta, Project } from '../types'

const rawModules = import.meta.glob<string>(
  '/src/content/*.md',
  { eager: true, query: '?raw', import: 'default' }
)

function extractFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  return parse(match[1]) as Record<string, unknown>
}

function removeFrontmatter(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n*/, '')
}

function parseProjectMeta(path: string, raw: string): ProjectMeta {
  const data = extractFrontmatter(raw)
  const id = path.split('/').pop()?.replace('.md', '') ?? 'unknown'
  return {
    id,
    title: (data.title as string) ?? id,
    role: (data.role as string) ?? '',
    description: (data.description as string) ?? '',
    technologies: (data.technologies as string[]) ?? [],
    metrics: (data.metrics as { label: string; value: string }[]) ?? [],
    challenges: (data.challenges as { problem: string; solution: string }[]) ?? [],
    github: (data.github as string) ?? '',
    demo: (data.demo as string) ?? undefined,
  }
}

export function getAllProjectMetas(): ProjectMeta[] {
  return Object.entries(rawModules)
    .map(([path, raw]) => parseProjectMeta(path, raw))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getProjectById(id: string): Project | undefined {
  const entry = Object.entries(rawModules).find(([path]) =>
    path.includes(`/${id}.md`)
  )
  if (!entry) return undefined
  const [path, raw] = entry
  const meta = parseProjectMeta(path, raw)
  return { ...meta, content: removeFrontmatter(raw) }
}
