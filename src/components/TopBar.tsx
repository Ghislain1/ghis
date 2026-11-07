import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import type { LessonMeta } from '../types'

type TopBarProps = {
  meta: LessonMeta
  onBack: () => void
  onExplain: () => void
}

export function TopBar({ meta, onBack, onExplain }: TopBarProps) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          gap: { xs: 1.25, sm: 1.75 },
          minHeight: { xs: 60, sm: 68 },
          px: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: 1080,
          mx: 'auto',
        }}
      >
        <IconButton
          onClick={onBack}
          aria-label="Back to previous screen"
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
            flex: '0 0 auto',
          }}
        >
          <ArrowBackRoundedIcon fontSize="small" />
        </IconButton>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              lineHeight: 1.3,
            }}
            noWrap
          >
            {meta.course}
          </Typography>
          <Typography variant="subtitle1" noWrap sx={{ lineHeight: 1.35, fontSize: { xs: '0.95rem', sm: '1.02rem' } }}>
            {meta.lesson}
          </Typography>
        </Box>

        <Button
          onClick={onExplain}
          startIcon={<AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />}
          variant="outlined"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderColor: 'divider',
            color: 'text.primary',
            fontWeight: 600,
            fontSize: '0.85rem',
            py: 0.9,
            px: 2,
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          Explain this screen
        </Button>
        <IconButton
          onClick={onExplain}
          aria-label="Explain this screen"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            border: '1px solid',
            borderColor: 'divider',
            color: 'primary.main',
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
