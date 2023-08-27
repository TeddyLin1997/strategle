import WorldStockIndex from './world'
import TopList from './top-list'
import Commodity from './commodity'
import * as S from './index.style'

const Home = () => {

  return (
    <S.Wrapper>
      <WorldStockIndex />

      <TopList />

      <Commodity />
    </S.Wrapper>
  )
}

export default Home
