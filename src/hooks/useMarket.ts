import { useContext } from 'react'
import { MarketContextProps, MarketContext } from '@/context/marketContext'

export const useMarket = (): MarketContextProps => {
  const context = useContext(MarketContext)
  return context
}
