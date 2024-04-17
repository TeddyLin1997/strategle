import { formatNumber, getChangeColor } from '@/utils'
import { HTMLAttributes } from 'react'
import Big from 'big.js'
import up from '@/assets/images/up.png'
import down from '@/assets/images/down.png'
import MarketContainer from '@/context/marketContext'
import Skeleton from '@mui/material/Skeleton'
import styled from 'styled-components'

const Background = styled.div<{ $isup?: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  animation: tick .6s linear;
  animation-fill-mode: forwards;
  background-color: ${ props => props.$isup ? '#D0F2F2' : '#FFE2E2' };
  z-index: 0;
  pointer-events: none;

  @keyframes tick {
    to {
      background-color: transparent;
    }
  }
`


interface TopListProps extends HTMLAttributes<HTMLDivElement> {
  list: Array<TopItem>
}

const TopSection = ({ title,  list = [] }: TopListProps) => {
  const { ticker } = MarketContainer.useContainer()

  return (
    <section className="w-full sm:w-1/2">
      <div className="px-4 pb-5 font-extrabold text-3xl sm:text-2xl text-center sm:text-left">{title}</div>

      <section key="header" className="mb-3 px-4 relative w-full h-5 flex items-center gap-3 text-sm text-[#81858c] font-bold rounded">
        <div className="w-8 h-auto rounded-full z-0" />
        <div className="flex-1">Name</div>
        <div className="w-1/3">Latest Price</div>
        <div className="ml-auto w-1/4 flex justify-end items-center">Change (%)</div>
      </section>

      { list.length == 0 && Array.from(Array(10)).map((_, index) => (
        <article key={index} className="mb-3 py-3 px-4 relative w-full h-14 flex items-center gap-3 font-bold rounded-md overflow-hidden cursor-pointer hover:!bg-[#fff6d8] z-0">
          <Skeleton variant="circular" className="w-8 !h-8" />
          <Skeleton variant="text" className="flex-1" />
          <Skeleton variant="text" className="w-1/3" />
          <Skeleton variant="text" className="ml-auto w-1/4" />
        </article>
      ))
      }

      {list.length > 0 && list.map(item => {
        const price = new Big(ticker[item.symbol]?.price || 0)
        const open = new Big(ticker[item.symbol]?.open || 0)
        const change = price.minus(open)
        const isUp = change.toNumber() >= 0
        const percent = change.times(100).div(open.toNumber() ? open : new Big(1)).toString()
        const color = { color: getChangeColor(change.toNumber()) }
        return (
          <article
            key={item.name}
            className="mb-3 py-3 px-4 relative w-full h-14 flex items-center font-bold rounded-md overflow-hidden cursor-pointer hover:!bg-[#fff6d8] z-0"
            onClick={() => window.open(item.url)}
          >
            <img className="mr-3 w-8 h-auto rounded-full" src={item.icon} />
            <div className="flex-1">{item.name}</div>
            <div className="w-1/3" style={color}>{price.toNumber() ? formatNumber(price.toString()) : '-' }</div>
            <div className="ml-auto w-1/4 flex justify-end items-center" style={color}>
              <span>{`${change.toNumber() > 0 ? '+' : ''}${formatNumber(percent, 2)}%`}</span>
              <img className="ml-2 w-5 h-auto" src={isUp ? up : down} />
            </div>
            <Background $isup={isUp ? 1 : 0} key={`${item.name}-${price}`} />
          </article>
        )
      })}
    </section>
  )
}

const TopList = ({ cryptoList = [], usStockList = [] }) => {
  return (
    <div className="m-auto p-4 max-w-screen-lg">
      <section className="flex gap-6 flex-wrap sm:flex-nowrap">
        <TopSection title="US stocks TOP 10" list={usStockList} style={{ marginRight: '6%' }} />
        <TopSection title="Crypto TOP 10" list={cryptoList} />
      </section>
    </div>
  )
}

export default TopList
