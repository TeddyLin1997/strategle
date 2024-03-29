import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffcf39',
      main: '#FFC408',
      dark: '#b28905',
      contrastText: '#121214',
    },
    secondary: {
      light: '#14bdbd',
      main: '#306F7D',
      dark: '#214d57',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Kanit", "Noto Sans TC", robot, Inter, system-ui, sans-serif',
  },
})

// box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);
