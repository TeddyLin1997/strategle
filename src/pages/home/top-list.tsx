import { getChangeColor } from '@/utils'
import * as S from './top-list.style'
import { HTMLAttributes } from 'react'

type TopItem = {
  name: string
  icon: string
  price: number
  open: number
}

const stockList = [
  { name: 'Apple', price: 240, open: 172, icon: '' },
  { name: 'Microsoft', price: 178, open: 172, icon: '' },
  { name: 'Google', price: 162, open: 172, icon: '' },
  { name: 'Amazon', price: 178, open: 172, icon: '' },
  { name: 'Nvidia', price: 178, open: 172, icon: '' },
  { name: 'Tesla', price: 133, open: 172, icon: '' },
  { name: 'Meta', price: 178, open: 172, icon: '' },
  { name: 'Netflix', price: 180, open: 172, icon: '' },
  { name: 'Snowflake', price: 178, open: 172, icon: '' },
  { name: 'Spotify', price: 178, open: 172, icon: '' },
]

const cryptoList = [
  { name: 'BTC', price: 26009.16, open: 15992.1, icon: '' },
  { name: 'ETH', price: 1646.3, open: 1652.5, icon: '' },
  { name: 'BNB', price: 216.58, open: 220, icon: '' },
  { name: 'XRP', price: 0.5242, open: 0.52, icon: '' },
  { name: 'ADA', price: 0.2605, open: 0.2597, icon: '' },
  { name: 'DOGE', price: 0.06274, open: 0.6274, icon: '' },
  { name: 'SOL', price: 20.1, open: 20.20, icon: '' },
  { name: 'TRX', price: 0.0774, open: 0.072, icon: '' },
  { name: 'DOT', price: 4, open: 5.2, icon: '' },
  { name: 'MATIC', price: 0.8, open: 0.54, icon: '' },
]

interface TopListProps extends HTMLAttributes<HTMLDivElement> {
  list: Array<TopItem>
}

const TopSection = ({ title,  list, ...props }: TopListProps) => {
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
        const change = Number(item.price - item.open)
        const percent = (100 * change / Number(item.open)).toFixed(2)
        const color = { color: getChangeColor(change) }
        return (
          <S.TopItem key={item.name}>
            <img className="top-icon" src={item.icon} />
            <div className="top-name">{item.name}</div>
            <div className="top-price" style={color}>{item.price}</div>
            <div className="top-change-percent" style={color}>{`${percent}%`}</div>
          </S.TopItem>
        )
      })}
    </S.TopList>
  )
}

const TopList = () => {
  return (
    <S.Container>
      <S.TopContainer>
        <TopSection title="美股 TOP10" list={stockList} style={{ marginRight: '64px' }} />
        <TopSection title="加密貨幣 TOP10" list={cryptoList} />
      </S.TopContainer>
    </S.Container>
  )
}

export default TopList
