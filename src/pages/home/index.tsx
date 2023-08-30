import { useMemo } from 'react'
import useSWR from 'swr'
import WorldStockIndex from './world'
import TopList from './top-list'
import Commodity from './commodity'
// import LatestNews from './latest-news'
import { Button } from '@mui/material'
import tradeBusinessImg from '@/assets/images/trade-business.png'
import * as S from './index.style'

const Home = () => {
  const { data: indexList } = useSWR('/api/home/index_list', (url) => fetch(url).then(res => res.json()).then(res => res.data))
  const { data: topList } = useSWR('/api/home/top_list', (url) => fetch(url).then(res => res.json()).then(res => res.data))
  // const { data: commodityList } = useSWR('/api/home/commodity_list', (url) => fetch(url).then(res => res.json()).then(res => res.data))

  const homeLists = useMemo(() => ({
    index: indexList || [] as WorldIndex[],
    crypto: topList?.crypto || [] as TopItem[],
    usStock: topList?.usStock || [] as TopItem[],
  }), [topList, indexList])

  return (
    <S.Wrapper>
      <WorldStockIndex indexList={homeLists.index} />
      <TopList cryptoList={homeLists.crypto} usStockList={homeLists.usStock} />
      <Commodity />
      {/* <LatestNews /> */}

      <S.StartTrade>
        <div className="container">
          <div className="button">
            <div className="tip">立即開啟您的交易之旅！</div>
            <Button variant="contained" size="large">開始交易</Button>
          </div>
          <img className="img" src={tradeBusinessImg} alt="" />
        </div>
      </S.StartTrade>
    </S.Wrapper>
  )
}

export default Home
