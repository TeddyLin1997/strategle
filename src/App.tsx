import Router from '@/routes'
import { WebSocketProvider } from '@/context/wsConext'
import { ThemeProvider } from '@mui/material/styles'
import { WalletProvider } from '@/context/walletContext'
import { MarketProvider } from '@/context/marketContext'
import { SnackbarProvider } from 'notistack'
import { theme } from './styles/theme'

const App = () => {
  return (
    <WebSocketProvider>
      <ThemeProvider theme={theme}>
        <MarketProvider>
          <WalletProvider>
            <SnackbarProvider maxSnack={5} anchorOrigin={ { horizontal: 'right', vertical: 'bottom' }} autoHideDuration={1500}>
              <Router />
            </SnackbarProvider>
          </WalletProvider>
        </MarketProvider>
      </ThemeProvider>
    </WebSocketProvider>
  )
}

export default App
