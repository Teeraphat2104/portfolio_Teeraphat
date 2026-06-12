import { BiData, BiLogoGithub } from 'react-icons/bi'
import type { IconType } from 'react-icons'
import {
  SiBootstrap, SiDocker, SiExpress, SiFigma, SiGit, SiGithubcopilot,
  SiGo, SiKubernetes, SiLaravel, SiMongodb, SiMysql, SiNextdotjs,
  SiNgrok, SiNodedotjs, SiNotion, SiOpenai, SiPhp, SiPostgresql,
  SiPostman, SiPrisma, SiReact, SiTailwindcss, SiTypescript, SiVite,
} from 'react-icons/si'

const techIconMap: Record<string, IconType | undefined> = {
  blade: SiLaravel,
  bootstrap: SiBootstrap,
  sql: BiData,
  github: BiLogoGithub,
  php: SiPhp,
  laravel: SiLaravel,
  mysql: SiMysql,
  vite: SiVite,
  docker: SiDocker,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  tailwindcss: SiTailwindcss,
  react: SiReact,
  nodejs: SiNodedotjs,
  express: SiExpress,
  go: SiGo,
  postgresql: SiPostgresql,
  kubernetes: SiKubernetes,
  git: SiGit,
  postman: SiPostman,
  ngrok: SiNgrok,
  notion: SiNotion,
  figma: SiFigma,
  chatgpt: SiOpenai,
  githubcopilot: SiGithubcopilot,
}

export function getTechIcon(tech: string): IconType | undefined {
  const key = tech.toLowerCase().replace(/[\s\d]+/g, '')
  return techIconMap[key] ?? techIconMap[tech.toLowerCase()]
}
