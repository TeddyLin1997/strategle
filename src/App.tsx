import Router from '@/routes'
import WebSocketServerContainer from '@/context/wsConext'
import WalletContainer from '@/context/walletContext'
import MarketContainer from '@/context/marketContext'
import ContractContainer from '@/context/contractContext'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { theme } from './styles/theme'

const App = () => {
  return (
    <WebSocketServerContainer.Provider>
      <ThemeProvider theme={theme}>
        <MarketContainer.Provider>
          <ContractContainer.Provider>
            <WalletContainer.Provider>
              <SnackbarProvider maxSnack={5} anchorOrigin={ { horizontal: 'right', vertical: 'bottom' }} autoHideDuration={1500}>
                <Router />
              </SnackbarProvider>
            </WalletContainer.Provider>
          </ContractContainer.Provider>
        </MarketContainer.Provider>
      </ThemeProvider>
    </WebSocketServerContainer.Provider>
  )
}

export default App
