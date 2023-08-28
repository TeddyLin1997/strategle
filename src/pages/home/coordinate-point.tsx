import { getChangeColor } from '@/utils'
import styled, { keyframes } from 'styled-components'

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

  return isDisplay ? (
    <PointWrapper key={`x:${x},y:${y}`} x={x} y={y}>
      {list.map(item => {
        const isUp = item.change >= 0
        return (
          <IndexItem key={item.symbol}>
            <div>{`${item.label}`}</div>
            <div style={{ color: getChangeColor(item.change) }}>{`${item.price} ${isUp ? '↑' : '↓'}`}</div>
          </IndexItem>
        )
      })}
    </PointWrapper>) : null
}

export default CoordinatePoint
