import { Container, Title, CommoditySection, CommodityItem } from './commodity.style'
import Divider from '@mui/material/Divider'
import GoldIcon from '@/assets/images/commodity/gold.png'
import PetrolIcon from '@/assets/images/commodity/petrol.png'
import CornIcon from '@/assets/images/commodity/corn.png'
import SoyIcon from '@/assets/images/commodity/soy.png'
import GasIcon from '@/assets/images/commodity/gas.png'
import BronzeIcon from '@/assets/images/commodity/bronze.png'

const commodityList = [
  { key: 'gold', name: '黃金', symbol: 'GC=F', price: '1945.51', icon: GoldIcon, description: '美元/公克' },
  { key: 'petrol', name: '石油', symbol: 'CL=F', price: '72.8', icon: PetrolIcon, description: '美元/桶' },
  { key: 'corn', name: '玉米', symbol: 'ZC=F', price: '723', icon: CornIcon, description: '美分/蒲式耳' },
  { key: 'brozen', name: '銅礦', symbol: 'HG=F', price: '72.8', icon: BronzeIcon, description: '美元/桶' },
  { key: 'gas', name: '天然氣', symbol: 'NG=F', price: '1945.51', icon: GasIcon, description: '美元/公克' },
  { key: 'soy', name: '黃豆', symbol: 'ZS=F', price: '723', icon: SoyIcon, description: '美分/蒲式耳' },
]

// 白銀 銅 黃豆

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
