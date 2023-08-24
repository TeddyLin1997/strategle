import { createContext, useEffect, useState } from 'react'

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
    if (!window.ethereum) return

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])

      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setChainId(parseInt(chainId))
    } catch (connectError) {
      console.error('Failed to connect:', connectError)
    }
  }

  const switchChain = async (newChainId: number) => {
    if (!window.ethereum) return

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

  useEffect(() => {
    if (!window.ethereum) return
    window.ethereum.on('chainChanged', (chainId: string) => setChainId(parseInt(chainId)))
  }, [])


  useEffect(() => { connect() }, [])

  return (
    <WalletContext.Provider value={{ account, chainId, connect, switchChain }}>
      {children}
    </WalletContext.Provider>
  )
}
