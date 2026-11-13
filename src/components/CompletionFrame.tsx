import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import type { LessonMeta } from '../types'
import { Eyebrow } from './Eyebrow'

type CompletionFrameProps = {
  meta: LessonMeta
  screenCount: number
  questionCount: number
  correctCount: number
  onRestart: () => void
  onReview: () => void
}

export function CompletionFrame({
  meta,
  screenCount,
  questionCount,
  correctCount,
  onRestart,
  onReview,
}: CompletionFrameProps) {
  const stats = [
    { label: 'Screens', value: String(screenCount) },
    { label: 'Concept checks', value: `${correctCount}/${questionCount}` },
    { label: 'Est. time', value: `${meta.estimatedMinutes} min` },
  ]

  return (
    <Box
      sx={{
        maxWidth: 620,
        mx: 'auto',
        textAlign: 'center',
        py: { xs: 2, sm: 4 },
        animation: 'frameIn var(--duration-enter) var(--ease-out) both',
      }}
    >
      <Box
        sx={{
          width: 96,
          height: 108,
          mx: 'auto',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          bgcolor: 'secondary.main',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'popIn var(--duration-celebration) var(--ease-celebrate) both',
        }}
      >
        <CheckRoundedIcon sx={{ fontSize: 46, strokeWidth: 2 }} />
      </Box>

      <Stack spacing={1.5} alignItems="center">
        <Eyebrow>LESSON COMPLETE</Eyebrow>
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          You&apos;re ready to apply it.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.08rem' },
            lineHeight: 1.7,
            color: 'text.secondary',
            maxWidth: '42ch',
          }}
        >
          {correctCount === questionCount
            ? `You answered all ${questionCount} concept checks correctly.`
            : `You answered ${correctCount} of ${questionCount} concept checks correctly. Replay any screen to sharpen the rest.`}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
          my: { xs: 3, sm: 4 },
        }}
      >
        {stats.map((stat) => (
          <Paper
            key={stat.label}
            elevation={0}
            sx={{
              minWidth: 128,
              px: 2.5,
              py: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: '1.35rem', lineHeight: 1.2 }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<RestartAltRoundedIcon />}
          onClick={onRestart}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Restart lesson
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={onReview}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          Review last screen
        </Button>
      </Stack>

      <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'text.secondary' }}>
        Tip: jump back to any screen with the hexagons at the top.
      </Typography>
    </Box>
  )
}
