import { formatNumber, getChangeColor } from '@/utils'
import * as S from './top-list.style'
import { HTMLAttributes } from 'react'
import { useMarket } from '@/hooks/useMarket'
import Big from 'big.js'

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
        <div className="top-name">名稱</div>
        <div className="top-price">最新價格</div>
        <div className="top-change-percent">漲跌幅</div>
      </S.TopItem>

      {list.map(item => {
        const price = new Big(ticker[item.symbol]?.price || 0)
        const open = new Big(ticker[item.symbol]?.open || 0)
        const change = price.minus(open)
        const percent = change.times(100).div(open.toNumber() ? open : new Big(1)).toString()
        const color = { color: getChangeColor(change.toNumber()) }
        return (
          <S.TopItem key={item.name} isup={(change.toNumber() >= 0) ? 1 : 0}>
            <img className="top-icon" src={item.icon} />
            <div className="top-name">{item.name}</div>
            <div className="top-price" style={color}>{formatNumber(price.toString())}</div>
            <div className="top-change-percent" style={color}>{`${formatNumber(percent, 2)}%`}</div>
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
        <TopSection title="美股 TOP10" list={usStockList} style={{ marginRight: '6%' }} />
        <TopSection title="加密貨幣 TOP10" list={cryptoList} />
      </S.TopContainer>
    </S.Container>
  )
}

export default TopList
