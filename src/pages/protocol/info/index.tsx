import { ethers } from 'ethers'
import lottie from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
import { formatNumber } from '@/utils'
import { Button } from '@mui/material'
import Treasury from './treasury'
import Rules from './rules'
import ContractContainer from '@/context/contractContext'

interface InfoProps {
  handleTab: () => void
}

const Info = ({ handleTab }: InfoProps) => {

  const { STRAG_ADDRESS, STRAGContract } = ContractContainer.useContainer()

  // token info
  const [tokenInfo, setTokenInfo] = useState({ totalSupply: '-', totalStake: '-' })
  useEffect(() => {
    STRAGContract.totalSupply().then(res => setTokenInfo(prev => ({ ...prev, totalSupply: ethers.formatEther(res) })) )
    STRAGContract.balanceOf(STRAG_ADDRESS).then(res => setTokenInfo(prev => ({ ...prev, totalStake: ethers.formatEther(res) })) )
  }, [])


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

  return (
    <div>
      {/* header */}
      <div className="mb-8 md:mb-14 w-full flex">
        <div className="w-full md:w-3/5">
          <pre className="mb-4 text-4xl font-bold leading-normal">{'Decentralized \nAI Investment protocol.'}</pre>

          <div className="mb-4 flex items-center font-bold">
            <div className="w-1/2">
              <div className="mb-2">TVL：</div>
              <div className="ml-4 text-2xl text-primary-light">{ formatNumber(tokenInfo.totalStake) } $USD</div>
            </div>
            <div className="w-1/2">
              <div className="mb-2">Total mint：</div>
              <div className="ml-4 text-2xl text-primary-light">{ formatNumber(tokenInfo.totalSupply) } STRAG</div>
            </div>
          </div>

          <div className="mb-6 font-semibold">
              Stragle Protocol empowers users to stake <span className="text-primary text-xl" >STRAG tokens</span>  for AI-driven trading returns. By exchanging <span className="text-up text-xl">USDT</span> , investors can access potential gains of up to <span className="text-primary text-xl">12%</span> annually. With flexible profit withdrawals and a focus on security and transparency, it offers a seamless crypto investment experience.
          </div>

          <Button variant="contained" className="!font-bold" onClick={handleTab}>
            Get Started
          </Button>
        </div>

        {/* banner animation */}
        <div ref={bannerAnimation} className="ml-auto hidden w-2/5 md:block" />
      </div>

      <hr className="mb-8 md:mb-10 border-gray-1" />

      {/* Rules */}
      <Rules />

      <hr className="mb-8 md:mb-10 border-gray-1" />

      {/* treasury */}
      <Treasury />
    </div>
  )
}

export default Info
