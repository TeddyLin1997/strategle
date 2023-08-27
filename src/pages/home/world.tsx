import { useMemo } from 'react'
import WorldMap from '@/components/svgs/world-map'
import * as S from './world.style'

const WorldStockIndex = () => {

  const countriesStockData = useMemo(() => [
    { country: 'US', value: -4.6 },
    { country: 'CN', value: 5.2 },
    { country: 'JP', value: 10.2 },
    { country: 'GB', value: 0.3 },
    { country: 'CA', value: -3 },
    { country: 'CN', value: -2 },
    { country: 'IN', value: 30.1 },
    { country: 'TW', value: 7.2 },
    { country: 'FR', value: 5.6 },
    { country: 'DE', value: -1.1 },
    { country: 'KR', value: -0.3 },
    { country: 'AU', value: -1.5 },
    { country: 'RU', value: 2.2 },
  ]
  , [])

  return (
    <div>
      <S.StockIndex>

        <S.Container>
          <div className="world-map">
            <WorldMap countriesData={countriesStockData} />
          </div>

          <div className="index-list">

          </div>
        </S.Container>

      </S.StockIndex>
    </div>
  )
}

export default WorldStockIndex

