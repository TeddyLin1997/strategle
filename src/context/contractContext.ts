import { ethers, Signer } from 'ethers'
import { USDT_ADDRESS, STRAG_ADDRESS } from '@/global/contract/contract-address'
import tetherTokenAbi from '@/global/contract/UUSDT.json'
import stragleTokenAbi from '@/global/contract/stragle-token.json'
import { createContainer } from 'unstated-next'
import { useEffect, useState } from 'react'

const provider = new ethers.BrowserProvider(window.ethereum)

const useContract = () => {
  const [isSigner, setisSigner] = useState(false)
  const [signer, setSigner] = useState<Signer | null>(null)

  const tetherTokenContract = new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, provider)
  const stragleTokenContract = new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, provider)

  useEffect(() => {
    provider.getSigner().then(res => {
      setisSigner(true)
      setSigner(res)
    })
  }, [provider])

  return { isSigner, signer, provider, tetherTokenContract, stragleTokenContract, USDT_ADDRESS, STRAG_ADDRESS }
}

const ContractContainer = createContainer(useContract)

export default ContractContainer
