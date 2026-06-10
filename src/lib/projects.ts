import type { ProjectMeta, Project } from '../types'

const mdxModules = import.meta.glob<{ frontmatter: ProjectMeta; default: string }>(
  '/src/content/*.mdx',
  { eager: true, query: { frontmatter: 'js' } }
)

const rawModules = import.meta.glob<string>(
  '/src/content/*.mdx',
  { eager: true, query: '?raw' }
)

export function getAllProjectMetas(): ProjectMeta[] {
  return Object.entries(mdxModules)
    .map(([path, mod]) => ({
      ...mod.frontmatter,
      id: path.split('/').pop()?.replace('.mdx', '') ?? 'unknown',
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getProjectById(id: string): Project | undefined {
  const mdxPath = Object.keys(mdxModules).find((p) => p.includes(`/${id}.mdx`))
  const rawPath = Object.keys(rawModules).find((p) => p.includes(`/${id}.mdx`))

  if (!mdxPath || !rawPath) return undefined

  const mod = mdxModules[mdxPath]
  return {
    ...mod.frontmatter,
    id,
    content: rawModules[rawPath],
  }
}
