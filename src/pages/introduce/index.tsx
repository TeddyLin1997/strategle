import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import BannerLandingImg from '@/assets/images/banner-landing.png'
import ProtocolImg from '@/assets/images/intro-protocol.png'
import EconomyImg from '@/assets/images/intro-economy.png'
import QuoteImg from '@/assets/images/intro-quote.png'
import MainQuote from './main-quote'

const Introduce = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-screen-xl bg-bg min-h-dvh text-white">
      <section className="mb-14 flex flex-wrap lg:flex-nowrap justify-between items-center gap-10 min-h-[360px]">
        <div className="p-6 w-full lg:w-1/2">
          <div className="my-10 font-black">
            <span className="text-6xl text-primary">STRATEGLE </span>
            <span className="text-5xl text-white">.COM</span>
          </div>
          <p className="mb-10 text-2xl font-bold text-white">Market Quotes, Financial News, Earning Profits.</p>
          <p className="mb-8 text-white">We are committed to providing comprehensive financial market information services and insights into the world of cryptocurrencies, helping you to gain any possible advantage in the market. Whether you're interested in stocks, forex, cryptocurrencies, or global financial markets, we have everything you need.</p>

          <div className="flex items-center flex-wrap gap-6">
            <Button onClick={() => navigate('/market')} variant="outlined" size="large">Market Overview</Button>
            <Button onClick={() => navigate('/economy')} variant="outlined" size="large">Economy News</Button>
            <Button onClick={() => navigate('/protocol')} variant="contained" size="large">Earning Profits</Button>
          </div>
        </div>

        <div className="relative flex w-full lg:w-1/2 h-fit">
          <img src={BannerLandingImg} className="m-auto w-full h-auto" draggable="false" />
          <div className="absolute w-1/5 h-full -left-0 top-0 bg-gradient-to-r from-bg to-transparent" />
          <div className="absolute w-1/5 h-full -right-0 top-0 bg-gradient-to-l from-bg to-transparent" />
          <div className="absolute w-full h-1/6 bottom-0 bg-gradient-to-t from-bg to-transparent" />
          <div className="absolute w-full h-1/6 top-0 bg-gradient-to-b from-bg to-transparent" />
        </div>
      </section>

      <section className="pb-4 px-6 flex flex-wrap sm:flex-nowrap gap-4">
        <article className="mb-6 w-full sm:w-1/3 flex flex-col items-center">
          <img src={QuoteImg} className="mb-2 w-auto h-32" draggable="false" />
          <div className="mb-4 font-black text-2xl text-primary-light">Market Overview</div>
          <p className="mb-6 px-4 text-center">You can easily view the latest integrated prices of cryptocurrencies, US stocks, financial markets, and forex on our website to stay informed about market dynamics at all times. We provide real-time price updates to assist you in making informed investment decisions.</p>
          <Button onClick={() => navigate('/market')} variant="contained" className="!mt-auto">Market</Button>
        </article>
        <article className="mb-6 w-full sm:w-1/3 flex flex-col items-center">
          <img src={EconomyImg} className="mb-2 w-auto h-32" draggable="false" />
          <div className="mb-4 font-black text-2xl text-primary-light">Economy News</div>
          <p className="mb-6 px-4 text-center">We aggregate a rich variety of financial news covering various topics including market trends, investment strategies, emerging technologies, and global economic dynamics. This includes charts and analysis of key indicators such as CPI, Fed rates, fear indices, and more.</p>
          <Button onClick={() => navigate('/economy')} variant="contained" className="!mt-auto">Economy</Button>
        </article>
        <article className="mb-6 w-full sm:w-1/3 flex flex-col items-center">
          <img src={ProtocolImg} className="mb-2 w-auto h-32" draggable="false" />
          <div className="mb-4 font-black text-2xl text-primary-light">DeFi Protocol</div>
          <p className="mb-6 px-4 text-center">We also offer DeFi (Decentralized Finance) projects for you to explore the emerging field of financial technology. Developed using long-term accumulated market experience, our trading strategies provide users with profit-sharing mechanisms, with planned annualized returns of up to 12%.</p>
          <Button onClick={() => navigate('/protocol')} variant="contained" className="!mt-auto">DeFi Protocol</Button>
        </article>
      </section>

      <MainQuote />
    </div>
  )
}

export default Introduce
