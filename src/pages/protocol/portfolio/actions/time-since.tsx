import toast from 'react-hot-toast'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import { Button } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import Big from 'big.js'
import useLoading from '@/hooks/useLoading'
import LoadingFullscreen from '@/components/loading-fullscreen'
import { timeCountdown } from '@/utils'

const Unstake = ({ isActive }: { isActive: boolean }) => {
  const { isLoading, load, unload } = useLoading()
  const { account, isSigner } = WalletContainer.useContainer()

  const { isSupportChain, STRAGContract, STRAGContractBindWallet } = ContractContainer.useContainer()

  const [unstakeTime, setUnstakeTime] = useState(0)

  useEffect(() => {
    STRAGContract.stakers(account).then(res => {
      setUnstakeTime(Number(Big(res[3]).mul(1000).toString()))
    })
  }, [])

  const unstake = async () => {
    if (!isSupportChain) return toast.error('Currency network is not supported.')
    if (!isSigner) return toast.error('Wallet is not connected.')
    if (unstakeTime === 0) return toast.error('The unstaking time has not yet reached')

    try {
      load()

      await STRAGContractBindWallet.unstake()
      // const tx = await STRAGContractBindWallet.unstake()
      // await tx.wait()

      toast.success('Withdraw Success.')
      unload()
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }
  }

  const [time, setTime] = useState(Date.now())
  const countdown = useMemo(() => timeCountdown(unstakeTime), [time, unstakeTime])
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={ isActive ? 'block' : 'hidden' }>
      <div className="mb-4">
        <div className="mb-2 font-bold">Address : </div>
        <div className="break-all text-primary-light">{ account }</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Can unstake time : </div>
        <div>{unstakeTime ? dayjs(unstakeTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Time to unlock : </div>
        { !unstakeTime ?
          <div> - </div>:
          <div className="flex gap-2">
            <span className="text-primary font-bold">{countdown.days}</span> Days
            <span className="text-primary font-bold">{countdown.hours}</span> Hours
            <span className="text-primary font-bold">{countdown.minutes}</span> Mins
            <span className="text-primary font-bold">{countdown.seconds}</span> Secs
          </div>
        }
      </div>

      <Button className="!mt-8" variant="contained" onClick={unstake}>Unstake</Button>
      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Unstake
