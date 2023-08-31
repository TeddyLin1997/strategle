import { Container, Title, CommoditySection, CommodityItem } from './commodity.style'
import Divider from '@mui/material/Divider'

interface CommodityProps {
  commodityList: Commodity[]
}

const Commodity = ({ commodityList }: CommodityProps) => {
  return (
    <Container>
      <Divider variant="middle" />

      <Title>期貨商品</Title>

      <CommoditySection>
        {commodityList.map(item => (
          <CommodityItem key={item.symbol}>
            <div className="name">
              <img className="commodity-icon" src={item.icon} />
              <div className="commodity-name">{item.name}</div>
            </div>
            <div className="price">
              <div className="commodity-price">{'1971.21'} <span className="unit">USD</span></div>
              <div className="commodity-description">{item.description}</div>
            </div>
          </CommodityItem>
        ))}
      </CommoditySection>
    </Container>
  )
}

export default Commodity
