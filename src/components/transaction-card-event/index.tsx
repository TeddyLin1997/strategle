import { formatNumber, truncateSlice } from '@/utils'
import { ethers, EventLog } from 'ethers'
import LinkIcon from '@/assets/icons/external-link.svg?react'
import MintIcon from '@/assets/icons/event-mint.svg?react'
import StakeIcon from '@/assets/icons/event-stake.svg?react'
import UnstakeIcon from '@/assets/icons/event-unstake.svg?react'
import WithdrawIcon from '@/assets/icons/event-withdraw.svg?react'
import ClaimIcon from '@/assets/icons/event-claim.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import Copy from '@/components/copy'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import ContractContainer from '@/context/contractContext'

enum Event {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
  Withdraw = 'Withdraw',
  ClaimRewards = 'ClaimRewards'
}

const eventMap = {
  [Event.Mint]: {
    value: (event: EventLog) => formatNumber(ethers.formatEther(event.args[1])),
    icon: <div className="mr-2 w-8 h-8 flex bg-[#F9BCC0] rounded-full"><MintIcon className="m-auto w-6 h-6 fill-[#DF1522]" /></div>,
    unit: 'STRAG',
  },
  [Event.Stake]: {
    value: (event: EventLog) => formatNumber(ethers.formatEther(event.args[1])),
    icon: <div className="mr-2 w-8 h-8 flex bg-secondary rounded-full"><StakeIcon className="m-auto w-7 h-7 fill-secondary-light" /></div>,
    unit: 'STRAG',
  },
  [Event.Unstake]: {
    value: () => '-',
    icon: <div className="mr-2 w-8 h-8 flex bg-[#C8E2EC] rounded-full"><UnstakeIcon className="m-auto w-7 h-7 fill-[#30728C]" /></div>,
    unit: 'STRAG',
  },
  [Event.Withdraw]: {
    value: (event: EventLog) => formatNumber(ethers.formatEther(event.args[1])),
    icon: <div className="mr-2 w-8 h-8 flex bg-down-extend rounded-full"><WithdrawIcon className="m-auto w-5 h-5 fill-down" /></div>,
    unit: 'STRAG',
  },
  [Event.ClaimRewards]: {
    value: (event: EventLog) => formatNumber(ethers.formatEther(event.args[1])),
    icon: <div className="mr-2 w-8 h-8 flex bg-up-extend rounded-full"><ClaimIcon className="m-auto w-6 h-6 fill-up" /></div>,
    unit: 'USDT',
  },
}

interface EventTransactionCardProps {
  event: EventLog
}

const EventTransactionCard = ({ event }: EventTransactionCardProps) => {
  const { protocolProvider } = ContractContainer.useContainer()

  // block timestamp
  const [blockTimestamp, setBlockTimestamp] = useState(0)

  useEffect(() => {
    getBlockTimestamp(event.blockHash)
  }, [event.blockHash])

  const getBlockTimestamp = async (blockHash: string) => {
    const block = await protocolProvider.getBlock(blockHash)
    setBlockTimestamp(block?.timestamp || 0)
  }

  return (
    <div className="mb-2 px-3 py-2 rounded border border-gray-1 text-sm shadow-lg">
      <div className="mb-2 flex items-center">
        { eventMap[event.eventName]?.icon || '-' }
        <span className="font-bold text-lg">{event.eventName}</span>
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-secondary">
          <TimeIcon className="w-4 h-4 fill-primary-light" />
          <span className="font-bold">{blockTimestamp ? dayjs(blockTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss') : '-' }</span>
        </div>
      </div>

      <div className="h-[48px] flex items-end">
        <div>
          <div className="mb-2 font-bold flex gap-2">
            <span>{`Address : ${truncateSlice(event.address)}` }</span>
            <Copy text={event.address} />
          </div>
          <div className="font-bold flex gap-2">
            <span>Tx Hash : {truncateSlice(event.transactionHash)}</span>
            <Copy text={event.transactionHash} />
          </div>
        </div>

        <div className="ml-auto text-right">
          <div className="mb-2 font-bold text-secondary-light">{`${eventMap[event.eventName]?.value(event)} ${eventMap[event.eventName]?.unit}`}</div>
          <a href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`} target="__blank" className="flex justify-end items-center gap-1 hover:opacity-60 transition-all">
            <span  className="text-xs" >View on Scan</span>
            <LinkIcon className="w-4 h-4 fill-primary-light" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default EventTransactionCard
