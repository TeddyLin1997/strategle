import { createContext, useEffect, useState } from 'react'
import { JsonRpcProvider } from 'ethers'
import { CHAIN_INFO } from '@/global/chain'

export interface WalletContextProps {
  account: string;
  chainId: number;
  provider: JsonRpcProvider;
  connect: () => Promise<void>;
  switchChain: (newChainId: number) => Promise<void>;
}

const initWalletContext = {
  account: '',
  chainId: 1,
  provider: new JsonRpcProvider(),
  connect: () => Promise.resolve(),
  switchChain: () => Promise.resolve(),
}

export const WalletContext = createContext<WalletContextProps>(initWalletContext)

export const WalletProvider = ({ children }) => {

  // connect account
  const [account, setAccount] = useState(initWalletContext.account)
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

  // switch chain
  const [chainId, setChainId] = useState(initWalletContext.chainId)
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
    connect()
    window.ethereum.on('chainChanged', (chainId: string) => setChainId(parseInt(chainId)))
    window.ethereum.on('accountsChanged', (accounts: string[]) => setAccount(accounts[0]))
  }, [])

  // provider
  const [provider, setProvider] = useState(initWalletContext.provider)

  useEffect(() => {
    if (!CHAIN_INFO[chainId]) return
    const rpcProvider = new JsonRpcProvider(CHAIN_INFO[chainId]?.rpc)
    setProvider(rpcProvider)
  }, [chainId])

  return (
    <WalletContext.Provider value={{ account, chainId, provider, connect, switchChain }}>
      {children}
    </WalletContext.Provider>
  )
}
