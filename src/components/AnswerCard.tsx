import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Card, Typography } from '@mui/material'
import type { AnswerOption } from '../types'

type AnswerCardProps = {
  option: AnswerOption
  index: number
  selected: boolean
  checked: boolean
  multi: boolean
  locked: boolean
  onSelect: (optionId: string) => void
}

type Tone = 'idle' | 'selected' | 'correct' | 'incorrect'

const TONES: Record<Tone, { border: string; bg: string; hoverBorder: string; hoverBg: string }> = {
  idle: {
    border: 'rgba(53, 9, 44, 0.15)',
    bg: '#FFFFFF',
    hoverBorder: 'rgba(53, 9, 44, 0.4)',
    hoverBg: '#FFFFFF',
  },
  selected: {
    border: '#4D7AFF',
    bg: 'rgba(77, 122, 255, 0.06)',
    hoverBorder: '#4D7AFF',
    hoverBg: 'rgba(77, 122, 255, 0.09)',
  },
  correct: {
    border: '#0DB537',
    bg: 'rgba(13, 181, 55, 0.08)',
    hoverBorder: '#0DB537',
    hoverBg: 'rgba(13, 181, 55, 0.1)',
  },
  incorrect: {
    border: '#E7384D',
    bg: 'rgba(231, 56, 77, 0.07)',
    hoverBorder: '#E7384D',
    hoverBg: 'rgba(231, 56, 77, 0.09)',
  },
}

export function AnswerCard({
  option,
  index,
  selected,
  checked,
  multi,
  locked,
  onSelect,
}: AnswerCardProps) {
  const isCorrectOption = checked && option.correct
  const isWrongSelected = checked && selected && !option.correct
  const tone: Tone = isCorrectOption
    ? 'correct'
    : isWrongSelected
      ? 'incorrect'
      : selected
        ? 'selected'
        : 'idle'
  const palette = TONES[tone]

  const badgeBg = isCorrectOption
    ? 'success.main'
    : isWrongSelected
      ? 'error.main'
      : selected
        ? 'primary.main'
        : 'rgba(53, 9, 44, 0.06)'

  const handleSelect = () => {
    if (!locked) {
      onSelect(option.id)
    }
  }

  return (
    <Card
      elevation={0}
      onClick={handleSelect}
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      aria-disabled={locked}
      tabIndex={locked ? -1 : 0}
      onKeyDown={(event) => {
        if (!locked && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          handleSelect()
        }
      }}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: { xs: 1.5, sm: 2 },
        p: { xs: 2, sm: 2.5 },
        pr: { xs: 5.5, sm: 6.5 },
        border: '2px solid',
        borderColor: palette.border,
        bgcolor: palette.bg,
        cursor: locked ? 'default' : 'pointer',
        opacity: checked && !isCorrectOption && !isWrongSelected ? 0.62 : 1,
        transition:
          'border-color var(--duration-hover) ease, background-color var(--duration-hover) ease, opacity var(--duration-hover) ease, transform var(--duration-fast) var(--ease-out)',
        '@media (hover: hover) and (pointer: fine)': locked
          ? undefined
          : {
              '&:hover': {
                borderColor: palette.hoverBorder,
                bgcolor: palette.hoverBg,
              },
            },
        '&:active': locked
          ? undefined
          : {
              transform: 'scale(0.99)',
            },
        '@media (prefers-reduced-motion: reduce)': {
          '&:active': { transform: 'none' },
        },
        '&:focus-visible': {
          outline: '3px solid rgba(77, 122, 255, 0.35)',
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 32, sm: 36 },
          height: { xs: 32, sm: 36 },
          flex: '0 0 auto',
          borderRadius: multi ? 1.5 : '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: { xs: 13, sm: 14 },
          bgcolor: badgeBg,
          color: selected || isCorrectOption || isWrongSelected ? '#FFFFFF' : 'text.secondary',
          transition:
            'background-color var(--duration-hover) ease, color var(--duration-hover) ease',
        }}
      >
        {String.fromCharCode(65 + index)}
      </Box>

      <Box sx={{ minWidth: 0, pt: { xs: 0.25, sm: 0.35 } }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.96rem', sm: '1.04rem' },
            lineHeight: 1.4,
          }}
        >
          {option.title}
        </Typography>
        {option.description ? (
          <Typography
            sx={{
              mt: 0.5,
              color: 'text.secondary',
              fontSize: { xs: '0.83rem', sm: '0.9rem' },
              lineHeight: 1.55,
            }}
          >
            {option.description}
          </Typography>
        ) : null}
      </Box>

      {isCorrectOption ? (
        <CheckRoundedIcon
          sx={{
            position: 'absolute',
            right: { xs: 16, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'success.main',
            fontSize: { xs: 22, sm: 24 },
          }}
        />
      ) : isWrongSelected ? (
        <CloseRoundedIcon
          sx={{
            position: 'absolute',
            right: { xs: 16, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'error.main',
            fontSize: { xs: 22, sm: 24 },
          }}
        />
      ) : selected && !checked ? (
        <CheckRoundedIcon
          sx={{
            position: 'absolute',
            right: { xs: 16, sm: 20 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'primary.main',
            fontSize: { xs: 22, sm: 24 },
          }}
        />
      ) : null}
    </Card>
  )
}
