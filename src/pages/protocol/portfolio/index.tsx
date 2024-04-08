import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { ethers, EventLog } from 'ethers'
import lottie from 'lottie-web'
import dayjs from 'dayjs'
import Big from 'big.js'
import RewardAnimation from './reward-animation'
import { ArrowBack } from '@mui/icons-material'
import { Tabs, Tab, Button } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import LoadingFullscreen from '@/components/loading-fullscreen'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import useLoading from '@/hooks/useLoading'
import EventTransactionCard from '@/components/transaction-card-event'
import { formatNumber, sleep, truncateSlice } from '@/utils'
import Mint from './actions/mint'
import Stake from './actions/stake'
import Unstake from './actions/unstake'
import Withdraw from './actions/withdraw'
import styled from 'styled-components'

enum TabsEvent {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
  Withdraw = 'Withdraw',
}

const perSecondReward = Big(0.12).div(365).div(24).div(60).div(60)

interface PortfolioProps {
  handleTab: () => void
}

const initStaker = {
  stakingBalance: '0',
  rewardUpdateTime: 0,
  reward: '0',
  unstakeTime: 0,
  unlockTime: 0,
}

const PageContainer = styled.div`
  .Mui-selected {
    color: black !important;
  }

  button {
    color: white !important;
  }

  svg {
    fill: white;
  }
`

const Portfolio = ({ handleTab }: PortfolioProps) => {
  const navigate = useNavigate()
  const { isLoading, load, unload } = useLoading()

  const actionEl = useRef<HTMLDivElement>(null)
  const claimEl = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const action = params.get('action') || ''


  useEffect(() => {
    if (!actionEl.current) return
    if (!claimEl.current) return
    if (!action) return

    if (action === 'Claim') claimEl.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    else actionEl.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [action])

  // STRAG token info
  const { isSigner, account, provider, chainId } = WalletContainer.useContainer()
  const { isSupportChain, STRAGContract, STRAGContractBindWallet } = ContractContainer.useContainer()

  const [stragBalance, setStragBalance] = useState('-')
  const [staker, setStaker] = useState(initStaker)

  useEffect(() => {
    if (!account) return

    setStragBalance('-')
    setStaker({ ...initStaker })

    STRAGContract.balanceOf(account).then(res => setStragBalance(res))
    STRAGContract.stakers(account).then(res => {
      setStaker({
        stakingBalance: res[0],
        rewardUpdateTime: Number(Big(res[1]).toString()),
        reward: res[2],
        unstakeTime: Number(Big(res[3]).toString()),
        unlockTime: Number(Big(res[4]).toString()),
      })
    })
  }, [account, provider, chainId])

  const rewards = useMemo(() => {
    const elapsedTime = (Date.now() / 1000) - staker.rewardUpdateTime
    const stakingBalance = ethers.formatEther(staker.stakingBalance)
    const calcedReward = ethers.formatEther(staker.reward)
    const newRewards = Big(stakingBalance).mul(elapsedTime).mul(perSecondReward).add(calcedReward).toFixed(4)
    return newRewards
  }, [staker])

  // tab
  const [tab, setTab] = useState(TabsEvent.Mint)
  useEffect(() => {
    if (action === TabsEvent.Mint) setTab(TabsEvent.Mint)
    if (action === TabsEvent.Stake) setTab(TabsEvent.Stake)
    if (action === TabsEvent.Unstake) setTab(TabsEvent.Unstake)
    if (action === TabsEvent.Withdraw) setTab(TabsEvent.Withdraw)
  }, [action])

  const onActionTab = (_, tab: TabsEvent) => {
    setTab(tab)
    navigate(`/protocol?tab=Portfolio&action=${tab}`)
  }

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
    if (Number(staker.stakingBalance) === 0) return

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
  }, [staker.stakingBalance])

  const claimRewards = async () => {
    if (!isSupportChain) return toast.error('Currency network is not supported.')
    if (!isSigner) return toast.error('Wallet is not connected.')

    try {
      load()

      const tx = await STRAGContractBindWallet.claimRewards()
      await tx.wait()

      toast.success('Claim Reward Success.')
      unload()
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }
  }

  // transactions
  const [transactionEvents, setTransactionEvents]= useState<Array<EventLog>>([])
  useEffect(() => {
    getTransactions()

    async function getTransactions () {
      const filterMint = await STRAGContract.filters.Mint(account, null, null).getTopicFilter()
      const filterStake = await STRAGContract.filters.Stake(account, null, null).getTopicFilter()
      const filterUnstake = await STRAGContract.filters.Unstake(account, null).getTopicFilter()
      const filterWithdraw = await STRAGContract.filters.Withdraw(account, null, null).getTopicFilter()
      const filterClaimRewards = await STRAGContract.filters.ClaimRewards(account, null, null).getTopicFilter()


      const res = await Promise.all([
        STRAGContract.queryFilter(filterMint, -50000),
        STRAGContract.queryFilter(filterStake, -50000),
        STRAGContract.queryFilter(filterUnstake, -50000),
        STRAGContract.queryFilter(filterWithdraw, -50000),
        STRAGContract.queryFilter(filterClaimRewards, -50000),
      ])

      const events = res.flat().sort((a, b) => b.blockNumber - a.blockNumber) as EventLog[]
      setTransactionEvents(events)
    }
  }, [account])


  // page
  const PageCount = 5
  const [page, setPage] = useState(1)
  const onPage = (_, page: number) => setPage(page)

  const displayTransactionEvents = useMemo(() => {
    const end = page * PageCount
    const start = end - PageCount
    return transactionEvents.slice(start, end)
  }, [transactionEvents, page])

  const count = Math.round(transactionEvents.length / PageCount)

  return (
    <div>
      <div className="mb-8 flex items-center gap-4 font-bold text-3xl">
        <ArrowBack onClick={handleTab} className="cursor-pointer" />
        <span>Portfolio</span>
      </div>

      <section className="mb-8 flex gap-4">
        {/* earn machine animation */}
        <div className="w-full md:w-3/5 relative flex">
          <div ref={earnMachineAnimation} className="m-auto absolute top-[-20%] left-[-10%] scale-125 bottom-0 pointer-events-none" />
          { rewardList.map(item => <RewardAnimation key={item} amount={formatNumber(perSecondReward.mul(ethers.formatEther(staker.stakingBalance)).toFixed(8), 8)} />) }
        </div>

        <div className="w-full md:w-2/5">
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
              <div className="ml-8 font-bold text-lg text-primary-light">{ account ? truncateSlice(account) : '-' }</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- STRAG Balance : </div>
              <div className="ml-8 font-bold text-lg text-primary-light">$ {formatNumber(ethers.formatEther(stragBalance))} STRAG</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- Staking STRAG Amount : </div>
              <div className="ml-8 font-bold text-lg text-primary-light">$ {formatNumber(ethers.formatEther(staker.stakingBalance))} STRAG</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- Expected Rewards / Year : </div>
              <div className="ml-8 font-bold text-lg text-up"> $ {formatNumber(String(Number(ethers.formatEther(staker.stakingBalance)) * 0.12))} USDT</div>
            </article>
          </section>
        </div>

      </section>

      <section className="mb-14 flex flex-col justify-center">
        <div className="mb-6 text-center font-bold text-3xl">
          <span>Rewards : </span>
          <span className="text-up">{rewards} USDT</span>
        </div>

        <div ref={claimEl} className="w-full flex justify-center">
          <Button variant="contained" onClick={claimRewards}>Claim Rewards</Button>
        </div>
      </section>

      <hr className="mb-8 md:mb-10 border-gray-1" />

      <section className="mb-10 flex flex-wrap md:flex-nowrap gap-6">
        <div ref={actionEl} className="px-6 pb-6 w-full md:w-1/2 h-fit rounded-xl bg-gray-bg">

          <Tabs value={tab} onChange={onActionTab} indicatorColor="primary" textColor="inherit" className="!mb-6" variant="scrollable" scrollButtons="auto">
            <Tab label={TabsEvent.Mint} value={TabsEvent.Mint} />
            <Tab label={TabsEvent.Stake} value={TabsEvent.Stake} />
            <Tab label={TabsEvent.Unstake} value={TabsEvent.Unstake} />
            <Tab label={TabsEvent.Withdraw} value={TabsEvent.Withdraw} />
          </Tabs>

          {tab=== TabsEvent.Mint && <Mint />}
          {tab=== TabsEvent.Stake && <Stake />}
          {tab=== TabsEvent.Unstake && <Unstake />}
          {tab=== TabsEvent.Withdraw && <Withdraw />}


          <article className="mt-10">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold">
              <img src="/logo.ico" className="w-5 h-5" />
              <span>Tips : </span>
            </div>
            <ul className="ml-8 list-disc leading-relaxed">
              <li>Token supply is limited to 3,600,000.</li>
              <li>Minimum staking period is 365 days.</li>
              <li>Unstaking requires a 180-day waiting period.</li>
              <li>The team will inject investment rewards quarterly.</li>
              <li>Staking again will recalculate the unlocking time.</li>
            </ul>
          </article>

        </div>


        <div className="w-full md:w-1/2">
          {displayTransactionEvents.length === 0 && <div className="p-4 text-center text-xl font-bold">No transaction record</div>}

          { displayTransactionEvents.length !== 0 &&
           <div>
             {displayTransactionEvents.map((item ,index) => <EventTransactionCard key={index} event={item} />)}

             <PageContainer className="p-2 flex justify-center rounded">
               <Pagination
                 count={count}
                 onChange={onPage}
                 className="history-pagination !fill-white"
                 color="primary"
                 variant="text"
                 shape="rounded"
                 siblingCount={1}
               />
             </PageContainer>
           </div>
          }
        </div>
      </section>

      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Portfolio
