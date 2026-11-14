import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from '@mui/material'
import {
  courseMetaFor,
  courseMetas,
  defaultCourseId,
  loadCourse,
  resolveCourseId,
  type CourseId,
} from '../data/lesson'
import type { FrameResult, LessonFrame, LessonMeta, QuestionFrame as QuestionFrameType } from '../types'
import { CompletionFrame } from './CompletionFrame'
import { ContentFrame } from './ContentFrame'
import { CourseSelector } from './CourseSelector'
import { Crossfade } from './Crossfade'
import { ProgressHexagons } from './ProgressHexagons'
import { QuestionFrame } from './QuestionFrame'
import { TopBar } from './TopBar'

type CourseSession = {
  index: number
  answers: Record<string, string[]>
  results: Record<string, FrameResult>
}

const initialSession: CourseSession = { index: 0, answers: {}, results: {} }

function updateCourseUrl(nextId: CourseId) {
  const url = new URL(window.location.href)
  if (nextId === defaultCourseId) {
    url.searchParams.delete('course')
  } else {
    url.searchParams.set('course', nextId)
  }
  url.hash = ''
  window.history.replaceState(null, '', url.toString())
}

export function LessonPage() {
  const [courseId, setCourseId] = useState<CourseId>(() => resolveCourseId())
  const [frames, setFrames] = useState<LessonFrame[]>([])
  const [meta, setMeta] = useState<LessonMeta>(() => courseMetaFor(resolveCourseId()))
  const [sessions, setSessions] = useState<Partial<Record<CourseId, CourseSession>>>({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)
  const [explainOpen, setExplainOpen] = useState(false)
  const [toast, setToast] = useState('')
  const requestId = useRef(0)

  const session = sessions[courseId] ?? initialSession
  const { index, answers, results } = session

  useEffect(() => {
    let cancelled = false
    const currentRequest = ++requestId.current
    setLoading(true)
    setLoadError(null)

    loadCourse(courseId)
      .then((course) => {
        if (cancelled || currentRequest !== requestId.current) return
        setFrames(course.frames)
        setMeta(course.meta)
      })
      .catch((error: unknown) => {
        if (cancelled || currentRequest !== requestId.current) return
        const message = error instanceof Error ? error.message : 'Failed to load course.'
        setLoadError(message)
      })
      .finally(() => {
        if (cancelled || currentRequest !== requestId.current) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [courseId, reloadToken])

  const total = frames.length
  const clampedIndex = total === 0 ? 0 : Math.min(index, total)
  const frame = !loading && clampedIndex < total ? frames[clampedIndex] : undefined
  const isComplete = !loading && !loadError && total > 0 && clampedIndex >= total
  const isLast = total > 0 && clampedIndex === total - 1

  const questionFrames = useMemo(
    () => frames.filter((item): item is QuestionFrameType => item.type === 'question'),
    [frames],
  )
  const correctCount = questionFrames.filter((question) => results[question.id] === 'correct').length

  const selectedIds = frame && frame.type === 'question' ? (answers[frame.id] ?? []) : []
  const result = frame && frame.type === 'question' ? results[frame.id] : undefined

  useEffect(() => {
    if (loading || loadError) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [clampedIndex, courseId, loading, loadError])

  const updateSession = useCallback(
    (course: CourseId, updater: (current: CourseSession) => CourseSession) => {
      setSessions((previous) => ({
        ...previous,
        [course]: updater(previous[course] ?? initialSession),
      }))
    },
    [],
  )

  const handleSelect = useCallback(
    (question: QuestionFrameType, optionId: string) => {
      if (results[question.id] === 'correct') return
      updateSession(courseId, (current) => {
        const selected = current.answers[question.id] ?? []
        const nextSelected = question.multi
          ? selected.includes(optionId)
            ? selected.filter((id) => id !== optionId)
            : [...selected, optionId]
          : [optionId]

        const nextResults = { ...current.results }
        if (nextResults[question.id] === 'incorrect') {
          delete nextResults[question.id]
        }

        return {
          ...current,
          answers: { ...current.answers, [question.id]: nextSelected },
          results: nextResults,
        }
      })
    },
    [courseId, results, updateSession],
  )

  const handleCheck = useCallback(
    (question: QuestionFrameType) => {
      const selected = answers[question.id] ?? []
      const correctIds = question.options.filter((option) => option.correct).map((option) => option.id)
      const isCorrect =
        selected.length === correctIds.length && correctIds.every((id) => selected.includes(id))

      updateSession(courseId, (current) => ({
        ...current,
        results: {
          ...current.results,
          [question.id]: isCorrect ? 'correct' : 'incorrect',
        },
      }))
    },
    [answers, courseId, updateSession],
  )

  const handleContinue = useCallback(() => {
    updateSession(courseId, (current) => ({
      ...current,
      index: Math.min(current.index + 1, Math.max(total, 0)),
    }))
  }, [courseId, total, updateSession])

  const handleStepClick = useCallback(
    (step: number) => {
      if (total === 0) return
      updateSession(courseId, (current) => ({
        ...current,
        index: Math.max(0, Math.min(step, total - 1)),
      }))
    },
    [courseId, total, updateSession],
  )

  const handleBack = useCallback(() => {
    if (clampedIndex > 0) {
      updateSession(courseId, (current) => ({ ...current, index: Math.max(0, current.index - 1) }))
    } else {
      setToast('You are on the first screen. Use the hexagons to jump ahead.')
    }
  }, [clampedIndex, courseId, updateSession])

  const handleRestart = useCallback(() => {
    setSessions((previous) => ({ ...previous, [courseId]: initialSession }))
  }, [courseId])

  const handleCourseChange = useCallback(
    (nextId: CourseId) => {
      if (nextId === courseId) return
      setExplainOpen(false)
      setCourseId(nextId)
      setMeta(courseMetaFor(nextId))
      setFrames([])
      updateCourseUrl(nextId)
    },
    [courseId],
  )

  const handleRetryLoad = useCallback(() => {
    setReloadToken((value) => value + 1)
  }, [])

  const explainText = isComplete
    ? `You have reached the end of “${meta.lesson}”. Use the hexagons above, the course menu, or “Review last screen” to revisit any concept.`
    : (frame?.aiNote ?? 'Use the lesson content on this screen to guide your answer.')

  const footerText = (() => {
    if (!frame) return ''
    if (frame.type === 'content') return 'Read the concept, then continue.'
    if (result === 'correct') return 'Nice work — continue when you are ready.'
    if (result === 'incorrect') return 'Review the feedback, then try again.'
    return 'Choose the best answer, then check it.'
  })()

  const contentKey = loadError
    ? `error:${courseId}`
    : loading
      ? `loading:${courseId}`
      : isComplete
        ? `lesson-complete:${courseId}`
        : (frame?.id ?? `empty:${courseId}`)

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          bgcolor: 'background.paper',
        }}
      >
        <TopBar meta={meta} onBack={handleBack} onExplain={() => setExplainOpen(true)} />
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              maxWidth: 1080,
              mx: 'auto',
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CourseSelector
              value={courseId}
              size="small"
              courses={courseMetas}
              disabled={loading}
              onChange={handleCourseChange}
            />
          </Box>
        </Box>
        <ProgressHexagons total={total} current={clampedIndex} onStepClick={handleStepClick} />
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 800,
            px: { xs: 2.5, sm: 3 },
            pt: { xs: 4, sm: 6 },
            pb: { xs: 8, sm: 10 },
          }}
        >
          <Crossfade activeKey={contentKey}>
            {loadError ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Unable to load course</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>{loadError}</Typography>
                <Button variant="contained" onClick={handleRetryLoad}>
                  Try again
                </Button>
              </Box>
            ) : loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress aria-label="Loading course" />
              </Box>
            ) : isComplete ? (
              <CompletionFrame
                meta={meta}
                screenCount={frames.length}
                questionCount={questionFrames.length}
                correctCount={correctCount}
                onRestart={handleRestart}
                onReview={() => handleStepClick(frames.length - 1)}
              />
            ) : frame ? (
              frame.type === 'content' ? (
                <ContentFrame frame={frame} />
              ) : (
                <QuestionFrame
                  frame={frame}
                  selectedIds={selectedIds}
                  result={result}
                  onSelect={(optionId) => handleSelect(frame, optionId)}
                />
              )
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography sx={{ color: 'text.secondary' }}>No content available.</Typography>
              </Box>
            )}
          </Crossfade>
        </Container>
      </Box>

      {!isComplete && frame && !loading && !loadError ? (
        <Box
          component="footer"
          sx={{
            position: 'sticky',
            bottom: 0,
            bgcolor: 'rgba(247, 244, 239, 0.92)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              maxWidth: 800,
              px: { xs: 2.5, sm: 3 },
              py: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              {footerText}
            </Typography>
            <Box sx={{ flex: 1 }} />

            {frame.type === 'content' ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleContinue}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {isLast ? 'Finish lesson' : 'Continue'}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={result === 'correct' ? handleContinue : () => handleCheck(frame)}
                disabled={result !== 'correct' && selectedIds.length === 0}
                endIcon={result === 'correct' ? <ArrowForwardRoundedIcon /> : undefined}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {result === 'correct'
                  ? isLast
                    ? 'Finish lesson'
                    : 'Continue'
                  : result === 'incorrect'
                    ? 'Try again'
                    : 'Check answer'}
              </Button>
            )}
          </Container>
        </Box>
      ) : null}

      <Dialog open={explainOpen} onClose={() => setExplainOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            fontWeight: 800,
            letterSpacing: '-0.01em',
          }}
        >
          <AutoAwesomeRoundedIcon color="primary" />
          Explain this screen
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ lineHeight: 1.75, color: 'text.primary' }}>{explainText}</Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 2.5, color: 'text.secondary' }}>
            Study guidance based on this screen. Always verify with the official documentation for this topic.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="contained" onClick={() => setExplainOpen(false)}>
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3200}
        onClose={() => setToast('')}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
