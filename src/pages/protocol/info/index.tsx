import { useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import lottie from 'lottie-web'
import { formatNumber } from '@/utils'
import { Button } from '@mui/material'
import Treasury from './treasury'
import Rules from './rules'
import Fundraising from './fundraising'

interface InfoProps {
  handleTab: () => void
  protocolInfo: {
    totalStake: string
    totalMint: string
    treasuryAmount: string
    startTime: number
  }
}

const Info = ({ protocolInfo, handleTab }: InfoProps) => {

  // banner animation
  const bannerAnimation = useRef(null)
  useEffect(() => {
    if (!bannerAnimation.current) return
    lottie.loadAnimation({
      container: bannerAnimation.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animation/banner.json' // the path to the animation json
    })
  }, [])

  const isStarted = protocolInfo.startTime !== 0

  return (
    <div>
      {/* header */}
      <div className="mb-8 md:mb-14 w-full flex">
        <div className="w-full md:w-3/5">
          <pre className="mb-4 text-4xl font-bold leading-normal">{'Decentralized AI \nInvestment protocol.'}</pre>

          <div className="mb-4 flex items-center font-bold">
            <div className="w-1/2">
              <div className="mb-2">TVL：</div>
              <div className="ml-4 text-2xl text-primary-light">{ formatNumber(ethers.formatEther(protocolInfo.totalStake)) } $USD</div>
            </div>
            <div className="w-1/2">
              <div className="mb-2">Total mint：</div>
              <div className="ml-4 text-2xl text-primary-light">{ formatNumber(ethers.formatEther(protocolInfo.totalMint)) } STRAG</div>
            </div>
          </div>

          <div className="mb-6 font-semibold">
              Stragle Protocol empowers users to stake <span className="text-primary text-xl" >STRAG tokens</span>  for AI-driven investment profits. By exchanging <span className="text-up text-xl">USDT</span> , investors can access potential gains of up to <span className="text-primary text-xl">12%</span> annually. With flexible profit withdrawals and a focus on security and transparency, it offers a seamless crypto investment experience.
          </div>

          <Button variant="contained" className="!font-bold" onClick={handleTab}>
            Get Started
          </Button>
        </div>

        {/* banner animation */}
        <div ref={bannerAnimation} className="ml-auto hidden w-2/5 md:block" />
      </div>

      <hr className="mb-8 md:mb-10 border-gray-1" />

      { !isStarted && <Fundraising treasuryAmount={protocolInfo.treasuryAmount} /> }

      {/* Rules */}
      <Rules />

      <hr className="mb-8 md:mb-10 border-gray-1" />

      {/* treasury */}
      <Treasury treasuryBalance={formatNumber(ethers.formatUnits(protocolInfo.treasuryAmount, 6))} />
    </div>
  )
}

export default Info
