import MarketContainer from '@/context/marketContext'
import LinkIcon from '@/assets/icons/external-link.svg?react'
import LogoIcon from '@/assets/images/logo-icon.png'
import { formatAmount, formatNumber } from '@/utils'
import Big from 'big.js'
import { useTranslation } from 'react-i18next'

const MainQuote = () => {
  const { t } = useTranslation()
  const { ticker } = MarketContainer.useContainer()

  const mainQuoteList = [
    { name: 'DOW30', symbol: '^DJI', icon: '/images/index.png', url: 'https://tw.tradingview.com/symbols/TVC-DJI/' },
    { name: 'S&P500', symbol: '^GSPC', icon: '/images/index.png', url: 'https://tw.tradingview.com/symbols/SPX/' },
    { name: 'NASDAQ', symbol: '^IXIC', icon: '/images/index.png', url: 'https://tw.tradingview.com/symbols/NASDAQ-IXIC/' },
    { name: 'SOX', symbol: '^SOX', icon: '/images/index.png', url: 'https://tw.tradingview.com/symbols/NASDAQ-SOX/' },

    { name: 'Apple', symbol: 'AAPL', icon: '/images/usstock/aapl.png', url: 'https://tw.tradingview.com/symbols/NASDAQ-AAPL/' },
    { name: 'Microsoft', symbol: 'MSFT', icon: '/images/usstock/msft.png', url: 'https://tw.tradingview.com/symbols/NASDAQ-MSFT/' },
    { name: 'Google', symbol: 'GOOG', icon: '/images/usstock/goog.png', url: 'https://tw.tradingview.com/symbols/NASDAQ-GOOG/' },

    { name: 'BTC', symbol: 'BTCUSDT', icon: '/images/crypto/BTCUSDT.png', url: 'https://tw.tradingview.com/symbols/BTCUSD/' },
    { name: 'ETH', symbol: 'ETHUSDT', icon: '/images/crypto/ETHUSDT.png', url: 'https://tw.tradingview.com/symbols/ETHUSD/' },
    { name: 'BNB', symbol: 'BNBUSDT', icon: '/images/crypto/BNBUSDT.png', url: 'https://tw.tradingview.com/symbols/BNBUSD/' },
  ]

  return (
    <div className="px-8 w-full flex flex-col">
      <div className="mb-6 flex justify-center items-center gap-4 text-3xl font-bold">
        <img src={LogoIcon} className="w-8 h-8" />
        <span>{t('main_quotes')}</span>
      </div>

      <div className="mb-10 mx-auto w-full md:w-4/5 flex flex-col gap-6">
        {mainQuoteList.map(item => {
          const price = Big(ticker[item.symbol]?.price || 0)
          const open = Big(ticker[item.symbol]?.open || 0)
          const change = price.minus(open)
          const isUp = change.toNumber() >= 0
          const percent = change.times(100).div(open.toNumber() ? open : new Big(1)).toString()

          return (
            <article key={item.symbol} className="flex-1 flex items-center gap-2 md:gap-6 text-lg font-bold">
              <div className="mr-4 w-12 h-12">
                <img src={item.icon} className="w-full h-full object-cover" />
              </div>

              <div className="w-1/4 max-w-fit truncate">{item.name}</div>

              <div className={`flex-1 text-right whitespace-nowrap ${ isUp ? 'text-up' : 'text-down' }`}>$ {ticker[item.symbol] ? formatAmount(ticker[item.symbol].price, 2) : '-'}</div>
              <div className={`w-1/5 md:w-1/3 text-right ${ isUp ? 'text-up' : 'text-down' } whitespace-nowrap`}>
                <span>{`${change.toNumber() > 0 ? '+' : ''}${formatNumber(percent, 2)}%`}</span>
              </div>

              <a href={item.url} target="__blank" className="p-3 cursor-pointer">
                <LinkIcon className="scale-150 fill-white hover:fill-primary" />
              </a>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default MainQuote
