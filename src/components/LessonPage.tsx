import { useEffect, useMemo, useState } from 'react'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from '@mui/material'
import { lessonFrames, lessonMeta } from '../data/lesson'
import type { FrameResult, QuestionFrame as QuestionFrameType } from '../types'
import { CompletionFrame } from './CompletionFrame'
import { ContentFrame } from './ContentFrame'
import { ProgressHexagons } from './ProgressHexagons'
import { QuestionFrame } from './QuestionFrame'
import { TopBar } from './TopBar'

export function LessonPage() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [results, setResults] = useState<Record<string, FrameResult>>({})
  const [explainOpen, setExplainOpen] = useState(false)
  const [toast, setToast] = useState('')

  const frame = index < lessonFrames.length ? lessonFrames[index] : undefined
  const isComplete = index >= lessonFrames.length
  const isLast = index === lessonFrames.length - 1

  const questionFrames = useMemo(
    () => lessonFrames.filter((item): item is QuestionFrameType => item.type === 'question'),
    [],
  )
  const correctCount = questionFrames.filter((question) => results[question.id] === 'correct').length

  const selectedIds = frame && frame.type === 'question' ? (answers[frame.id] ?? []) : []
  const result = frame && frame.type === 'question' ? results[frame.id] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [index])

  const handleSelect = (question: QuestionFrameType, optionId: string) => {
    if (results[question.id] === 'correct') return

    setAnswers((previous) => {
      const current = previous[question.id] ?? []
      const next = question.multi
        ? current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        : [optionId]

      return { ...previous, [question.id]: next }
    })

    setResults((previous) => {
      if (previous[question.id] !== 'incorrect') return previous
      const next = { ...previous }
      delete next[question.id]
      return next
    })
  }

  const handleCheck = (question: QuestionFrameType) => {
    const selected = answers[question.id] ?? []
    const correctIds = question.options.filter((option) => option.correct).map((option) => option.id)
    const isCorrect =
      selected.length === correctIds.length && correctIds.every((id) => selected.includes(id))

    setResults((previous) => ({
      ...previous,
      [question.id]: isCorrect ? 'correct' : 'incorrect',
    }))
  }

  const handleContinue = () => {
    setIndex((current) => Math.min(current + 1, lessonFrames.length))
  }

  const handleStepClick = (step: number) => {
    setIndex(Math.max(0, Math.min(step, lessonFrames.length - 1)))
  }

  const handleBack = () => {
    if (index > 0) {
      setIndex((current) => current - 1)
    } else {
      setToast('You are on the first screen. Use the hexagons to jump ahead.')
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setResults({})
    setIndex(0)
  }

  const explainText = isComplete
    ? `You have reached the end of “${lessonMeta.lesson}”. This course covered the .NET platform, C# types and OOP, the dotnet CLI, collections and LINQ, async, memory, Entity Framework Core, ASP.NET Core, WPF and security. Use the hexagons above or “Review last screen” to revisit any concept.`
    : (frame?.aiNote ?? 'Use the lesson content on this screen to guide your answer.')

  const footerText = (() => {
    if (!frame) return ''
    if (frame.type === 'content') return 'Read the concept, then continue.'
    if (result === 'correct') return 'Nice work — continue when you are ready.'
    if (result === 'incorrect') return 'Review the feedback, then try again.'
    return 'Choose the best answer, then check it.'
  })()

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
        <TopBar meta={lessonMeta} onBack={handleBack} onExplain={() => setExplainOpen(true)} />
        <ProgressHexagons total={lessonFrames.length} current={index} onStepClick={handleStepClick} />
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
          {isComplete ? (
            <CompletionFrame
              meta={lessonMeta}
              screenCount={lessonFrames.length}
              questionCount={questionFrames.length}
              correctCount={correctCount}
              onRestart={handleRestart}
              onReview={() => setIndex(lessonFrames.length - 1)}
            />
          ) : frame ? (
            <Box key={frame.id} sx={{ animation: 'frameIn .50s ease both' }}>
              {frame.type === 'content' ? (
                <ContentFrame frame={frame} />
              ) : (
                <QuestionFrame
                  frame={frame}
                  selectedIds={selectedIds}
                  result={result}
                  onSelect={(optionId) => handleSelect(frame, optionId)}
                />
              )}
            </Box>
          ) : null}
        </Container>
      </Box>

      {!isComplete && frame ? (
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
            Study guidance based on this screen. Always verify with the official .NET documentation.
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
