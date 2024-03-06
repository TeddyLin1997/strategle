import Container from '@/components/container'
import Echarts from './echarts'
import Indicate from './indicate'
import News from './news'
import * as S from './style'

const Economy = () => {

  return (
    <Container style={{ padding: '20px 8px', backgroundColor: 'white' }}>
      <S.Title>
        <span>Economic Indicators</span>
      </S.Title>

      <Indicate />

      <Echarts />

      <News />

    </Container>
  )
}

export default Economy
