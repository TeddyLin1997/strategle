import Big from 'big.js'
import Container from '@/components/container'
import EnconomyEcharts from './enconomy-echarts'
import DownIcon from '@/assets/images/down.png'
import UpIcon from '@/assets/images/up.png'
import { getChangeColor } from '@/utils'
import { useEconomyOverview } from './hooks'
import * as S from './style'


const Economy = () => {
  const { indicies } = useEconomyOverview()

  return (
    <Container style={{ backgroundColor: 'white' }}>
      <S.Title>
        <span>Economic Indicators</span>
      </S.Title>

      <S.Header>
        { indicies.map(item => {
          const curr = new Big(item.value || 0)
          const prev = new Big(item.prevValue || 0)
          const change = curr.minus(prev)
          const changeNumber = change.toNumber()
          const isUp = changeNumber >= 0

          return (
            <div key={item.key} className="indicies">
              <div className="header">
                <div className="icon-container">
                  <img src={item.icon} />
                </div>
                <div className="title-container">
                  <div className="title">{item.name}</div>
                  <div className="date">{item.time}</div>
                </div>
              </div>

              <div className="footer">
                <img className="flag" src={isUp ? UpIcon : DownIcon } />

                <div className="price">
                  <div className="value">{item.formatValue}</div>
                  <div className="change" style={{ color: getChangeColor(changeNumber) }}>
                    {`${isUp ? '+' : '-'} ${change.toFixed(2)}${item.unit}`}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        ) }
      </S.Header>

      <EnconomyEcharts />

    </Container>
  )
}

export default Economy
