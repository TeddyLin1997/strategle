import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import Big from 'big.js'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import LoadingFullscreen from '@/components/loading-fullscreen'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import useLoading from '@/hooks/useLoading'
import { formatNumber, truncateSlice } from '@/utils'
import Actions from './actions'
import TxHistory from './tx-history'
import EarnMachine from './earn-machine'
import useSWR from 'swr'
import { fetcherData } from '@/service/api-request'

const perSecondReward = Big(0.12).div(365).div(24).div(60).div(60)

interface PortfolioProps {
  handleTab: () => void
  protocolInfo: {
    totalStake: string
    totalMint: string
    treasuryAmount: string
    startTime: number
  }
}

const initStaker = {
  stakingBalance: '',
  rewardUpdateTime: 0,
  reward: '',
}

const Portfolio = ({ protocolInfo, handleTab }: PortfolioProps) => {
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

  const isStarted = protocolInfo.startTime !== 0

  // STRAG token info
  const { isSigner, account, provider, chainId } = WalletContainer.useContainer()
  const { isSupportChain, STRAGContract, STRAGContractBindWallet } = ContractContainer.useContainer()

  const [stragBalance, setStragBalance] = useState('')
  const [staker, setStaker] = useState(initStaker)

  useEffect(() => {
    if (!account) return

    setStragBalance('')
    setStaker({ ...initStaker })

    STRAGContract.balanceOf(account).then(res => setStragBalance(res))
    STRAGContract.stakers(account).then(res => {
      setStaker({
        stakingBalance: res[0],
        rewardUpdateTime: Number(Big(res[1]).toString()),
        reward: res[2],
      })
    })
  }, [account, provider, chainId])

  const rewards = useMemo(() => {
    if (!isStarted) return 0

    const elapsedTime = (Date.now() / 1000) - staker.rewardUpdateTime
    const stakingBalance = staker.stakingBalance ? ethers.formatEther(staker.stakingBalance) : 0
    const calcedReward = ethers.formatUnits(staker.reward || 0, 6)
    const newRewards = Big(stakingBalance).mul(elapsedTime).mul(perSecondReward).add(calcedReward).toFixed(4)
    return newRewards
  }, [staker, isStarted])

  const claimRewards = async () => {
    if (!isSupportChain) return toast.error('Currency network is not supported.')
    if (!isSigner) return toast.error('Wallet is not connected.')

    try {
      load()

      const tx = await STRAGContractBindWallet.claimRewards()
      toast.success('Claim Reward Success.')
      unload()

      await tx.wait()
      setTimeout(() => updateTxns(), 5000)
    } catch (err: any) {
      toast.error(err.reason)
      unload()
    }
  }
  // transactions event
  const { data: transactionEvents = [], mutate: updateTxns } = useSWR(`/api/protocol/transaction/${account || ethers.ZeroAddress}`, fetcherData)

  return (
    <div>
      <div className="mb-8 flex items-center gap-4 font-bold text-3xl">
        <ArrowBack onClick={handleTab} className="cursor-pointer" />
        <span>Portfolio</span>
      </div>

      <section className="mb-8 flex gap-4">
        {/* earn machine animation */}
        <EarnMachine stakingBalance={isStarted ? staker.stakingBalance || '0' : '0'} />


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
              <div className="ml-8 font-bold text-lg text-primary-light">$ {stragBalance ? formatNumber(ethers.formatEther(stragBalance)) : '-'} STRAG</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- Staking STRAG Amount : </div>
              <div className="ml-8 font-bold text-lg text-primary-light">$ {staker.stakingBalance ? formatNumber(ethers.formatEther(staker.stakingBalance)) : '-'} STRAG</div>
            </article>

            <article className="mb-2">
              <div className="mb-1">- Expected Rewards / Year : </div>
              <div className="ml-8 font-bold text-lg text-up"> $ {staker.stakingBalance ? formatNumber(String(Number(ethers.formatEther(staker.stakingBalance)) * 0.12)) : '-'} USDT</div>
            </article>
          </section>
        </div>

      </section>

      <section className="mb-14 flex flex-col justify-center">
        { isStarted &&
          <div className="mb-6 text-center font-bold text-3xl">
            <span>Rewards : </span>
            <span className="text-up">{staker.stakingBalance ? rewards : '-'} USDT</span>
          </div>
        }

        { !isStarted &&
          <div className="my-6 text-center font-bold text-3xl text-down">
            <div>At the fundraising stage ,</div>
            <div>Profit-Sharing plan has not yet commenced.</div>
          </div>
        }

        <div ref={claimEl} className="w-full flex justify-center">
          <Button variant="contained" disabled={!isStarted} className={ !isStarted ? '!bg-gray-1' : '' } onClick={claimRewards}>Claim Rewards</Button>
        </div>
      </section>

      <hr className="mb-8 md:mb-10 border-gray-1" />

      <section className="mb-10 flex flex-wrap md:flex-nowrap gap-6">
        <Actions ref={actionEl} update={() => updateTxns()} />

        <TxHistory transactionList={transactionEvents} />
      </section>

      <LoadingFullscreen open={isLoading} />
    </div>
  )
}

export default Portfolio
