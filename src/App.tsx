import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './styles/theme'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App
