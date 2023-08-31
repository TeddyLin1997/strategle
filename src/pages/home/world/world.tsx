import { useState, useMemo, useEffect, useRef } from 'react'
import { useMarket } from '@/hooks/useMarket'
import WorldMap from './world-map'
import CoordinatePoint from './coordinate-point'
import * as S from './world.style'
import { formatNumber, getChangeColor } from '@/utils'
import Big from 'big.js'

const WorldStockIndex = ({ indexList }) => {
  const { ticker } = useMarket()

  // active country
  const [activeCountry, setActiveCountry] = useState('')
  const activeCountries = useMemo(() => (
    indexList.filter(item => item.country === activeCountry)
  ),[activeCountry, indexList])

  // point
  const initPoint = { x: 0, y: 0 }
  const [point, setPoints] = useState(initPoint)
  const worldContainer = useRef<HTMLDivElement>(null)

  const reset = () => {
    setPoints(initPoint)
    setActiveCountry('')
  }

  useEffect(() => {
    window.addEventListener('resize', reset)
    return () => window.removeEventListener('resize', reset)
  }, [])

  const handleClick = event => {
    if (
      !worldContainer.current ||
      !indexList.some(item => item.country === event.target.id)
    ) return reset()

    const containerRect = worldContainer.current.getBoundingClientRect()
    const x = event.clientX - containerRect.left
    const y = event.clientY - containerRect.top - 14

    setActiveCountry(event.target.id)
    setPoints({ x, y })
  }

  return (
    <S.StockIndex>
      <S.Container>
        <S.WorldMap ref={worldContainer} className="world-container" onClick={handleClick}>
          <CoordinatePoint x={point.x} y={point.y} list={activeCountries} />
          <WorldMap countriesData={indexList} activeCountry={activeCountry} />
        </S.WorldMap>

        <S.IndexList>
          {indexList.map(item => {
            const price = new Big(ticker[item.symbol]?.price || 0)
            const open = new Big(ticker[item.symbol]?.open || 1)
            const change = price.minus(open)
            const changePercent = change.times(100).div(open)
            const isUp = change.toNumber() >= 0

            return (
              <div className="index-item" key={item.symbol}>
                <div style={{ marginRight: '0.6rem' }}>{item.name}</div>
                <div style={{ color: getChangeColor(change.toNumber()) }}>
                  { ticker[item.symbol] ?
                    <>
                      <span>{formatNumber(price.toString(), 2)}</span> &nbsp;
                      <span style={{ whiteSpace: 'nowrap' }}>
                        {`(${isUp ? '+' : '' }${formatNumber(changePercent.toString(), 2)}%) ${isUp ? '↑' : '↓'}`}
                      </span>
                    </>
                    : '-'
                  }
                </div>
              </div>
            )
          })}
        </S.IndexList>
      </S.Container>
    </S.StockIndex>
  )
}

export default WorldStockIndex

