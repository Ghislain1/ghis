import type { LessonMeta } from '../types'
import type { TranslationLanguage } from './language'

export type ContentFrameTranslation = {
  type: 'content'
  eyebrow: string
  title: string
  body: string[]
  note?: string
  aiNote: string
}

export type QuestionFrameTranslation = {
  type: 'question'
  eyebrow: string
  question: string
  helper?: string
  options: Record<string, { title: string; description?: string }>
  explanation: string
  aiNote: string
}

export type FrameTranslation = ContentFrameTranslation | QuestionFrameTranslation

export type CourseTranslation = {
  meta: LessonMeta
  frames: Record<string, FrameTranslation>
}

export type CourseTranslations = Record<TranslationLanguage, CourseTranslation>
