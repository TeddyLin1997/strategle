import { createWebSocketServer } from '@/service/web-socket'
import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import { WalletProvider } from '@/context/walletContext'
import { MarketProvider } from '@/context/marketContext'
import { SnackbarProvider } from 'notistack'
import { theme } from './styles/theme'

createWebSocketServer()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MarketProvider>
        <WalletProvider>
          <SnackbarProvider maxSnack={5} anchorOrigin={ { horizontal: 'right', vertical: 'bottom' }} autoHideDuration={1500}>
            <Router />
          </SnackbarProvider>
        </WalletProvider>
      </MarketProvider>
    </ThemeProvider>
  )
}

export default App
