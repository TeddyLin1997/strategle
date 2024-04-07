import { ethers } from 'ethers'
import { USDT_ADDRESS, STRAG_ADDRESS } from '@/global/contract/contract-address'
import tetherTokenAbi from '@/global/contract/UUSDT.json'
import stragleTokenAbi from '@/global/contract/stragle-token.json'
import { createContainer } from 'unstated-next'
import WalletContainer from './walletContext'
import { useEffect, useState } from 'react'

const provider = new ethers.BrowserProvider(window.ethereum)

const useContract = () => {
  const { isSigner, signer } = WalletContainer.useContainer()
  const [USDTContract, setUSDTContract] = useState(new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, provider))
  const [STRAGContract, setSTRAGContract] = useState(new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, provider))

  useEffect(() => {
    if (!isSigner) return
    if (!signer) return

    setUSDTContract(new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, signer))
    setSTRAGContract(new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, signer))
  }, [isSigner, signer])

  return { provider, USDTContract, STRAGContract, USDT_ADDRESS, STRAG_ADDRESS }
}

const ContractContainer = createContainer(useContract)

export default ContractContainer
