import { useContext } from 'react'
import { WalletContextProps, WalletContext } from '@/context/walletContext'

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext)
  return context
}
