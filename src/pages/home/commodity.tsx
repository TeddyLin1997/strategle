import { useMarket } from '@/hooks/useMarket'
import { Container, Title, CommoditySection, CommodityItem } from './commodity.style'
import Divider from '@mui/material/Divider'

interface CommodityProps {
  commodityList: Commodity[]
}

const Commodity = ({ commodityList }: CommodityProps) => {
  const { ticker } = useMarket()

  return (
    <Container>
      <Divider variant="middle" />

      <Title>Commodities</Title>

      <CommoditySection>
        {commodityList.map(item => (
          <CommodityItem key={item.symbol}>
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
