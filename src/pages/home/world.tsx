import { useMemo } from 'react'
import WorldMap from '@/components/svgs/world-map'
import * as S from './world.style'

const WorldStockIndex = () => {

  const countriesStockData = useMemo(() => [
    { country: 'US', label: 'S&P 500', symbol: '^GSPC' ,value: 1, change: -4.6 },
    { country: 'US', label: 'Nasdaq', symbol: '^IXIC' ,value: 1, change: -4.6 },
    { country: 'US', label: 'Dow 30', symbol: '^DJI' ,value: 1, change: -4.6 },
    { country: 'US', label: 'SOX', symbol: '^SOX' ,value: 1, change: -4.6 },
    { country: 'CN', label: 'SSE', symbol: '000001.SS' ,value: 1, change: 5.2 },
    { country: 'JP', label: 'Nikkei', symbol: '^N225' ,value: 1, change: 10.2 },
    { country: 'GB', label: 'FTSE', symbol: '^FTSE' ,value: 1, change: 0.3 },
    { country: 'CA', label: 'aaa', symbol: '' ,value: 1, change: -3 },
    { country: 'IN', label: 'India', symbol: '^BSESN' ,value: 1, change: 30.1 },
    { country: 'TW', label: 'TWII', symbol: '^TWII' ,value: 1, change: 7.2 },
    { country: 'FR', label: 'CAC', symbol: '^FCHI' ,value: 1, change: 5.6 },
    { country: 'DE', label: 'DAX', symbol: '^GDAXI' ,value: 1, change: -1.1 },
    { country: 'KR', label: 'KOSPI', symbol: '^KS11' ,value: 1, change: -0.3 },
    { country: 'AU', label: 'aaa', symbol: '' ,value: 1, change: -1.5 },
    { country: 'RU', label: 'Russell', symbol: 'RTSI' ,value: 1, change: 2.2 },
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

