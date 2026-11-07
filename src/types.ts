export type AnswerOption = {
  id: string
  title: string
  description?: string
  correct: boolean
}

export type ContentFrame = {
  id: string
  type: 'content'
  eyebrow?: string
  title: string
  body: string[]
  note?: string
  aiNote: string
}

export type QuestionFrame = {
  id: string
  type: 'question'
  eyebrow?: string
  question: string
  helper?: string
  multi?: boolean
  options: AnswerOption[]
  explanation: string
  aiNote: string
}

export type LessonFrame = ContentFrame | QuestionFrame

export type LessonMeta = {
  course: string
  chapter: string
  lesson: string
  estimatedMinutes: number
}

export type FrameResult = 'correct' | 'incorrect'
