import { formatNumber, truncateSlice } from '@/utils'
import { ethers, EventLog } from 'ethers'
import ReceiveIcon from '@/assets/images/receive-arrow.png'
import SendIcon from '@/assets/images/send-arrow.png'
import LinkIcon from '@/assets/icons/external-link.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import Copy from '@/components/copy'
import dayjs from 'dayjs'
import WalletContainer from '@/context/walletContext'
import { useEffect, useState } from 'react'
import ContractContainer from '@/context/contractContext'

interface TransactionCardTreasuryProps {
  event: EventLog
}

const TransactionCardTreasury = ({ event }: TransactionCardTreasuryProps) => {
  const { provider } = WalletContainer.useContainer()
  const { STRAG_ADDRESS } = ContractContainer.useContainer()

  // block timestamp
  const [blockTimestamp, setBlockTimestamp] = useState(0)

  useEffect(() => {
    getBlockTimestamp(event.blockHash)
  }, [event.blockHash])

  const getBlockTimestamp = async (blockHash: string) => {
    const block = await provider.getBlock(blockHash)
    setBlockTimestamp(block?.timestamp || 0)
  }

  const isReceive = STRAG_ADDRESS === event.args[1]

  return (
    <div className="mb-2 px-3 py-2 rounded border border-gray-1 text-sm shadow-lg">
      <div className="mb-2 flex items-center">
        <div className="py-1">
          <img src={isReceive ? ReceiveIcon : SendIcon} className="mr-2 w-6 h-6 bg-white rounded-full" style={{ transform: isReceive ? 'rotate(90deg)' : 'roatte(0deg)' }} />
        </div>
        <span className="font-bold text-lg">{ isReceive ? 'Deposit' : 'withdraw' }</span>
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-secondary">
          <TimeIcon className="w-4 h-4 fill-primary-light" />
          <span className="font-bold">{blockTimestamp ? dayjs(blockTimestamp * 1000).format('YYYY-MM-DD HH:mm:ss') : '-' }</span>
        </div>
      </div>

      <div className="h-[48px] flex items-end">
        <div>
          <div className="mb-2 font-bold flex gap-2">
            <span>{ isReceive ? 'From :' : 'To :' }</span>
            <span className="whitespace-nowrap">
              {isReceive ? truncateSlice(event.args[0]) : truncateSlice(event.args[1])} &nbsp;
              <Copy text={isReceive ? event.args[0] : event.args[1]} />
            </span>
          </div>
          <div className="font-bold flex flex-wrap gap-2">
            <span>Tx Hash : </span>
            <span className="whitespace-nowrap">
              {truncateSlice(event.transactionHash)} &nbsp;
              <Copy text={event.transactionHash} />
            </span>
          </div>
        </div>

        <div className="ml-auto text-right">
          <div className={isReceive ? 'text-lg font-bold text-up' : 'text-lg font-bold text-down'}>{formatNumber(ethers.formatEther(event.args[2]))} U</div>
          <a href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`} target="__blank" className="flex justify-end items-center gap-1 hover:opacity-60 transition-all">
            <span  className="text-xs" >View on Scan</span>
            <LinkIcon className="w-4 h-4 fill-primary-light" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TransactionCardTreasury
