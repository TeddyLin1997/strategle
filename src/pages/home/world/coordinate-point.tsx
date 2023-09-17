import { useMarket } from '@/hooks/useMarket'
import { formatNumber, getChangeColor } from '@/utils'
import styled, { keyframes } from 'styled-components'
import Big from 'big.js'

const fadeInUp = keyframes`
  0% {
    transform: translate(-50%, -30%) scale(0.1);
  }
  100% {
    transform: translate(-50%, -100%) scale(1);
  }
`

const PointWrapper = styled.div<{ x: number, y: number }>`
  padding: .25rem 0.6rem;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  animation: ${fadeInUp} 0.25s ease-in-out forwards;
  z-index: 110;

  width: fit-content;
  white-space: nowrap;
  min-width: 7rem;
  background-color: #1212149a;
  border-radius: 4px;
  pointer-events: none;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
    border-top: .6rem solid #1212149a;
    top: 98%;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const IndexItem = styled.div`
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  color: #fff;

  & > div + div {
    margin-left: .8rem;
  }
`

interface CoordinatePointProps {
  list: any[]
  x: number
  y: number
}

const CoordinatePoint = ({ x, y, list }: CoordinatePointProps) => {
  const isDisplay = x !== 0 && y !== 0
  const { ticker } = useMarket()

  return isDisplay ? (
    <PointWrapper key={`x:${x},y:${y}`} x={x} y={y}>
      {list.map(item => {
        const price = new Big(ticker[item.symbol]?.price || 0)
        const open = new Big(ticker[item.symbol]?.open || 1)
        const change = price.minus(open)
        const changePercent = change.times(100).div(open)
        const isUp = change.toNumber() >= 0
        return (
          <IndexItem key={item.symbol}>
            <div>{`${item.name}`}</div>
            <div style={{ color: getChangeColor(change.toNumber()) }}>
              <span className="index-price">{formatNumber(price.toString(), 2)}</span>
              {` (${isUp ? '+' : '' }${formatNumber(changePercent.toString(), 2)}%) ${isUp ? '↑' : '↓'}`}
            </div>
          </IndexItem>
        )
      })}
    </PointWrapper>) : null
}

export default CoordinatePoint
