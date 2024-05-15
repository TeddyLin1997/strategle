import { formatNumber, truncateSlice } from '@/utils'
import { ethers } from 'ethers'
import ReceiveIcon from '@/assets/images/receive-arrow.png'
import SendIcon from '@/assets/images/send-arrow.png'
import LinkIcon from '@/assets/icons/external-link.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

interface TransactionCardTreasuryProps {
  event: Transaction
}

const TransactionCardTreasury = ({ event }: TransactionCardTreasuryProps) => {
  const isReceive = event.event === 'Deposit'

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`Copied : ${text}`, { style: { wordBreak: 'break-all' }}))
  }

  return (
    <div className="mb-2 px-3 py-2 rounded border border-gray-1 text-sm shadow-lg">
      <div className="mb-2 flex items-center">
        <div className="py-1">
          <img src={isReceive ? ReceiveIcon : SendIcon} className="mr-2 w-6 h-6 bg-white rounded-full" style={{ transform: isReceive ? 'rotate(90deg)' : 'roatte(0deg)' }} />
        </div>
        <span className="font-bold text-lg">{event.event}</span>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <TimeIcon className="w-4 h-4 fill-primary-light" />
          <span className="font-bold">{ dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss') || '-' }</span>
          <a href={`https://arbiscan.io/tx/${event.transactionHash}`} target="__blank" className="flex justify-end items-center gap-1 hover:opacity-60 transition-all">
            <LinkIcon className="mb-1 w-4 h-4 fill-primary-light" />
          </a>
        </div>
      </div>

      <div className="h-[48px] flex items-end">
        <div>
          <div className="mb-2 font-bold flex gap-2 cursor-pointer hover:text-primary" onClick={() => copyToClipboard(isReceive ? event.from : event.to)}>
            <span>TxHash : </span>
            <span className="whitespace-nowrap">
              {truncateSlice(event.transactionHash)} &nbsp;
            </span>
          </div>

          <div className="font-bold flex flex-wrap gap-2 cursor-pointer hover:text-primary" onClick={() => copyToClipboard(isReceive ? event.from : event.to)}>
            <span>{ isReceive ? 'From :' : 'To :' }</span>
            <span className="whitespace-nowrap">
              {isReceive ? truncateSlice(event.from) : truncateSlice(event.to)} &nbsp;
            </span>
          </div>
        </div>

        <div className="ml-auto text-right">
          <div className={isReceive ? 'text-lg font-bold text-up' : 'text-lg font-bold text-down'}>{formatNumber(ethers.formatUnits(event.value, 6))} U</div>
        </div>
      </div>
    </div>
  )
}

export default TransactionCardTreasury
