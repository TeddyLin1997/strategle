import Container from '@/components/container'
import Echarts from './echarts'
import Indicate from './indicate'
import News from './news'

const Economy = () => {

  return (
    <Container style={{ padding: '20px 8px' }}>
      {/* <div className="mb-3 px-3 flex items-center font-bold text-3xl">
        Economic Indicators
      </div> */}

      <Indicate />

      <Echarts />

      <News />

    </Container>
  )
}

export default Economy
