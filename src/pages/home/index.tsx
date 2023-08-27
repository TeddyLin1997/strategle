import WorldStockIndex from './world'
import TopList from './top-list'
import Commodity from './commodity'
// import LatestNews from './latest-news'
import { Button } from '@mui/material'
import tradeBusinessImg from '@/assets/images/trade-business.png'
import * as S from './index.style'

const Home = () => {

  return (
    <S.Wrapper>
      <WorldStockIndex />
      <TopList />
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
