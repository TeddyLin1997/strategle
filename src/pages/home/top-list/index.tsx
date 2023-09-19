import { formatNumber, getChangeColor } from '@/utils'
import * as S from './index.style'
import { HTMLAttributes } from 'react'
import { useMarket } from '@/hooks/useMarket'
import Big from 'big.js'
import up from '@/assets/images/up.png'
import down from '@/assets/images/down.png'

interface TopListProps extends HTMLAttributes<HTMLDivElement> {
  list: Array<TopItem>
}

const TopSection = ({ title,  list = [], ...props }: TopListProps) => {
  const { ticker } = useMarket()

  return (
    <S.TopList {...props}>
      <div className="title">{title}</div>

      <S.TopItem key="header" className="header">
        <div className="top-icon" />
        <div className="top-name">Name</div>
        <div className="top-price">Latest Price</div>
        <div className="top-change-percent">Change (%)</div>
      </S.TopItem>

      {list.map(item => {
        const price = new Big(ticker[item.symbol]?.price || 0)
        const open = new Big(ticker[item.symbol]?.open || 0)
        const change = price.minus(open)
        const isUp = change.toNumber() >= 0
        const percent = change.times(100).div(open.toNumber() ? open : new Big(1)).toString()
        const color = { color: getChangeColor(change.toNumber()) }
        return (
          <S.TopItem key={item.name} $isup={isUp ? 1 : 0}>
            <img className="top-icon" src={item.icon} />
            <div className="top-name">{item.name}</div>
            <div className="top-price" style={color}>{price.toNumber() ? formatNumber(price.toString()) : '-' }</div>
            <div className="top-change-percent" style={color}>
              <span>{`${change.toNumber() > 0 ? '+' : ''}${formatNumber(percent, 2)}%`}</span>
              <img className="top-flag" src={isUp ? up : down} />
            </div>
            <div className="background" key={`${item.name}-${price}`} />
          </S.TopItem>
        )
      })}
    </S.TopList>
  )
}

const TopList = ({ cryptoList = [], usStockList = [] }) => {
  return (
    <S.Container>
      <S.TopContainer>
        <TopSection title="US stocks TOP 10" list={usStockList} style={{ marginRight: '6%' }} />
        <TopSection title="Crypto TOP 10" list={cryptoList} />
      </S.TopContainer>
    </S.Container>
  )
}

export default TopList
