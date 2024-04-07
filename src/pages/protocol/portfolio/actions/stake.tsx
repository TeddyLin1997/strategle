import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { ChangeEvent, useState, useEffect } from 'react'
import LoadingFullscreen from '@/components/loading-fullscreen'
import { Button, TextField } from '@mui/material'
import useLoading from '@/hooks/useLoading'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import { formatNumber } from '@/utils'

const Stake = () => {
  const { isLoading, load, unload } = useLoading()
  const { account, isSigner } = WalletContainer.useContainer()

  const { STRAGContract, STRAG_ADDRESS } = ContractContainer.useContainer()

  const [amount, setAmount] = useState('')
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)

  const stake = async () => {
    if (!isSigner) return toast.error('Wallet is not connected.')
    if (Number(amount) === 0) return toast.error('STRAG balance is zero.')

    try {
      load()

      // 1. approve STRAG
      const approveTx = await STRAGContract.approve(STRAG_ADDRESS, ethers.parseEther(amount))
      await approveTx.wait()

      // 2. stake STRAG
      const mintTx = await STRAGContract.stake(ethers.parseEther(amount))
      await mintTx.wait()

      toast.success(`Stake Success: ${amount} $STRAG`)
      unload()
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }
  }

  const [stragBalance, setStragBalance] = useState('-')
  useEffect(() => {
    if (!account) return
    STRAGContract.balanceOf(account).then(res => setStragBalance(ethers.formatEther(res)))
  }, [account])


  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 font-bold">Address : </div>
        <div className="break-all text-primary-light">{ account }</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Your STRAG Balance : </div>
        <div>{formatNumber(stragBalance)} STRAG</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Stake Amount : </div>
        <TextField value={amount} onChange={onChangeAmount} size="small" fullWidth className="bg-white rounded-md" />
      </div>

      <Button className="!mt-2" variant="contained" onClick={stake}>Stake</Button>
      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Stake
