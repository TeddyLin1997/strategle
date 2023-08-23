import { createContext, useContext, useState } from 'react'

export interface WalletContextProps {
  account: string;
  chainId: number;
  connect: () => Promise<void>;
  switchChain: (newChainId: number) => Promise<void>;
}

const initWalletContext = {
  account: '',
  chainId: 1, // eth chain id
  connect: () => Promise.resolve(),
  switchChain: () => Promise.resolve(),
}

export const WalletContext = createContext<WalletContextProps>(initWalletContext)

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState<string>('')
  const [chainId, setChainId] = useState(1)

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
      } catch (connectError) {
        console.error('Failed to connect:', connectError)
      }
    }
  }

  const switchChain = async (newChainId: number) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${newChainId.toString(16)}` }],
        })
        setChainId(newChainId)
      } catch (switchError) {
        console.error('Failed to switch chain:', switchError)
      }
    }
  }

  return (
    <WalletContext.Provider value={{ account, chainId, connect, switchChain }}>
      {children}
    </WalletContext.Provider>
  )
}
