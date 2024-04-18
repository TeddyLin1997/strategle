import FearAndGreedIndexChart from './fear-and-greed-index'
import IndicateCharts from './indicate-charts'
import MainQuote from './main-quote'

export default function EconomyChart () {
  return (
    <div className="echart-container mx-auto max-w-screen-xl mb-12 px-2 flex gap-4 justify-end">
      <MainQuote />
      <FearAndGreedIndexChart />
      <IndicateCharts />
    </div>
  )
}
