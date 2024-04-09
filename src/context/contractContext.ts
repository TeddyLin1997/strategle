import { ethers } from 'ethers'
import { USDT_ADDRESS, STRAG_ADDRESS } from '@/global/contract/contract-address'
import tetherTokenAbi from '@/global/contract/UUSDT.json'
import stragleTokenAbi from '@/global/contract/stragle-token.json'
import { createContainer } from 'unstated-next'
import WalletContainer from './walletContext'
import { useEffect, useState } from 'react'
import { CHAIN_INFO, Chain } from '@/global/chain'


const supportChain = CHAIN_INFO[Chain.Sepolia]
const isProtocolSupportChain = Number(window.ethereum?.networkVersion) === supportChain.id

const protocolProvider = isProtocolSupportChain ? new ethers.BrowserProvider(window.ethereum) : new ethers.JsonRpcProvider(supportChain.rpc)

// support chain contract
const USDTContract = new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, protocolProvider)
const STRAGContract = new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, protocolProvider)

const useContract = () => {
  const { isSigner, signer, chainId } = WalletContainer.useContainer()
  const isSupportChain = Number(window.ethereum?.networkVersion) === chainId

  // bind wallet contract
  const [USDTContractBindWallet, setUSDTContractBindWallet] = useState(new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, protocolProvider))
  const [STRAGContractBindWallet, setSTRAGContractBindWallet] = useState(new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, protocolProvider))

  useEffect(() => {
    if (!isSigner) return
    if (!signer) return

    setUSDTContractBindWallet(new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, signer))
    setSTRAGContractBindWallet(new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, signer))
  }, [isSigner, signer])

  return {
    isSupportChain,
    protocolProvider,
    USDT_ADDRESS,
    STRAG_ADDRESS,
    USDTContract,
    STRAGContract,
    USDTContractBindWallet,
    STRAGContractBindWallet,
    switchToArbitrum,
  }
}

const ContractContainer = createContainer(useContract)

export default ContractContainer


async function switchToArbitrum () {
  if (!window.ethereum) return

  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: `0x${Chain.ARB.toString(16)}`,
      chainName: 'Arbitrum',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://arbitrum.llamarpc.com'],
      blockExplorerUrls: ['https://arbiscan.io/'],
    }]
  })
}


