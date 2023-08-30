import { createContext, useState } from 'react'
import useWebSocket from '@/hooks/uswWebSocket'

type MarketTicker = {
  [symbolName: string]: Tick
}

export interface MarketContextProps {
  ticker: MarketTicker
}

const initMarketContext: MarketContextProps = { ticker: {} }

export const MarketContext = createContext(initMarketContext)

export const MarketProvider = ({ children }) => {

  const [marketTicker, setMarketTicker] = useState(initMarketContext.ticker)
  useWebSocket((eventData) => {
    const data = JSON.parse(eventData)
    setMarketTicker(data)
  }, [])

  return (
    <MarketContext.Provider value={{ ticker: marketTicker }}>
      {children}
    </MarketContext.Provider>
  )
}
