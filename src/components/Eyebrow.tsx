import type { ReactNode } from 'react'
import Typography from '@mui/material/Typography'

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="p"
      sx={{
        m: 0,
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'secondary.dark',
      }}
    >
      {children}
    </Typography>
  )
}
