import { Tabs, Tab, Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Mint from './actions/mint'
import lottie from 'lottie-web'
import ContractContainer from '@/context/contractContext'
import { formatNumber, truncateSlice } from '@/utils'
import { ethers } from 'ethers'
import WalletContainer from '@/context/walletContext'
import { ArrowBack } from '@mui/icons-material'

enum TabsEvent {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
  withdraw = 'withdraw',
}

interface PortfolioProps {
  handleTab: () => void
}

const Portfolio = ({ handleTab }: PortfolioProps) => {
  // STRAG token info
  const wallet = WalletContainer.useContainer()
  const { isSigner, signer, stragleTokenContract } = ContractContainer.useContainer()

  const [portfolio, setPortfolio] = useState({
    stragBalance: '-',
    rewards: '-',
  })

  const [staker, setStaker] = useState({
    stakingBalance: '0',
    unstakeTime: '-',
    unlockTime: '-',
  })

  useEffect(() => {
    if (!wallet.account) return

    stragleTokenContract.balanceOf(wallet.account).then(res => setPortfolio(prev => ({ ...prev, stragBalance: ethers.formatEther(res) })))
    stragleTokenContract.stakers(wallet.account).then(res => {
      setStaker({
        stakingBalance: ethers.formatEther(res[0]),
        unstakeTime: res[3],
        unlockTime: res[4],
      })
    })
  }, [wallet.account])

  useEffect(() => {
    if (!isSigner) return
    if (!signer) return

    const timerId = setInterval(() => {
      const contractWithSigner = stragleTokenContract.connect(signer) as ethers.Contract
      contractWithSigner.getAddressRewards().then(res => setPortfolio(prev => ({ ...prev, rewards: formatNumber(ethers.formatEther(res)) })))
    }, 2000)

    return () => clearInterval(timerId)
  }, [isSigner, signer])

  // tab
  const [tab, setTab] = useState(TabsEvent.Mint)
  const onActionTab = (_, tab: TabsEvent) => setTab(tab)


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

  return (
    <div>
      <div className="mb-8 flex items-center gap-4 font-bold text-3xl">
        <ArrowBack onClick={handleTab} className="cursor-pointer" />
        <span>Portfolio</span>
      </div>

      <section className="mb-8 flex gap-4">
        {/* earn machine animation */}
        <div className="w-3/5 relative flex">
          <div ref={earnMachineAnimation} className="m-auto absolute top-[-20%] scale-125 bottom-0 pointer-events-none" />
        </div>

        <div className="w-2/5">
          <div className="mb-4 flex flex-wrap gap-2 text-xl font-bold">
            Stake
            <span className="text-primary-light">$STRAG</span>
             to get
            <span className="text-primary-light">12% APY</span>
            .
          </div>

          <section>
            <article className="mb-2">
              <div className="mb-1">- Address : </div>
              <div className="ml-8 font-bold text-lg text-primary-light">{ truncateSlice(wallet.account) }</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- STRAG Balance : </div>
              <div className="ml-8 font-bold text-lg text-primary-light">$ {formatNumber(portfolio.stragBalance)} STRAG</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- Staking STRAG Amount : </div>
              <div className="ml-8 font-bold text-lg text-primary-light">$ {formatNumber(staker.stakingBalance)} STRAG</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- Expected Rewards / Year : </div>
              <div className="ml-8 font-bold text-lg text-up"> $ {formatNumber(String(Number(staker.stakingBalance) * 0.12))} USDT</div>
            </article>
          </section>


          {/* <section className="mb-4 flex text-gray-secondary">
            <div className="w-1/2">Can unstake time : -</div>
            <div className="w-1/2">Can withdraw time : - </div>
          </section> */}
        </div>

      </section>


      <section className="mb-14 flex flex-col justify-center">
        <div className="mb-6 text-center font-bold text-3xl">
          <span>Rewards : </span>
          <span className="text-up">{portfolio.rewards} USDT</span>
        </div>
        <Button className="!mx-auto" variant="contained">Claim Rewards</Button>
      </section>

      <hr className="mb-8 md:mb-10 border-gray-1" />

      <section className="flex gap-4">
        <div className="px-6 pb-6 w-1/2 rounded-xl bg-gray-bg">

          <Tabs value={tab} onChange={onActionTab} indicatorColor="primary" textColor="inherit" className="!mb-6">
            <Tab label={TabsEvent.Mint} value={TabsEvent.Mint} />
            <Tab label={TabsEvent.Stake} value={TabsEvent.Stake} />
            <Tab label={TabsEvent.Unstake} value={TabsEvent.Unstake} />
            <Tab label={TabsEvent.withdraw} value={TabsEvent.withdraw} />
          </Tabs>

          {tab=== TabsEvent.Mint && <Mint />}
          {tab=== TabsEvent.Stake && 2}
          {tab=== TabsEvent.Unstake && 3}
          {tab=== TabsEvent.withdraw && 4}
        </div>
      </section>

    </div>
  )
}

export default Portfolio
