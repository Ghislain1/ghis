import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Box } from '@mui/material'

const FADE_MS = 200

type Layer = {
  key: string
  node: ReactNode
}

type CrossfadeProps = {
  activeKey: string
  children: ReactNode
}

export function Crossfade({ activeKey, children }: CrossfadeProps) {
  const lastKey = useRef(activeKey)
  const lastNode = useRef(children)
  const inFlight = useRef(false)
  const [outgoing, setOutgoing] = useState<Layer | null>(null)
  const [skipIn, setSkipIn] = useState(false)

  if (lastKey.current === activeKey) {
    lastNode.current = children
  }

  useLayoutEffect(() => {
    if (lastKey.current === activeKey) {
      lastNode.current = children
      return
    }

    const previous = { key: lastKey.current, node: lastNode.current }
    lastKey.current = activeKey
    lastNode.current = children

    if (inFlight.current) {
      inFlight.current = false
      setOutgoing(null)
      setSkipIn(true)
      return
    }

    inFlight.current = true
    setSkipIn(false)
    setOutgoing(previous)

    const timer = window.setTimeout(() => {
      inFlight.current = false
      setOutgoing(null)
    }, FADE_MS)

    return () => window.clearTimeout(timer)
  }, [activeKey])

  return (
    <Box sx={{ display: 'grid' }}>
      {outgoing ? (
        <Box
          key={`out:${outgoing.key}`}
          aria-hidden
          sx={{
            gridArea: '1 / 1',
            pointerEvents: 'none',
            userSelect: 'none',
            animation: `frameFadeOut ${FADE_MS}ms ease-out both`,
            '@media (prefers-reduced-motion: reduce)': {
              display: 'none',
            },
          }}
        >
          {outgoing.node}
        </Box>
      ) : null}
      <Box
        key={`in:${activeKey}`}
        sx={{
          gridArea: '1 / 1',
          animation: skipIn ? 'none' : `frameFadeIn ${FADE_MS}ms var(--ease-out) both`,
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
