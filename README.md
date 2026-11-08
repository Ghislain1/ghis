# GHIS — Interactive Developer Courses

A static single-page learning app built with React, TypeScript and Material UI. It turns technical courses into guided lessons: concept screens, instant-feedback quizzes (single and multiple answers), progress navigation and a completion summary.

**Live site:** https://ghislain1.github.io/ghis/

## Courses

All content lives in `src/data/lesson.ts`. The app opens on the .NET course by default.

| Course | ID | Screens | Questions | Est. time |
| --- | --- | ---: | ---: | ---: |
| .NET Framework — C# & Modern .NET | `dotnet` | 151 | 135 (83 single, 52 multi) | 360 min |
| dotnet CLI — Command Line Essentials | `dotnet-command` | 24 | 20 (15 single, 5 multi) | 60 min |
| Docker — Containers from Zero to Compose | `docker` | 24 | 20 (16 single, 4 multi) | 75 min |
| FastAPI — Modern Python APIs | `fastapi` | 24 | 20 (15 single, 5 multi) | 75 min |

Total: **223 screens** and **195 questions**.

## Features

- Course picker in the header; switching courses resets progress for the new course.
- Deep links per course: `?course=docker`, `?course=fastapi`, `?course=dotnet-command` or `#docker`.
- Sticky progress hexagons to jump to any screen.
- Single-answer and multi-answer questions with per-question feedback and explanations.
- "Explain this screen" study notes authored with the lesson content (no external AI call).
- Completion summary with screens, score and estimated time, plus restart and review actions.
- Responsive Material UI layout with a light custom theme.

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vite.dev/)
- [Material UI 6](https://mui.com/) and `@mui/icons-material`

No backend, database or API is required: the app is fully static and all lesson data is bundled TypeScript.

## Getting started

Requires Node.js 20 or newer (CI uses Node 20 and 22).

```bash
npm install
npm run dev
```

With `base: '/ghis/'`, the development server serves the app at:

```text
http://localhost:5173/ghis/
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Type-check with `tsc --noEmit` and build to `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm test` | Run the Node test suite for lesson data and the course registry. |

## Selecting a course

Use the **Course** dropdown in the sticky header. The selection is written to the URL, so refreshes and shared links keep the same course:

```text
/ghis/?course=docker
/ghis/?course=fastapi
/ghis/#dotnet-command
```

Filtering rules:

- `?course=` takes precedence over the hash.
- The default course is `dotnet`.
- An unknown or missing course ID falls back to `dotnet`.
- Choosing the default course removes the `course` parameter and clears the hash.

## Project structure

```text
.
├── src/
│   ├── components/        # Lesson shell, question/answer cards, progress, completion
│   │   ├── LessonPage.tsx # Course state, navigation, course picker, dialogs
│   │   ├── TopBar.tsx
│   │   ├── ProgressHexagons.tsx
│   │   ├── ContentFrame.tsx
│   │   ├── QuestionFrame.tsx
│   │   ├── AnswerCard.tsx
│   │   ├── FeedbackPanel.tsx
│   │   ├── CompletionFrame.tsx
│   │   └── Eyebrow.tsx
│   ├── data/
│   │   └── lesson.ts      # All courses, frames and the course registry
│   ├── types.ts           # Frame, question and metadata types
│   ├── theme.ts           # Material UI theme
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   └── lesson.test.cjs    # Node tests for content and registry validity
├── .github/workflows/
│   ├── main.yml           # Build + test on pushes and pull requests
│   └── deploy.yml         # Build and deploy to GitHub Pages
├── index.html
├── vite.config.ts
└── package.json
```

## Adding a course

1. Define a `LessonMeta` and a `LessonFrame[]` in `src/data/lesson.ts` using the `c(...)` and `q(...)` helpers.
2. Add the new ID to the `CourseId` union.
3. Register the course in the `courses` array.
4. Run `npm test` and `npm run build`.

```ts
const myMeta: LessonMeta = {
  course: 'My Course',
  chapter: '4 chapters · 20 questions',
  lesson: 'What the course is about',
  estimatedMinutes: 60,
}

const myFrames: LessonFrame[] = [c(/* ... */), q(/* ... */)]

export const courses: Course[] = [
  // existing courses...
  { id: 'my-course', meta: myMeta, frames: myFrames },
]
```

Course IDs must be unique. Every question needs at least one correct option; multi-answer questions need at least two.

## Tests

```bash
npm test
```

The suite transpiles `src/data/lesson.ts` in memory and checks that:

- every declared course exists and has a title, frames and questions;
- each course mixes single-answer and multi-answer questions;
- frame IDs and option IDs are unique within a course;
- answer keys match the `multi` flag;
- the default exports still point at `dotnet`.

Run both checks before committing:

```bash
npm test
npm run build
```

## Deployment

The site is published to GitHub Pages from the `main` branch:

- `deploy.yml` runs `npm ci`, `npm run build`, uploads `dist/` and deploys it.
- `vite.config.ts` sets `base: '/ghis/'` because the site is served from `https://ghislain1.github.io/ghis/`.
- `dist/` is generated by the build and is not committed.

## Notes

- Course progress (answers, score, current screen) is kept in memory and resets on page reload or when switching courses. The selected course is preserved in the URL.
- The app is English-only.
- There is no live AI integration; "Explain this screen" displays the study note stored with each frame.
