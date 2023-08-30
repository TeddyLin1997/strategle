import { useState, useMemo, useEffect, useRef } from 'react'
import WorldMap from '@/components/svgs/world-map'
import CoordinatePoint from './coordinate-point'
import { useMarket } from '@/hooks/useMarket'
import * as S from './world.style'

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
          <WorldMap countriesData={indexList} activeCountry={activeCountry} ticker={ticker} />
        </S.WorldMap>

        <S.IndexList>
          {indexList.map(item => {
            return (
              <div className="index-item" key={item.symbol}>
                <div className="index-item-name">{item.name}</div>
                <div className="index-item-price">{ticker[item.symbol]?.price || '-'}</div>
              </div>
            )
          })}
        </S.IndexList>
      </S.Container>
    </S.StockIndex>
  )
}

export default WorldStockIndex

