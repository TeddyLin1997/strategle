import Echarts from './echarts'
import Indicate from './indicate'
import News from './news'

const Economy = () => {

  return (
    <div className="bg-white">
      <Indicate />

      <Echarts />

      <News />
    </div>
  )
}

export default Economy
