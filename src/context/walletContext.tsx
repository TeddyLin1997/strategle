import { createContext, useEffect, useState } from 'react'
import { JsonRpcProvider, formatEther } from 'ethers'
import { CHAIN_INFO } from '@/global/chain'

export interface WalletContextProps {
  provider: JsonRpcProvider | null
  chainId: number
  account: string
  balance: number
  isConnect: boolean
  connect: () => Promise<void>
  switchChain: (newChainId: number) => Promise<void>
}

const initWalletContext = {
  provider: new JsonRpcProvider(),
  chainId: 1,
  account: '',
  balance: 0,
  isConnect: false,
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
    const chainInfo = CHAIN_INFO[newChainId]

    requestChain()

    async function requestChain () {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${newChainId.toString(16)}` }],
        })
        setChainId(newChainId)
      } catch (error) {
        if ((error as any).message.includes('wallet_addEthereumChain')) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainInfo.id.toString(16)}`,
              chainName: chainInfo.name,
              nativeCurrency: {
                name: chainInfo.coin.name,
                symbol: chainInfo.coin.name,
                decimals: 18,
              },
              rpcUrls: [chainInfo.rpc], // Binance Smart Chain 的 RPC URL
              blockExplorerUrls: [chainInfo.explorer], // 区块浏览器的 URL
            }],
          })

          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${newChainId.toString(16)}` }],
          })
          setChainId(newChainId)
        }
      }
    }
  }

  useEffect(() => { setIsConnect(false) }, [chainId])

  useEffect(() => {
    if (!window.ethereum) return
    connect()
    window.ethereum.on('chainChanged', (chainId: string) => setChainId(parseInt(chainId)))
    window.ethereum.on('accountsChanged', (accounts: string[]) => setAccount(accounts[0]))
  }, [])

  // provider
  const [isConnect, setIsConnect] = useState(false)
  const [provider, setProvider] = useState(initWalletContext.provider)

  useEffect(() => {
    if (!CHAIN_INFO[chainId]) return
    const rpcProvider = new JsonRpcProvider(CHAIN_INFO[chainId]?.rpc)

    rpcProvider.getNetwork()
      .then((network) => {
        setIsConnect(true)
        console.log('connect blockchain success:', network.name, ', network ID：', network.chainId)
      })
      .catch((error) => {
        console.error('connect blockchain erro:', error)
      })

    setProvider(rpcProvider)
  }, [chainId])

  // balance
  const [balance, setBalance] = useState(initWalletContext.balance)
  useEffect(() => {
    if (isConnect && account) getBalance()
    async function getBalance () {
      const balanceInWei = await provider.getBalance(account)
      const balanceInEth = Number(formatEther(balanceInWei))
      setBalance(Math.round(balanceInEth * 10000) / 10000) // 只留四位小數)
    }
  }, [account, provider, isConnect])

  return (
    <WalletContext.Provider value={{ account, chainId, provider, balance, isConnect, connect, switchChain }}>
      {children}
    </WalletContext.Provider>
  )
}
