import { Container, Title, CommoditySection, CommodityItem } from './commodity.style'
import Divider from '@mui/material/Divider'
import GoldIcon from '@/assets/images/gold.png'
import PetrolIcon from '@/assets/images/petrol.png'
import Corn from '@/assets/images/corn.png'

const commodityList = [
  { key: 'gold', name: '黃金', price: '1945.51', icon: GoldIcon, description: '美元/公克' },
  { key: 'petrol', name: '石油', price: '72.8', icon: PetrolIcon, description: '美元/桶' },
  { key: 'corn', name: '玉米', price: '723', icon: Corn, description: '美分/蒲式耳' },
]

const Commodity = () => {
  return (
    <Container>

      <Divider variant="middle" />

      <Title>期貨商品</Title>

      <CommoditySection>
        {commodityList.map(item => (
          <CommodityItem key={item.key}>
            <div className="name">
              <img className="commodity-icon" src={item.icon} />
              <div className="commodity-name">{item.name}</div>
            </div>
            <div className="price">
              <div className="commodity-price">{item.price} <span className="unit">USD</span></div>
              <div className="commodity-description">{item.description}</div>
            </div>
          </CommodityItem>
        ))}
      </CommoditySection>



    </Container>
  )
}

export default Commodity
