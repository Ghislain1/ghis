const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

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

const root = path.join(__dirname, '..')
const courseFiles = {
  dotnet: 'dotnet',
  'dotnet-command': 'dotnetCommand',
  docker: 'docker',
  fastapi: 'fastapi',
  flaui: 'flaui',
}

const [requestedCourse, requestedLanguage] = process.argv.slice(2)
const languages = requestedLanguage ? [requestedLanguage] : ['de', 'fr']
const courseIds = requestedCourse ? [requestedCourse] : Object.keys(courseFiles)

let failures = 0

function fail(message) {
  failures += 1
  console.error(`  - ${message}`)
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0
}

for (const courseId of courseIds) {
  const file = courseFiles[courseId]
  if (!file) {
    fail(`unknown course ${courseId}`)
    continue
  }

  const base = require(path.join(root, 'src', 'data', 'courses', `${file}.ts`))

  for (const language of languages) {
    const translationPath = path.join(
      root,
      'src',
      'data',
      'translations',
      language,
      `${file}.ts`,
    )

    console.log(`${courseId} / ${language}`)

    if (!fs.existsSync(translationPath)) {
      fail(`missing file ${path.relative(root, translationPath)}`)
      continue
    }

    let translation
    try {
      translation = require(translationPath)
    } catch (error) {
      fail(`cannot load ${path.relative(root, translationPath)}: ${error.message}`)
      continue
    }

    for (const field of ['course', 'chapter', 'lesson']) {
      if (!nonEmpty(translation.meta?.[field])) {
        fail(`meta.${field} is empty`)
      }
    }

    if (translation.meta?.estimatedMinutes !== base.meta.estimatedMinutes) {
      fail('meta.estimatedMinutes does not match the English course')
    }

    const baseIds = base.frames.map((frame) => frame.id)
    const translatedIds = Object.keys(translation.frames ?? {})

    if (translatedIds.length !== baseIds.length) {
      fail(`expected ${baseIds.length} frames, found ${translatedIds.length}`)
    }

    const translatedSet = new Set(translatedIds)
    for (const id of baseIds) {
      if (!translatedSet.has(id)) fail(`missing frame ${id}`)
    }
    const baseSet = new Set(baseIds)
    for (const id of translatedIds) {
      if (!baseSet.has(id)) fail(`unknown frame ${id}`)
    }

    for (const frame of base.frames) {
      const copy = translation.frames?.[frame.id]
      if (!copy) continue

      if (copy.type !== frame.type) {
        fail(`${frame.id} has type ${copy.type}, expected ${frame.type}`)
        continue
      }

      if (!nonEmpty(copy.eyebrow)) fail(`${frame.id} has no eyebrow`)
      if (!nonEmpty(copy.aiNote)) fail(`${frame.id} has no aiNote`)

      if (frame.type === 'content') {
        if (!nonEmpty(copy.title)) fail(`${frame.id} has no title`)
        if (!Array.isArray(copy.body) || copy.body.length !== frame.body.length) {
          fail(`${frame.id} must have ${frame.body.length} body paragraph(s)`)
        } else {
          copy.body.forEach((paragraph, index) => {
            if (!nonEmpty(paragraph)) fail(`${frame.id} body[${index}] is empty`)
          })
        }
        if (frame.note && !nonEmpty(copy.note)) fail(`${frame.id} has no note`)
      } else {
        if (!nonEmpty(copy.question)) fail(`${frame.id} has no question`)
        if (!nonEmpty(copy.explanation)) fail(`${frame.id} has no explanation`)
        if (frame.helper && !nonEmpty(copy.helper)) fail(`${frame.id} has no helper`)
        if (!copy.options || typeof copy.options !== 'object') {
          fail(`${frame.id} has no options`)
          continue
        }

        const baseOptionIds = frame.options.map((option) => option.id)
        const translatedOptionIds = Object.keys(copy.options)

        if (translatedOptionIds.length !== baseOptionIds.length) {
          fail(`${frame.id} expected ${baseOptionIds.length} options, found ${translatedOptionIds.length}`)
        }

        for (const option of frame.options) {
          const translatedOption = copy.options[option.id]
          if (!translatedOption) {
            fail(`${frame.id} is missing option ${option.id}`)
            continue
          }
          if (!nonEmpty(translatedOption.title)) {
            fail(`${frame.id} option ${option.id} has no title`)
          }
          if (option.description && !nonEmpty(translatedOption.description)) {
            fail(`${frame.id} option ${option.id} has no description`)
          }
        }
      }
    }

    if (failures === 0) console.log('  ok')
  }
}

if (failures > 0) {
  console.error(`\n${failures} translation problem(s) found.`)
  process.exit(1)
}

console.log('\nAll translations look complete.')
