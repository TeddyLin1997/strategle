import { formatNumber, truncateSlice } from '@/utils'
import { ethers } from 'ethers'
import LinkIcon from '@/assets/icons/external-link.svg?react'
import MintIcon from '@/assets/icons/event-mint.svg?react'
import StakeIcon from '@/assets/icons/event-stake.svg?react'
import UnstakeIcon from '@/assets/icons/event-withdraw.svg?react'
import ClaimIcon from '@/assets/icons/event-claim.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import Copy from '@/components/copy'
import dayjs from 'dayjs'

enum Event {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
  ClaimRewards = 'ClaimRewards'
}

const eventMap = {
  [Event.Mint]: {
    value: (event: Transaction) => formatNumber(ethers.formatEther(event.value)),
    icon: <div className="mr-2 w-8 h-8 flex bg-[#F9BCC0] rounded-full"><MintIcon className="m-auto w-6 h-6 fill-[#DF1522]" /></div>,
    unit: 'STRAG',
  },
  [Event.Stake]: {
    value: (event: Transaction) => formatNumber(ethers.formatEther(event.value)),
    icon: <div className="mr-2 w-8 h-8 flex bg-secondary-light rounded-full"><StakeIcon className="m-auto w-7 h-7 fill-secondary" /></div>,
    unit: 'STRAG',
  },
  [Event.Unstake]: {
    value: (event: Transaction) => formatNumber(ethers.formatEther(event.value)),
    icon: <div className="mr-2 w-8 h-8 flex bg-down-extend rounded-full"><UnstakeIcon className="m-auto w-5 h-5 fill-down" /></div>,
    unit: 'STRAG',
  },
  [Event.ClaimRewards]: {
    value: (event: Transaction) => formatNumber(ethers.formatEther(event.value)),
    icon: <div className="mr-2 w-8 h-8 flex bg-up-extend rounded-full"><ClaimIcon className="m-auto w-6 h-6 fill-up" /></div>,
    unit: 'USDT',
  },
}

interface EventTransactionCardProps {
  event: Transaction
}

const EventTransactionCard = ({ event }: EventTransactionCardProps) => {

  return (
    <div className="mb-2 px-3 py-2 rounded border border-gray-1 text-sm shadow-lg">
      <div className="mb-2 flex items-center">
        { eventMap[event.event]?.icon || '-' }
        <span className="font-bold text-lg">{event.event}</span>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <TimeIcon className="w-4 h-4 fill-primary-light" />
          <span className="font-bold">{dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss') || '-'}</span>
        </div>
      </div>

      <div className="h-[48px] flex items-end">
        <div>
          <div className="mb-2 font-bold flex gap-2">
            <span>{`Address : ${truncateSlice(event.from)}` }</span>
            <Copy text={event.from} />
          </div>
          <div className="font-bold flex gap-2">
            <span>Tx Hash : {truncateSlice(event.transactionHash)}</span>
            <Copy text={event.transactionHash} />
          </div>
        </div>

        <div className="ml-auto text-right">
          <div className="mb-2 font-bold text-tertiary">{`${eventMap[event.event]?.value(event)} ${eventMap[event.event]?.unit}`}</div>
          <a href={`https://arbiscan.io/tx/${event.transactionHash}`} target="__blank" className="flex justify-end items-center gap-1 hover:opacity-60 transition-all">
            <span  className="text-xs" >View on Scan</span>
            <LinkIcon className="mb-1 w-4 h-4 fill-primary-light" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default EventTransactionCard
