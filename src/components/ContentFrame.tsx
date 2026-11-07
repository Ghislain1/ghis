import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded'
import { Box, Paper, Stack, Typography } from '@mui/material'
import type { ContentFrame as ContentFrameType } from '../types'
import { Eyebrow } from './Eyebrow'

export function ContentFrame({ frame }: { frame: ContentFrameType }) {
  return (
    <Stack spacing={{ xs: 3, sm: 3.5 }}>
      {frame.eyebrow ? <Eyebrow>{frame.eyebrow}</Eyebrow> : null}

      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: '2rem', sm: '2.6rem' },
          maxWidth: '22ch',
        }}
      >
        {frame.title}
      </Typography>

      <Stack spacing={2}>
        {frame.body.map((paragraph, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: { xs: '1.02rem', sm: '1.1rem' },
              lineHeight: 1.75,
              color: 'text.primary',
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Stack>

      {frame.note ? (
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            p: { xs: 2, sm: 2.5 },
            borderRadius: 3,
            bgcolor: 'warning.light',
            border: '1px solid',
            borderColor: 'rgba(255, 190, 0, 0.45)',
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              flex: '0 0 auto',
              borderRadius: 2,
              bgcolor: 'rgba(255, 190, 0, 0.3)',
              color: 'warning.dark',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LightbulbRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, mb: 0.25, fontSize: '0.9rem' }}>Keep in mind</Typography>
            <Typography sx={{ fontSize: { xs: '0.88rem', sm: '0.93rem' }, lineHeight: 1.65 }}>
              {frame.note}
            </Typography>
          </Box>
        </Paper>
      ) : null}
    </Stack>
  )
}
