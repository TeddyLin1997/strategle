import Container from '@/components/container'
import Echarts from './echarts'
import Indicate from './indicate'
import * as S from './style'


const Economy = () => {

  return (
    <Container style={{ padding: '20px 8px', backgroundColor: 'white' }}>
      <S.Title>
        <span>Economic Indicators</span>
        <S.FedNew href="/" target="_blank">美聯儲柯林斯：完全支持利率政策最新指引或需進一步加息(做跑馬燈)</S.FedNew>
      </S.Title>

      <Indicate />

      <Echarts />

    </Container>
  )
}

export default Economy
