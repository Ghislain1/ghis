import { useMemo } from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'
import type { FrameResult, QuestionFrame as QuestionFrameType } from '../types'
import { AnswerCard } from './AnswerCard'
import { Eyebrow } from './Eyebrow'
import { FeedbackPanel } from './FeedbackPanel'

type QuestionFrameProps = {
  frame: QuestionFrameType
  selectedIds: string[]
  result?: FrameResult
  onSelect: (optionId: string) => void
}

function hashSeed(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleDeterministic<T>(items: readonly T[], seedKey: string): T[] {
  const shuffled = [...items]
  const random = mulberry32(hashSeed(seedKey))

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = current
  }

  return shuffled
}

export function QuestionFrame({ frame, selectedIds, result, onSelect }: QuestionFrameProps) {
  const checked = Boolean(result)
  const locked = result === 'correct'
  const multi = Boolean(frame.multi)
  const options = useMemo(() => shuffleDeterministic(frame.options, frame.id), [frame])

  return (
    <Stack spacing={{ xs: 3, sm: 3.5 }}>
      {frame.eyebrow ? <Eyebrow>{frame.eyebrow}</Eyebrow> : null}

      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.7rem', sm: '2.2rem' },
            maxWidth: '34ch',
          }}
        >
          {frame.question}
        </Typography>

        {(frame.helper || multi) && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1.75 }}>
            {frame.helper ? (
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {frame.helper}
              </Typography>
            ) : null}
            {multi ? (
              <Chip
                size="small"
                label="Multiple answers"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  bgcolor: 'secondary.light',
                  color: 'secondary.dark',
                  border: '1px solid rgba(29, 208, 180, 0.4)',
                }}
              />
            ) : null}
          </Box>
        )}
      </Box>

      <Stack spacing={1.5} role={multi ? 'group' : 'radiogroup'} aria-label={frame.question}>
        {options.map((option, index) => (
          <AnswerCard
            key={option.id}
            option={option}
            index={index}
            selected={selectedIds.includes(option.id)}
            checked={checked}
            multi={multi}
            locked={locked}
            onSelect={onSelect}
          />
        ))}
      </Stack>

      {result ? <FeedbackPanel result={result} explanation={frame.explanation} /> : null}
    </Stack>
  )
}
