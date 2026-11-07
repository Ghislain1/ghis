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

const { lessonMeta, lessonFrames } = moduleShim.exports
const questions = lessonFrames.filter((frame) => frame.type === 'question')
const contents = lessonFrames.filter((frame) => frame.type === 'content')

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
