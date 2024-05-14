import { useEffect, useRef, useState } from 'react'
import { ethers } from 'ethers'
import lottie from 'lottie-web'
import dayjs from 'dayjs'
import RewardAnimation from './reward-animation'
import { formatNumber, sleep } from '@/utils'
import Big from 'big.js'

const perSecondReward = Big(0.12).div(365).div(24).div(60).div(60)

interface EarnMachineProps {
  stakingBalance: string
}
const EarnMachine = ({ stakingBalance }: EarnMachineProps) => {

  // earn machine animation
  const earnMachineAnimation = useRef(null)
  useEffect(() => {
    if (!earnMachineAnimation.current) return
    lottie.loadAnimation({
      container: earnMachineAnimation.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animation/earn-machine.json' // the path to the animation json
    })
  }, [])

  // rewards animation
  const [rewardList, setRewardList] = useState<number[]>([])
  useEffect(() => {
    if (!stakingBalance || Number(stakingBalance) === 0) return

    const timerId = setInterval(() => {
      setRewardList(prev => [...prev, dayjs().valueOf() as number])
    }, 1.3 * 1000)

    let removeTimerId: NodeJS.Timeout
    timer()
    async function timer () {
      await sleep(3)
      removeTimerId = setInterval(() => {
        setRewardList(prev => [...prev.slice(1, prev.length)])
      }, 1.3 * 1000)
    }
    return () => {
      clearInterval(timerId)
      clearInterval(removeTimerId)
    }
  }, [stakingBalance])

  return (
    <div className="w-full md:w-3/5 relative flex">
      <div ref={earnMachineAnimation} className="m-auto absolute top-[-20%] left-[-10%] scale-125 bottom-0 pointer-events-none" />
      { rewardList.map(item => <RewardAnimation key={item} amount={formatNumber(perSecondReward.mul(ethers.formatEther(stakingBalance)).toFixed(8), 8)} />) }
    </div>
  )
}

export default EarnMachine
