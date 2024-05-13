import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { ChangeEvent, useState, useEffect } from 'react'
import LoadingFullscreen from '@/components/loading-fullscreen'
import { Button, TextField } from '@mui/material'
import useLoading from '@/hooks/useLoading'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import { formatNumber } from '@/utils'

const Unstake = ({ isActive, update }: { isActive: boolean, update: () => void }) => {
  const { isLoading, load, unload } = useLoading()
  const { account, isSigner } = WalletContainer.useContainer()

  const { isSupportChain, STRAGContract, STRAGContractBindWallet } = ContractContainer.useContainer()

  const [amount, setAmount] = useState('')
  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)

  const unstake = async () => {
    if (!isSupportChain) return toast.error('Currency network is not supported.')
    if (!isSigner) return toast.error('Wallet is not connected.')
    if (Number(amount) === 0) return toast.error('Unstake amount is zero.')
    if (Number(amount) > Number(stakingBalance)) return toast.error('amount exceeds staking balance')

    try {
      load()

      const tx = await STRAGContractBindWallet.unstake(ethers.parseEther(amount))
      toast.success(`Unstake Success: ${amount} $STRAG`)
      unload()

      await tx.wait()
      setTimeout(() => update(), 5000)
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }
  }

  const [stakingBalance, setStakingBalance] = useState('-')
  useEffect(() => {
    if (!account) return
    STRAGContract.stakers(account).then(res => setStakingBalance(ethers.formatEther(res[0])))
  }, [account])


  return (
    <div className={ isActive ? 'block' : 'hidden' }>
      <div className="mb-4">
        <div className="mb-2 font-bold">Address : </div>
        <div className="break-all text-primary-light">{ account }</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Staking STRAG Balance : </div>
        <div>{formatNumber(stakingBalance)} STRAG</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Unstake Amount : </div>
        <TextField value={amount} onChange={onChangeAmount} size="small" fullWidth className="bg-white rounded-md" />
      </div>

      <Button className="!mt-4" variant="contained" onClick={unstake}>Unstake</Button>
      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Unstake
