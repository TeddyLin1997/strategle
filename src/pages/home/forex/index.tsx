import { useMemo } from 'react'
import Divider from '@mui/material/Divider'
import * as S from './index.style'
import { useMarket } from '@/hooks/useMarket'
import up from '@/assets/images/up.png'
import down from '@/assets/images/down.png'

const Forex = ({ forexList }) => {
  const { ticker } = useMarket()

  const forexListNode = useMemo(() => forexList.map(item => {
    const { price = 0, open = 0 } = ticker[item.symbol]
    const isUp = price >= open
    return (
      <S.Forex key={item.symbol} $isUp={isUp}>
        <img className="forex-icon" src={item.icon} />
        <div className="forex-name">{item.name}</div>
        <div className="forex-price">{Number(price).toFixed(5) || '-'}</div>
        <img className="forex-flag" src={isUp ? up : down} />
      </S.Forex>
    )
  }), [forexList])

  return (
    <S.Container>
      <Divider />

      <S.Title>Forex Exchange</S.Title>

      <S.ForexList>
        <div className="forex-group">
          {forexListNode.slice(0, 3)}
        </div>
        <Divider className="forex-divider" orientation="vertical" flexItem />
        <div className="forex-group">
          {forexListNode.slice(3, 6)}
        </div>
        <Divider className="forex-divider" orientation="vertical" flexItem />
        <div className="forex-group">
          {forexListNode.slice(6, 9)}
        </div>
      </S.ForexList>
    </S.Container>
  )
}

export default Forex
