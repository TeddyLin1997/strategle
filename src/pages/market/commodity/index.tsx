import MarketContainer from '@/context/marketContext'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'

interface CommodityProps {
  commodityList: Commodity[]
}

const Commodity = ({ commodityList }: CommodityProps) => {
  const { t } = useTranslation()
  const { ticker } = MarketContainer.useContainer()

  return (
    <div className="m-auto pt-0 w-full max-w-screen-lg">
      <Divider variant="middle" />

      <header className="py-6 px-4 text-3xl font-black text-center">{t('commodities')}</header>

      <section className="flex items-center flex-wrap">
        {commodityList.length === 0 &&
          Array.from(Array(6)).map((_, index) => (
            <article key={index} className="mb-6 px-3 w-1/2 md:w-1/3">
              <div className="p-4 pl-2 flex items-center justify-between bg-[#F2F2F2] rounded-xl transition-all hover:bg-[#fff6d8] cursor-pointer">
                <div className="w-fit flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
                  <Skeleton variant="circular" className="w-12 !h-12" />
                  <Skeleton variant="text" className="w-16" />
                </div>

                <div className="w-fit">
                  <Skeleton variant="text" className="w-32" />
                  <Skeleton variant="text" className="w-32" />
                </div>
              </div>
            </article>
          ))
        }
        {commodityList.length > 0 && commodityList.map(item => (
          <article key={item.symbol} onClick={() => window.open(item.url)} className="mb-6 px-3 w-1/2 md:w-1/3">
            <div className="p-4 pl-2 flex items-center justify-between bg-[#F2F2F2] rounded-xl transition-all hover:bg-[#fff6d8] cursor-pointer">
              <div className="w-fit flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
                <img className="w-12 h-12" src={item.icon} />
                <div className="w-16 text-center sm:text-left font-bold whitespace-nowrap">{t(item.symbol.toLowerCase())}</div>
              </div>
              <div className="flex-1">
                <div className="text-right font-bold text-lg">{String(ticker[item.symbol]?.price || '-')}<span className="text-xs"> USD</span></div>
                <div className="text-right text-sm font-bold text-[#81858c]">{item.description}</div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Commodity
