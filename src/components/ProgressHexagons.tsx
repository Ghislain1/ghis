import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { Box, Tooltip, Typography } from '@mui/material'

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

type ProgressHexagonsProps = {
  total: number
  current: number
  onStepClick: (index: number) => void
}

export function ProgressHexagons({ total, current, onStepClick }: ProgressHexagonsProps) {
  const isComplete = current >= total

  return (
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
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.5 },
            overflowX: 'auto',
            py: 0.25,
            pr: 0.5,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {Array.from({ length: total }).map((_, index) => {
            const complete = index < current
            const active = index === current

            return (
              <Tooltip
                key={index}
                title={complete ? `Screen ${index + 1} · complete` : `Go to screen ${index + 1}`}
                arrow
                disableInteractive
              >
                <Box
                  sx={{
                    flex: '0 0 auto',
                    borderRadius: 2,
                    '&:focus-within': { boxShadow: '0 0 0 3px rgba(77,122,255,0.35)' },
                  }}
                >
                  <Box
                    component="button"
                    type="button"
                    onClick={() => onStepClick(index)}
                    aria-label={`Go to screen ${index + 1}`}
                    aria-current={active ? 'step' : undefined}
                    sx={{
                      width: { xs: 34, sm: 38 },
                      height: { xs: 38, sm: 42 },
                      p: 0,
                      border: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: { xs: 13, sm: 14 },
                      fontWeight: 800,
                      color: complete || active ? '#FFFFFF' : 'rgba(53, 9, 44, 0.5)',
                      bgcolor: complete
                        ? 'secondary.main'
                        : active
                          ? 'primary.main'
                          : 'rgba(53, 9, 44, 0.08)',
                      clipPath: HEX_CLIP,
                      transition: 'transform .16s ease, background-color .2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: complete
                          ? 'secondary.dark'
                          : active
                            ? 'primary.dark'
                            : 'rgba(53, 9, 44, 0.16)',
                      },
                      '&:focus-visible': { outline: 'none' },
                    }}
                  >
                    {complete ? <CheckRoundedIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : index + 1}
                  </Box>
                </Box>
              </Tooltip>
            )
          })}
        </Box>

        <Box sx={{ flex: 1 }} />

        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {isComplete ? 'Lesson complete' : `Screen ${Math.min(current + 1, total)} of ${total}`}
        </Typography>
      </Box>
    </Box>
  )
}
