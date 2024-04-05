import { useState } from 'react'
import useWebSocket from '@/hooks/uswWebSocket'
import { createContainer } from 'unstated-next'

type MarketTicker = {
  [symbolName: string]: Tick
}

const useMarket = () => {

  const [ticker, setMarketTicker] = useState<MarketTicker>({})
  useWebSocket((eventData) => {
    const data = JSON.parse(eventData)
    setMarketTicker(data)
  }, [])

  return { ticker }
}

const MarketContainer = createContainer(useMarket)

export default MarketContainer
