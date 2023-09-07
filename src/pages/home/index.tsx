import { useMemo } from 'react'
import useSWR from 'swr'
import WorldStockIndex from './world/world'
import TopList from './top-list'
import Commodity from './commodity'
// import LatestNews from './latest-news'
import { Button } from '@mui/material'
import { fetcher } from '@/service/api-request'
import tradeBusinessImg from '@/assets/images/trade-business.png'
import * as S from './index.style'

const Home = () => {
  const { data: indexList } = useSWR('/home/index_list', fetcher)
  const { data: topList } = useSWR('/home/top_list', fetcher)
  const { data: commodityList } = useSWR('/home/commodity_list', fetcher)

  const homeLists = useMemo(() => ({
    index: indexList || [] as WorldIndex[],
    crypto: topList?.crypto || [] as TopItem[],
    usStock: topList?.usStock || [] as TopItem[],
    commodity: commodityList || [] as Commodity[],
  }), [topList, indexList, commodityList])

  return (
    <S.Wrapper>
      <WorldStockIndex indexList={homeLists.index} />
      <TopList cryptoList={homeLists.crypto} usStockList={homeLists.usStock} />
      <Commodity commodityList={homeLists.commodity} />
      {/* <LatestNews /> */}

      <S.StartTrade>
        <div className="container">
          <div className="button">
            <div className="tip">Embark on Your Trade Journey Today!</div>
            <Button variant="contained" size="large">Start Trade</Button>
          </div>
          <img className="img" src={tradeBusinessImg} alt="" />
        </div>
      </S.StartTrade>
    </S.Wrapper>
  )
}

export default Home
