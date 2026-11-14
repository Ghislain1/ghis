const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const Module = require('module')

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filename,
  }).outputText
  module._compile(compiled, filename)
}

const originalResolveFilename = Module._resolveFilename
Module._resolveFilename = function (request, parent, isMain, options) {
  if (
    (request.startsWith('.') || request.startsWith('..')) &&
    !path.extname(request)
  ) {
    for (const ext of ['.ts', '.tsx', '.js', '.cjs']) {
      try {
        return originalResolveFilename.call(this, request + ext, parent, isMain, options)
      } catch {
        // try next extension
      }
    }
  }
  return originalResolveFilename.call(this, request, parent, isMain, options)
}

const lessonPath = path.join(__dirname, '..', 'src', 'data', 'lesson.ts')
const {
  courseMetas,
  defaultCourseId,
  isCourseId,
  resolveCourseId,
  courseMetaFor,
} = require(lessonPath)

const coursesDir = path.join(__dirname, '..', 'src', 'data', 'courses')
const courseModuleById = {
  dotnet: 'dotnet.ts',
  'dotnet-command': 'dotnetCommand.ts',
  docker: 'docker.ts',
  fastapi: 'fastapi.ts',
  flaui: 'flaui.ts',
}

async function loadCourseForTest(id) {
  const file = courseModuleById[id]
  if (!file) throw new Error(`Unknown course ${id}`)
  const mod = require(path.join(coursesDir, file))
  return { id, meta: mod.meta, frames: mod.frames }
}

test('course registry exposes dotnet, dotnet-command, docker, fastapi and flaui', () => {
  const ids = courseMetas.map((course) => course.id)
  assert.equal(new Set(ids).size, ids.length, 'course ids must be unique')
  for (const id of ['dotnet', 'dotnet-command', 'docker', 'fastapi', 'flaui']) {
    assert.ok(ids.includes(id), `missing course ${id}`)
    assert.ok(isCourseId(id), `${id} should be a course id`)
  }
  assert.ok(ids.includes(defaultCourseId))
})

test('resolveCourseId resolves query/hash and falls back to default', () => {
  assert.equal(resolveCourseId('?course=docker', ''), 'docker')
  assert.equal(resolveCourseId('', '#fastapi'), 'fastapi')
  assert.equal(resolveCourseId('?course=flaui', '#docker'), 'flaui')
  assert.equal(resolveCourseId('?course=unknown', ''), defaultCourseId)
  assert.equal(resolveCourseId('', ''), defaultCourseId)
})

test('every course has metadata and valid questions', async () => {
  for (const { id } of courseMetas) {
    const course = await loadCourseForTest(id)
    assert.ok(course.meta.course, `${course.id} has no course title`)
    assert.ok(course.meta.lesson, `${course.id} has no lesson title`)
    assert.ok(course.frames.length > 0, `${course.id} has no frames`)

    const courseQuestions = course.frames.filter((frame) => frame.type === 'question')
    assert.ok(courseQuestions.length >= 10, `${course.id} has only ${courseQuestions.length} questions`)
    assert.ok(courseQuestions.some((question) => !question.multi), `${course.id} has no single-answer question`)
    assert.ok(courseQuestions.some((question) => question.multi), `${course.id} has no multi-answer question`)

    const frameIds = new Set()
    for (const frame of course.frames) {
      assert.ok(!frameIds.has(frame.id), `duplicate frame id in ${course.id}: ${frame.id}`)
      frameIds.add(frame.id)

      if (frame.type === 'question') {
        const correct = frame.options.filter((option) => option.correct).length
        assert.ok(correct > 0, `${frame.id} has no correct answer`)
        if (frame.multi) {
          assert.ok(correct >= 2, `${frame.id} is multi-answer but has ${correct} correct option(s)`)
        } else {
          assert.equal(correct, 1, `${frame.id} is single-answer but has ${correct} correct options`)
        }
      }
    }
  }
})

test('courseMetaFor returns metadata for known and fallback courses', () => {
  assert.equal(courseMetaFor('docker').course.includes('Docker'), true)
  assert.equal(courseMetaFor('fastapi').course.includes('FastAPI'), true)
})

test('default course metadata and content describe the .NET course', async () => {
  assert.equal(defaultCourseId, 'dotnet')
  const defaultCourse = await loadCourseForTest(defaultCourseId)
  assert.ok(defaultCourse.meta.course.includes('.NET'))
  assert.ok(defaultCourse.meta.lesson.length > 0)
  assert.ok(defaultCourse.meta.chapter.length > 0)
  assert.ok(defaultCourse.meta.estimatedMinutes > 0)

  const questions = defaultCourse.frames.filter((frame) => frame.type === 'question')
  const contents = defaultCourse.frames.filter((frame) => frame.type === 'content')
  assert.ok(questions.length >= 120, `expected >= 120 questions, found ${questions.length}`)
  assert.ok(questions.some((question) => !question.multi), 'expected single-answer questions')
  assert.ok(questions.some((question) => question.multi), 'expected multi-answer questions')

  const chapters = new Set(contents.map((frame) => frame.eyebrow).filter(Boolean))
  assert.ok(chapters.size >= 10, `expected >= 10 chapters, found ${chapters.size}`)

  const frameIds = new Set()
  for (const frame of defaultCourse.frames) {
    assert.ok(!frameIds.has(frame.id), `duplicate frame id: ${frame.id}`)
    frameIds.add(frame.id)
    assert.ok(frame.eyebrow, `${frame.id} has no eyebrow`)
    assert.ok(frame.aiNote, `${frame.id} has no aiNote`)
    if (frame.type === 'content') {
      assert.ok(frame.title, `${frame.id} has no title`)
      assert.ok(Array.isArray(frame.body) && frame.body.length > 0, `${frame.id} has no body`)
    } else {
      assert.ok(frame.question, `${frame.id} has no question`)
      assert.ok(frame.options.length >= 2, `${frame.id} needs at least two options`)
      assert.ok(frame.explanation, `${frame.id} has no explanation`)
    }
  }

  for (const question of questions) {
    const optionIds = new Set()
    for (const option of question.options) {
      assert.ok(!optionIds.has(option.id), `duplicate option id in ${question.id}: ${option.id}`)
      optionIds.add(option.id)
    }
    const correct = question.options.filter((option) => option.correct)
    assert.ok(correct.length > 0, `${question.id} has no correct answer`)
    if (question.multi) {
      assert.ok(correct.length >= 2, `${question.id} is multi-answer but has ${correct.length} correct option(s)`)
      assert.match(question.helper, /all answers/i, `${question.id} is missing the multi-answer helper`)
    } else {
      assert.equal(correct.length, 1, `${question.id} is single-answer but has ${correct.length} correct options`)
    }
  }
})
