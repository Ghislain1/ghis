import type { LessonFrame, LessonMeta } from '../types'

export const lessonMeta: LessonMeta = {
  course: 'Adopting AI in Your Organization',
  chapter: 'Chapter 1 · AI Foundations',
  lesson: 'Framing a useful AI pilot',
  estimatedMinutes: 5,
}

export const lessonFrames: LessonFrame[] = [
  {
    id: 'frame-1',
    type: 'content',
    eyebrow: 'ADOPTING AI IN YOUR ORGANIZATION',
    title: 'Start with the problem, not the tool.',
    body: [
      'AI adoption works best when it begins with a clear business problem. Before you compare platforms or vendors, describe the workflow you want to improve, the metric that should move, and the person who will own the outcome.',
      'Teams that start with a tool often collect impressive demos that never reach production. Teams that start with a problem build a short list of measurable use cases — and know exactly how to judge whether the AI is helping.',
    ],
    note: 'If you cannot describe the current process in one paragraph, it probably is not ready to automate.',
    aiNote:
      'This screen sets up a problem-first approach to AI adoption. The key takeaway: define the workflow, metric, and owner before evaluating any technology. Use the progress hexagons above to revisit any screen.',
  },
  {
    id: 'frame-2',
    type: 'question',
    eyebrow: 'CONCEPT CHECK',
    question: 'Leadership wants to “use AI” but has not picked a focus area. What is the strongest first move?',
    helper: 'Select one answer.',
    options: [
      {
        id: 'frame-2-a',
        title: 'Launch a company-wide AI awareness campaign',
        description: 'Build excitement now and let teams propose use cases later.',
        correct: false,
      },
      {
        id: 'frame-2-b',
        title: 'Audit workflows for high-volume, repetitive tasks',
        description: 'Find where AI can remove real friction — and establish a baseline for measuring impact.',
        correct: true,
      },
      {
        id: 'frame-2-c',
        title: 'Buy licenses for a leading AI platform',
        description: 'Give everyone access and discover use cases along the way.',
        correct: false,
      },
      {
        id: 'frame-2-d',
        title: 'Hire an AI team with an open-ended mandate',
        description: 'Build internal capability first, then decide what the team should work on.',
        correct: false,
      },
    ],
    explanation:
      'A workflow audit connects AI to a measurable business problem. It reveals where volume, repetition, and clear feedback make an early pilot likely to succeed — and gives you a baseline to prove impact.',
    aiNote:
      'This question tests whether you can separate technology-first adoption from problem-first adoption. The best answer anchors the effort in a measurable workflow rather than a tool or a broad campaign.',
  },
  {
    id: 'frame-3',
    type: 'content',
    eyebrow: 'DESIGNING THE PILOT',
    title: 'Make the first pilot small and measurable.',
    body: [
      'A good pilot has a narrow scope, a clear owner, and a baseline. Choose one workflow, define what success looks like in numbers, and agree on how long the test will run before you start.',
      'Keep a human in the loop. Early AI systems are strongest when they draft, sort, or summarize — and a person reviews the output before it reaches a customer or a critical decision.',
    ],
    note: 'Pilot metric first: decide what “better” means before you turn the tool on.',
    aiNote:
      'This screen covers the anatomy of a credible pilot: narrow scope, accountable owner, baseline measurement, and human review. These are the ingredients that make an AI test defensible to leadership.',
  },
  {
    id: 'frame-4',
    type: 'question',
    eyebrow: 'CONCEPT CHECK',
    question: 'Which workflows are strong candidates for a first AI pilot?',
    helper: 'Select all answers that apply.',
    multi: true,
    options: [
      {
        id: 'frame-4-a',
        title: 'Support tickets sorted into a handful of repeating categories',
        description: 'High volume, consistent patterns, and an easy way to check accuracy.',
        correct: true,
      },
      {
        id: 'frame-4-b',
        title: 'A quarterly strategy offsite with twelve senior leaders',
        description: 'Low volume, high stakes, and very little repetition.',
        correct: false,
      },
      {
        id: 'frame-4-c',
        title: 'Invoice data entry from thousands of similar PDFs',
        description: 'Repetitive, text-heavy work with a measurable error rate.',
        correct: true,
      },
      {
        id: 'frame-4-d',
        title: 'Creating a new brand identity from a blank page',
        description: 'Open-ended creative work with subjective success criteria.',
        correct: false,
      },
      {
        id: 'frame-4-e',
        title: 'First-draft replies to common customer emails',
        description: 'Recurring language patterns with a human review step.',
        correct: true,
      },
    ],
    explanation:
      'Look for high-volume, repetitive, text-heavy work with a clear feedback loop. Low-volume creative work and high-stakes strategy are harder to evaluate and usually make weaker first pilots.',
    aiNote:
      'This is a multi-select question. The correct options share three traits: volume, repetition, and an objective way to measure quality. The two distractors are low-volume or subjective, which makes them poor first pilots.',
  },
]
