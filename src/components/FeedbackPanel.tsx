import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Typography } from '@mui/material'
import type { FrameResult } from '../types'

type FeedbackPanelProps = {
  result: FrameResult
  explanation: string
}

export function FeedbackPanel({ result, explanation }: FeedbackPanelProps) {
  const correct = result === 'correct'

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        bgcolor: correct ? 'success.light' : 'error.light',
        border: '1px solid',
        borderColor: correct ? 'rgba(13, 181, 55, 0.35)' : 'rgba(231, 56, 77, 0.3)',
        animation: 'frameIn .3s ease both',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          flex: '0 0 auto',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          bgcolor: correct ? 'success.main' : 'error.main',
          animation: 'popIn .35s ease both',
        }}
      >
        {correct ? <CheckRoundedIcon fontSize="small" /> : <CloseRoundedIcon fontSize="small" />}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, mb: 0.5, color: correct ? 'success.dark' : 'error.dark' }}>
          {correct ? 'Correct!' : 'Not quite.'}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.88rem', sm: '0.93rem' },
            lineHeight: 1.65,
            color: correct ? '#0A4D20' : '#6E1829',
          }}
        >
          {explanation}
        </Typography>
        {!correct ? (
          <Typography
            sx={{
              mt: 1,
              fontWeight: 700,
              fontSize: { xs: '0.82rem', sm: '0.86rem' },
              color: 'error.dark',
            }}
          >
            Adjust your selection and try again.
          </Typography>
        ) : null}
      </Box>
    </Box>
  )
}
