import type { LessonFrame, LessonMeta } from '../types'

export type CourseId = 'dotnet' | 'dotnet-command' | 'docker' | 'fastapi' | 'flaui'

export type CourseMeta = {
  id: CourseId
  meta: LessonMeta
}

export type Course = {
  id: CourseId
  meta: LessonMeta
  frames: LessonFrame[]
}

export const defaultCourseId: CourseId = 'dotnet'

export const courseMetas: CourseMeta[] = [
  { id: 'dotnet', meta: { course: '.NET Framework — C# & Modern .NET', chapter: 'Complete course • 16 chapters', lesson: 'C# .NET: CLI, language, ASP.NET Core, EF Core and WPF', estimatedMinutes: 360 } },
  { id: 'dotnet-command', meta: { course: 'dotnet CLI — Command Line Essentials', chapter: '4 chapters • 20 questions', lesson: 'Master the dotnet command line', estimatedMinutes: 60 } },
  { id: 'docker', meta: { course: 'Docker — Containers from Zero to Compose', chapter: '4 chapters • 20 questions', lesson: 'Build, run and ship containers', estimatedMinutes: 75 } },
  { id: 'fastapi', meta: { course: 'FastAPI — Modern Python APIs', chapter: '4 chapters • 20 questions', lesson: 'Build typed, async APIs with FastAPI', estimatedMinutes: 75 } },
  { id: 'flaui', meta: { course: 'FlaUI — UI Automation for .NET', chapter: '10 chapters • 100 questions', lesson: 'Automate WPF applications end to end with FlaUI', estimatedMinutes: 180 } },
]

const loaders: Record<CourseId, () => Promise<Course>> = {
  dotnet: async () => {
    const mod = await import('./courses/dotnet')
    return { id: 'dotnet', meta: mod.meta, frames: mod.frames }
  },
  'dotnet-command': async () => {
    const mod = await import('./courses/dotnetCommand')
    return { id: 'dotnet-command', meta: mod.meta, frames: mod.frames }
  },
  docker: async () => {
    const mod = await import('./courses/docker')
    return { id: 'docker', meta: mod.meta, frames: mod.frames }
  },
  fastapi: async () => {
    const mod = await import('./courses/fastapi')
    return { id: 'fastapi', meta: mod.meta, frames: mod.frames }
  },
  flaui: async () => {
    const mod = await import('./courses/flaui')
    return { id: 'flaui', meta: mod.meta, frames: mod.frames }
  },
}

export function isCourseId(value: string): value is CourseId {
  return courseMetas.some((course) => course.id === value)
}

export function resolveCourseId(
  search = typeof window === 'undefined' ? '' : window.location.search,
  hash = typeof window === 'undefined' ? '' : window.location.hash,
): CourseId {
  const requested = new URLSearchParams(search).get('course') ?? hash.replace(/^#/, '')
  return isCourseId(requested) ? requested : defaultCourseId
}

export function courseMetaFor(id: CourseId): LessonMeta {
  return (courseMetas.find((course) => course.id === id) ?? courseMetas[0]).meta
}

export async function loadCourse(id: string): Promise<Course> {
  const courseId = isCourseId(id) ? id : defaultCourseId
  return loaders[courseId]()
}
