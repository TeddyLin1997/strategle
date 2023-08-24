import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import { WalletProvider } from '@/context/walletContext'
import { theme } from './styles/theme'
import { SnackbarProvider } from 'notistack'



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <SnackbarProvider maxSnack={5} anchorOrigin={ { horizontal: 'right', vertical: 'bottom' }} autoHideDuration={1500}>
          <Router />
        </SnackbarProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App
