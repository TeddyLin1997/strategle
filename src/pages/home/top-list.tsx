import { getChangeColor } from '@/utils'
import * as S from './top-list.style'
import btcIcon from '@/assets/images/crypto/bitcoin.png'
import ethIcon from '@/assets/images/crypto/ethereum.png'
import bnbIcon from '@/assets/images/crypto/bnb.png'
import xrpIcon from '@/assets/images/crypto/xrp.png'
import adaIcon from '@/assets/images/crypto/ada.png'
import dogeIcon from '@/assets/images/crypto/doge.png'
import solIcon from '@/assets/images/crypto/sol.png'
import trxIcon from '@/assets/images/crypto/trx.png'
import dotIcon from '@/assets/images/crypto/dot.png'
import maticIcon from '@/assets/images/crypto/polygon.png'

import aaplIcon from '@/assets/images/usstock/aapl.png'
import msftIcon from '@/assets/images/usstock/msft.png'
import googicon from '@/assets/images/usstock/goog.png'
import amznIcon from '@/assets/images/usstock/amzn.png'
import nvdaIcon from '@/assets/images/usstock/nvda.png'
import tslaIcon from '@/assets/images/usstock/tsla.png'
import metaIcon from '@/assets/images/usstock/meta.png'
import nflxIcon from '@/assets/images/usstock/nflx.png'
import snowIcon from '@/assets/images/usstock/snow.png'
import spotIcon from '@/assets/images/usstock/spot.png'
import { HTMLAttributes } from 'react'

type TopItem = {
  name: string
  icon: string
  price: number
  open: number
}

const stockList = [
  { name: 'Apple', price: 240, open: 172, icon: aaplIcon },
  { name: 'Microsoft', price: 178, open: 172, icon: msftIcon },
  { name: 'Google', price: 162, open: 172, icon: googicon },
  { name: 'Amazon', price: 178, open: 172, icon: amznIcon },
  { name: 'Nvidia', price: 178, open: 172, icon: nvdaIcon },
  { name: 'Tesla', price: 133, open: 172, icon: tslaIcon },
  { name: 'Meta', price: 178, open: 172, icon: metaIcon },
  { name: 'Netflix', price: 180, open: 172, icon: nflxIcon },
  { name: 'Snowflake', price: 178, open: 172, icon: snowIcon },
  { name: 'Spotify', price: 178, open: 172, icon: spotIcon },
]

const cryptoList = [
  { name: 'BTC/USDT', price: 26009.16, open: 15992.1, icon: btcIcon },
  { name: 'ETH/USDT', price: 1646.3, open: 1652.5, icon: ethIcon },
  { name: 'BNB/USDT', price: 216.58, open: 220, icon: bnbIcon },
  { name: 'XRP/USDT', price: 0.5242, open: 0.52, icon: xrpIcon },
  { name: 'ADA/USDT', price: 0.2605, open: 0.2597, icon: adaIcon },
  { name: 'DOGE/USDT', price: 0.06274, open: 0.6274, icon: dogeIcon },
  { name: 'SOL/USDT', price: 20.1, open: 20.20, icon: solIcon },
  { name: 'TRX/USDT', price: 0.0774, open: 0.072, icon: trxIcon },
  { name: 'DOT/USDT', price: 4, open: 5.2, icon: dotIcon },
  { name: 'MATIC/USDT', price: 0.8, open: 0.54, icon: maticIcon },
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
        <TopSection title="美股 TOP10" list={stockList} style={{ marginRight: '6%' }} />
        <TopSection title="加密貨幣 TOP10" list={cryptoList} />
      </S.TopContainer>
    </S.Container>
  )
}

export default TopList
