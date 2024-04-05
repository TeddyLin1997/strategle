import MarketContainer from '@/context/marketContext'
import { Container, Title, CommoditySection, CommodityItem } from './index.style'
import Divider from '@mui/material/Divider'

interface CommodityProps {
  commodityList: Commodity[]
}

const Commodity = ({ commodityList }: CommodityProps) => {
  const { ticker } = MarketContainer.useContainer()

  return (
    <Container>
      <Divider variant="middle" />

      <Title>Commodities</Title>

      <CommoditySection>
        {commodityList.map(item => (
          <CommodityItem key={item.symbol} onClick={() => window.open(item.url)}>
            <div className="name">
              <img className="commodity-icon" src={item.icon} />
              <div className="commodity-name">{item.name}</div>
            </div>
            <div className="price">
              <div className="commodity-price">{String(ticker[item.symbol]?.price || '-')}<span className="unit"> USD</span></div>
              <div className="commodity-description">{item.description}</div>
            </div>
          </CommodityItem>
        ))}
      </CommoditySection>
    </Container>
  )
}

export default Commodity
