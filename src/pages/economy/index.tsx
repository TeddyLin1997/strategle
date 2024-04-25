import useTitle from '@/hooks/useTitle'
import Echarts from './echarts'
import Indicate from './indicate'
import News from './news'

const Economy = () => {
  useTitle('Economy')

  return (
    <div className="bg-white">
      <Indicate />

      <Echarts />

      <News />
    </div>
  )
}

export default Economy
