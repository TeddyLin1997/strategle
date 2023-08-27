import { useMemo } from 'react'
import WorldMap from '@/components/svgs/world-map'
import * as S from './world.style'

const WorldStockIndex = () => {

  const countriesStockData = useMemo(() => [
    { country: 'US', label: 'S&P 500', symbol: '^GSPC' ,price: 4405.71, change: -4.6 },
    { country: 'US', label: 'Nasdaq', symbol: '^IXIC' ,price: 13590.65, change: -4.6 },
    { country: 'US', label: 'Dow 30', symbol: '^DJI' ,price: 34346.90, change: -4.6 },
    { country: 'US', label: 'SOX', symbol: '^SOX' ,price: 3495.65, change: -4.6 },
    { country: 'TW', label: '台灣', symbol: '^TWII' ,price: 16481.58, change: 7.2 },
    { country: 'CN', label: '上證', symbol: '000001.SS' ,price: 3064.07, change: 5.2 },
    { country: 'JP', label: '日本', symbol: '^N225' ,price: 31624.28, change: 10.2 },
    { country: 'KR', label: '韓國', symbol: '^KS11' ,price: 2519.14, change: -0.3 },
    { country: 'IN', label: '印度', symbol: '^BSESN' ,price: 64886.51, change: 30.1 },
    { country: 'GB', label: '英國', symbol: '^FTSE' ,price: 7338.58, change: 0.3 },
    { country: 'AU', label: '澳洲', symbol: '^AORD' ,price: 7332.60, change: -1.5 },
    { country: 'DE', label: '德國', symbol: '^GDAXI' ,price: 15631.82, change: -1.1 },
    { country: 'FR', label: '法國', symbol: '^FCHI' ,price: 7229.60, change: 5.6 },
    { country: 'CA', label: '加拿大', symbol: '^GSPTSE' ,price: 19835.8, change: -3 },
    { country: 'RU', label: '俄羅斯', symbol: 'RTSI' ,price: 1144.79, change: 2.2 },
  ]
  , [])

  return (
    <div>
      <S.StockIndex>

        <S.Container>
          <S.WorldMap>
            <WorldMap countriesData={countriesStockData} />
          </S.WorldMap>

          <S.IndexList>
            {countriesStockData.map(item => {
              return (
                <div className="index-item" key={item.symbol}>
                  <div className="index-item-name">{item.label}</div>
                  <div className="index-item-price">{item.price}</div>
                </div>
              )
            })}
          </S.IndexList>
        </S.Container>

      </S.StockIndex>
    </div>
  )
}

export default WorldStockIndex

