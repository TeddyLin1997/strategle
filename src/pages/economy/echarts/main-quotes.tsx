import { useMarket } from '@/hooks/useMarket'
import styled from 'styled-components'

const shadow = 'box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);'

const Container = styled.div`
  flex: 1;

  .quote-title {
    color: #306F7D;
    font-weight: 500;
  }
`

const Section = styled.section`
  margin-top: 16px;
  padding-right: 12px;
  height: calc(100% - 31px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Article = styled.article`
  padding: .8rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all .2s;
  ${shadow}

  &:hover {
    ${shadow}
  }

  .img {
    margin-right: .8rem;
    width: 1.6rem;
    height: 1.6rem;
  }

  .name {
    color: #306F7D;
    font-weight: 500;
  }

  .price {
    margin-left: auto;
  }
`

const quotesList = [
  { name: 'DOW30', symbol: '^DJI', icon: '/images/index.png' },
  { name: 'S&P500', symbol: '^GSPC', icon: '/images/index.png' },
  { name: 'NASDAQ', symbol: '^IXIC', icon: '/images/index.png' },
  { name: 'BTC', symbol: 'BTCUSDT', icon: '/images/crypto/BTCUSDT.png' },
  { name: 'ETH', symbol: 'ETHUSDT', icon: '/images/crypto/ETHUSDT.png' },
  { name: 'Gold', symbol: 'GOLD', icon: '/images/commodity/gold.png' },
  { name: 'Crude Oil', symbol: 'CRUDE_OIL', icon: '/images/commodity/petrol.png' },
]

const MainQuotes = () => {
  const { ticker } = useMarket()

  return (
    <Container>
      <div className="quote-title">Main Quotes</div>

      <Section>
        {quotesList.map(item => (
          <Article key={item.name}>
            <img className="img" src={item.icon} />
            <div className="name">{item.name}</div>
            <div className="price">{
              item.symbol === 'GOLD' ?  ticker[item.symbol].price : Number(ticker[item.symbol].price).toFixed(2)
            }</div>
          </Article>
        ))}
      </Section>
    </Container>
  )
}

export default MainQuotes
