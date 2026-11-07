const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const lessonPath = path.join(__dirname, '..', 'src', 'data', 'lesson.ts')
const source = fs.readFileSync(lessonPath, 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
  fileName: 'lesson.ts',
}).outputText

const moduleShim = { exports: {} }
new Function('module', 'exports', 'require', compiled)(moduleShim, moduleShim.exports, require)

const { lessonMeta, lessonFrames, courses, defaultCourseId, getCourse, activeCourseId } = moduleShim.exports
const questions = lessonFrames.filter((frame) => frame.type === 'question')
const contents = lessonFrames.filter((frame) => frame.type === 'content')

test('course registry exposes dotnet, dotnet-command, docker and fastapi', () => {
  const ids = courses.map((course) => course.id)
  assert.equal(new Set(ids).size, ids.length, 'course ids must be unique')
  for (const id of ['dotnet', 'dotnet-command', 'docker', 'fastapi']) {
    assert.ok(ids.includes(id), `missing course ${id}`)
  }
  assert.ok(ids.includes(defaultCourseId))
})

test('every course has metadata and valid questions', () => {
  for (const course of courses) {
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

test('getCourse resolves ids and falls back to the default course', () => {
  assert.equal(getCourse('docker').id, 'docker')
  assert.ok(getCourse('fastapi').meta.course.includes('FastAPI'))
  assert.equal(getCourse('unknown-course').id, defaultCourseId)
})

test('default exports point at the default course', () => {
  assert.equal(activeCourseId, defaultCourseId)
  assert.equal(lessonMeta, getCourse(defaultCourseId).meta)
  assert.equal(lessonFrames, getCourse(defaultCourseId).frames)
})

test('lesson metadata describes the .NET course', () => {
  assert.ok(lessonMeta.course.includes('.NET'))
  assert.ok(lessonMeta.lesson.length > 0)
  assert.ok(lessonMeta.chapter.length > 0)
  assert.ok(lessonMeta.estimatedMinutes > 0)
})

test('course contains at least 120 questions, single and multi answer', () => {
  assert.ok(questions.length >= 120, `expected >= 120 questions, found ${questions.length}`)
  assert.ok(questions.some((question) => !question.multi), 'expected single-answer questions')
  assert.ok(questions.some((question) => question.multi), 'expected multi-answer questions')
})

test('course is organised into multiple chapters', () => {
  const chapters = new Set(contents.map((frame) => frame.eyebrow).filter(Boolean))
  assert.ok(chapters.size >= 10, `expected >= 10 chapters, found ${chapters.size}`)
})

test('frame and option ids are unique', () => {
  const frameIds = new Set()
  for (const frame of lessonFrames) {
    assert.ok(!frameIds.has(frame.id), `duplicate frame id: ${frame.id}`)
    frameIds.add(frame.id)
  }

  for (const question of questions) {
    const optionIds = new Set()
    for (const option of question.options) {
      assert.ok(!optionIds.has(option.id), `duplicate option id in ${question.id}: ${option.id}`)
      optionIds.add(option.id)
    }
  }
})

test('question answer keys are valid', () => {
  for (const question of questions) {
    const correct = question.options.filter((option) => option.correct)
    assert.ok(correct.length > 0, `${question.id} has no correct answer`)

    if (question.multi) {
      assert.ok(correct.length >= 2, `${question.id} is multi-answer but has ${correct.length} correct option(s)`)
    } else {
      assert.equal(correct.length, 1, `${question.id} is single-answer but has ${correct.length} correct options`)
    }
  }
})

test('multi-answer questions advertise multiple answers', () => {
  for (const question of questions.filter((item) => item.multi)) {
    assert.match(question.helper, /all answers/i, `${question.id} is missing the multi-answer helper`)
  }
})

test('every frame contains the text the UI needs', () => {
  for (const frame of lessonFrames) {
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
})
