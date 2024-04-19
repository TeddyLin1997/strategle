import { useMemo } from 'react'
import useSWR from 'swr'
import WorldStockIndex from './world/world'
import TopList from './top-list'
import Commodity from './commodity'
import Forex from './forex'
// import { Button } from '@mui/material'
import { fetcher } from '@/service/api-request'
// import tradeBusinessImg from '@/assets/images/trade-business.png'

const Home = () => {
  const { data: indexList } = useSWR('/home/index_list', fetcher)
  const { data: topList } = useSWR('/home/top_list', fetcher)
  const { data: commodityList } = useSWR('/home/commodity_list', fetcher)
  const { data: forexList } = useSWR('/home/forex_list', fetcher)

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

      {/* <section className="px-5 bg-primary-extend">
        <div className="mx-auto py-3 px-5 w-full flex justify-between items-center max-w-4xl">
          <div className="mr-6">
            <div className="mb-6 text-2xl font-bold">Embark on Your Trade Journey Today!</div>
            <Button variant="contained" size="large">Start Trade</Button>
          </div>
          <img src={tradeBusinessImg} className="w-1/3 max-w-96" />
        </div>
      </section> */}
    </div>
  )
}

export default Home
