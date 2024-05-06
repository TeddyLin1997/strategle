import MarketContainer from '@/context/marketContext'
import { formatAmount } from '@/utils'
import { useTranslation } from 'react-i18next'

const MainQuote = () => {
  const { t } = useTranslation()
  const { ticker } = MarketContainer.useContainer()

  const mainQuoteList = [
    { name: 'S&P 500', symbol: '^GSPC', icon: '/images/index.png' },
    { name: 'Apple', symbol: 'AAPL', icon: '/images/usstock/aapl.png' },
    { name: 'BTC', symbol: 'BTCUSDT', icon: '/images/crypto/BTCUSDT.png' },
    { name: 'GOLD', symbol: 'GOLD', icon: '/images/commodity/gold.png' },
    { name: 'Crude Oil', symbol: 'CRUDE_OIL', icon: '/images/commodity/petrol.png' },
  ]

  return (
    <div className="px-4 py-2 w-1/2 md:w-1/3 flex flex-col rounded-xl shadow bg-white">
      <div className="text-lg text-secondary font-bold">{t('main_quotes')}</div>
      <div className="pl-3 py-3 h-max flex flex-col gap-3">
        {mainQuoteList.map(item => (
          <article key={item.symbol} className="flex-1 flex items-center gap-3">
            <div className="w-7 h-7">
              <img src={item.icon} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 max-w-fit font-bold truncate">{item.name}</div>

            <div className="flex-1 text-right font-bold text-secondary whitespace-nowrap">$ {ticker[item.symbol] ? formatAmount(ticker[item.symbol].price, 2) : '-'}</div>
          </article>
        ))}

      </div>
    </div>
  )
}

export default MainQuote
