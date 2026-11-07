import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4D7AFF',
      dark: '#193F95',
      light: '#DCE5FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1DD0B4',
      dark: '#10706E',
      light: '#D6F8F2',
      contrastText: '#08322F',
    },
    success: {
      main: '#0DB537',
      dark: '#0A7823',
      light: '#D9F7E1',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E7384D',
      dark: '#842138',
      light: '#FDE0E3',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFBE00',
      dark: '#896600',
      light: '#FFF4CC',
      contrastText: '#4A3500',
    },
    background: {
      default: '#f1e2c8',
      paper: '#FFFFFF',

    },
    text: {
      primary: '#2E1B2A',
      secondary: '#6F5F6B',
    },
    divider: 'rgba(53, 9, 44, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 800, letterSpacing: '-0.03em' },
    h3: { fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.18 },
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700, letterSpacing: '-0.01em' },
    subtitle2: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: '0.95rem',
          paddingTop: 11,
          paddingBottom: 11,
          paddingLeft: 24,
          paddingRight: 24,
        },
        sizeLarge: {
          fontSize: '1rem',
          paddingTop: 13,
          paddingBottom: 13,
          paddingLeft: 28,
          paddingRight: 28,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 18 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 22 },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.75rem',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
})
