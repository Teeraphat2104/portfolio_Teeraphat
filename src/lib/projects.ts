import { parse as parseYaml } from 'yaml'
import type { ProjectMeta } from '../types'

const projectFiles = import.meta.glob<{ default: string }>('../data/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const yaml = match[1]
  const content = match[2]
  const data = parseYaml(yaml) as Record<string, unknown>
  return { data, content }
}

const projects: ProjectMeta[] = Object.values(projectFiles).map((mod) => {
  const raw = String(mod)
  const { data, content } = parseFrontmatter(raw)

  const toStr = (v: unknown): string => String(v ?? '')
  const toStrArr = (v: unknown): string[] => {
    if (Array.isArray(v)) return v.map(String)
    return []
  }

  const metrics = Array.isArray(data.metrics)
    ? data.metrics.map((m: Record<string, unknown>) => ({
        label: toStr(m.label),
        value: toStr(m.value),
      }))
    : []

  const challenges = Array.isArray(data.challenges)
    ? data.challenges.map((c: Record<string, unknown>) => ({
        problem: toStr(c.problem),
        solution: toStr(c.solution),
      }))
    : []

  return {
    id: toStr(data.id),
    title: toStr(data.title),
    role: toStr(data.role),
    description: toStr(data.description),
    technologies: toStrArr(data.technologies),
    metrics,
    challenges,
    github: toStr(data.github),
    demo: data.demo ? toStr(data.demo) : undefined,
    body: content.trim(),
  }
})

export function getAllProjectMetas(): ProjectMeta[] {
  return projects
}

export function getProjectById(id: string): ProjectMeta | undefined {
  return projects.find((p) => p.id === id)
}
