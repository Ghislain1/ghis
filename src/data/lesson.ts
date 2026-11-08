import type { LessonFrame, LessonMeta } from '../types'
import { frames as dotnetFrames, meta as dotnetMeta } from './courses/dotnet'
import { frames as commandFrames, meta as commandMeta } from './courses/dotnetCommand'
import { frames as dockerFrames, meta as dockerMeta } from './courses/docker'
import { frames as fastapiFrames, meta as fastapiMeta } from './courses/fastapi'
import { frames as flauiFrames, meta as flauiMeta } from './courses/flaui'

export type CourseId = 'dotnet' | 'dotnet-command' | 'docker' | 'fastapi' | 'flaui'

export type Course = {
  id: CourseId
  meta: LessonMeta
  frames: LessonFrame[]
}

export const defaultCourseId: CourseId = 'dotnet'

export const courses: Course[] = [
  { id: 'dotnet', meta: dotnetMeta, frames: dotnetFrames },
  { id: 'dotnet-command', meta: commandMeta, frames: commandFrames },
  { id: 'docker', meta: dockerMeta, frames: dockerFrames },
  { id: 'fastapi', meta: fastapiMeta, frames: fastapiFrames },
  { id: 'flaui', meta: flauiMeta, frames: flauiFrames },
]

export function getCourse(id: string): Course {
  return (
    courses.find((course) => course.id === id) ??
    courses.find((course) => course.id === defaultCourseId) ??
    courses[0]
  )
}

function resolveCourseId(): CourseId {
  if (typeof window === 'undefined') return defaultCourseId

  const requested =
    new URLSearchParams(window.location.search).get('course') ?? window.location.hash.slice(1)

  return courses.some((course) => course.id === requested) ? (requested as CourseId) : defaultCourseId
}

const activeCourse = getCourse(resolveCourseId())

export const activeCourseId = activeCourse.id
export const lessonMeta = activeCourse.meta
export const lessonFrames = activeCourse.frames
