import type { ContentFrame, QuestionFrame } from '../types'

export type Opt = [title: string, correct: boolean, description?: string]

export const c = (
  id: string,
  eyebrow: string,
  title: string,
  body: string[],
  note?: string,
  aiNote?: string,
): ContentFrame => ({
  id,
  type: 'content',
  eyebrow,
  title,
  body,
  note,
  aiNote: aiNote ?? 'This screen introduces the concepts tested in the next questions.',
})

export const q = (
  id: string,
  eyebrow: string,
  question: string,
  options: Opt[],
  explanation: string,
  multi = false,
  aiNote?: string,
): QuestionFrame => ({
  id,
  type: 'question',
  eyebrow,
  question,
  helper: multi ? 'Select all answers that apply.' : 'Select one answer.',
  multi,
  options: options.map(([title, correct, description], index) => ({
    id: `${id}-${String.fromCharCode(97 + index)}`,
    title,
    correct,
    ...(description ? { description } : {}),
  })),
  explanation,
  aiNote: aiNote ?? 'Connect this answer to the concept explained on this screen.',
})
