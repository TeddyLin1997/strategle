import Echarts from './echarts'
import Indicate from './indicate'
import News from './news'

const Economy = () => {

  return (
    <div className="p-6" >
      <Indicate />
      <Echarts />
      <News />
    </div>
  )
}

export default Economy
