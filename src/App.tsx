import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import { WalletProvider } from '@/context/walletContext'
import { theme } from './styles/theme'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <Router />
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App
