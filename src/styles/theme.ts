import { createTheme } from '@mui/material/styles'
// text color #121214
// #fff6d8 淡黃
// fafafa hover灰
// #f2f3f5 背景灰
// #efefef 框線灰
// box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);

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

//主題色
// #FFFBEF
// #FDE58B
// #FCCE28
// #BA9203
// #362C0A

// 漲 #0ecb81
// 跌 #FF6E6E

// 淡色率 #D0F2F2
// 淡色紅 #FFE2E2
