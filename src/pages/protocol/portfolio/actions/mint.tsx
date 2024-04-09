import LoadingFullscreen from '@/components/loading-fullscreen'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import useLoading from '@/hooks/useLoading'
import { formatNumber } from '@/utils'
import { Button, TextField } from '@mui/material'

import { ethers } from 'ethers'
import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Mint = ({ isActive }: { isActive: boolean }) => {
  const { isLoading, load, unload } = useLoading()
  const { account, isSigner } = WalletContainer.useContainer()

  const { isSupportChain, USDTContract, USDTContractBindWallet, STRAGContractBindWallet, STRAG_ADDRESS } = ContractContainer.useContainer()

  const [amount, setAmount] = useState('')
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)


  const mint = async () => {
    if (!isSupportChain) return toast.error('Currency network is not supported.')
    if (!isSigner) return toast.error('Wallet is not connected.')
    if (Number(amount) === 0) return toast.error('USDT balance is zero.')

    try {
      load()

      // 1. approve USDT
      const approveTx = await USDTContractBindWallet.approve(STRAG_ADDRESS, ethers.parseEther(amount))
      await approveTx.wait()

      // 2. mint STRAG
      const mintTx = await STRAGContractBindWallet.mint(ethers.parseEther(amount))
      await mintTx.wait()

      toast.success(`Mint Success: ${amount} $STRAG`)
      unload()
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }

  }

  const [usetBalance, setUsetBalance] = useState('-')
  useEffect(() => {
    if (!account) return
    USDTContract.balanceOf(account).then(res => setUsetBalance(ethers.formatEther(res)))
  }, [account])

  return (
    <div className={ isActive ? 'block' : 'hidden' }>
      <div className="mb-4">
        <div className="mb-2 font-bold">Address : </div>
        <div className="break-all text-primary-light">{ account }</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Your USDT Balance : </div>
        <div>{formatNumber(usetBalance)} USDT</div>
      </div>

      <div className="mb-1">
        <div className="mb-2 font-bold">Mint Amount : </div>
        <TextField value={amount} onChange={onChangeAmount} size="small" fullWidth className="bg-white rounded-md" />
      </div>

      <div className="mb-1 text-xs text-primary-light">
        Rate : 1 STRAG = 1 USDT (Equivalent exchange tokens)
      </div>

      <Button className="!mt-2" variant="contained" onClick={mint}>Mint</Button>
      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Mint
