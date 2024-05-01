import { useMemo } from 'react'
import useSWR from 'swr'
import WorldStockIndex from './world/world'
import TopList from './top-list'
import Commodity from './commodity'
import Forex from './forex'
import { fetcherData } from '@/service/api-request'
import useTitle from '@/hooks/useTitle'

const Home = () => {
  useTitle('Market')

  const { data: indexList } = useSWR('/home/index_list', fetcherData)
  const { data: topList } = useSWR('/home/top_list', fetcherData)
  const { data: commodityList } = useSWR('/home/commodity_list', fetcherData)
  const { data: forexList } = useSWR('/home/forex_list', fetcherData)

  const homeLists = useMemo(() => ({
    index: indexList || [] as WorldIndex[],
    crypto: topList?.crypto || [] as TopItem[],
    usStock: topList?.usStock || [] as TopItem[],
    commodity: commodityList || [] as Commodity[],
    forex: forexList || [] as TopItem[],
  }), [topList, indexList, commodityList, forexList])

  return (
    <div className="bg-white">
      <WorldStockIndex indexList={homeLists.index} />
      <TopList cryptoList={homeLists.crypto} usStockList={homeLists.usStock} />
      <Commodity commodityList={homeLists.commodity} />
      <Forex forexList={homeLists.forex} />
    </div>
  )
}

export default Home
