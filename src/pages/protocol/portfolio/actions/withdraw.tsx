import { useEffect, useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import { Button } from '@mui/material'
import Big from 'big.js'
import dayjs from 'dayjs'
import useLoading from '@/hooks/useLoading'
import LoadingFullscreen from '@/components/loading-fullscreen'
import { timeCountdown } from '@/utils'

const Withdraw = () => {
  const { isLoading, load, unload } = useLoading()
  const { account, isSigner } = WalletContainer.useContainer()

  const { isSupportChain, STRAGContract, STRAGContractBindWallet } = ContractContainer.useContainer()

  const [unlockTime, setUnlockTime] = useState(0)

  useEffect(() => {
    STRAGContract.stakers(account).then(res => {
      setUnlockTime(Number(Big(res[4]).mul(1000).toString()))
    })
  }, [])

  const withdraw = async () => {
    if (!isSupportChain) return toast.error('Currency network is not supported.')
    if (!isSigner) return toast.error('Wallet is not connected.')
    if (unlockTime === 0) return toast.error('The withdrawal time has not yet reached')

    try {
      load()

      const tx = await STRAGContractBindWallet.withdraw()
      await tx.wait()

      toast.success('Withdraw Success.')
      unload()
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }
  }

  const [time, setTime] = useState(Date.now())
  const countdown = useMemo(() => timeCountdown(unlockTime), [time, unlockTime])
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 font-bold">Address : </div>
        <div className="break-all text-primary-light">{ account }</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Can withdraw time : </div>
        <div>{unlockTime ? dayjs(unlockTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-bold">Time to unlock : </div>
        { !unlockTime ?
          <div> - </div>:
          <div className="flex gap-2">
            <span className="text-primary font-bold">{countdown.days}</span> Days
            <span className="text-primary font-bold">{countdown.hours}</span> Hours
            <span className="text-primary font-bold">{countdown.minutes}</span> Mins
            <span className="text-primary font-bold">{countdown.seconds}</span> Secs
          </div>
        }
      </div>

      <Button className="!mt-6" variant="contained" onClick={withdraw}>Withdraw</Button>
      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Withdraw
