import Container from '@/components/container'
import * as S from './style'
import CpiIcon from '@/assets/images/economy/cpi.png'
import InflationIcon from '@/assets/images/economy/inflation.png'
import FederalIcon from '@/assets/images/economy/federal.png'
import TreasuryIcon from '@/assets/images/economy/treasury-yield.png'
import BearishIcon from '@/assets/images/bearish.png'
import BullishIcon from '@/assets/images/bullish.png'
// import DownIcon from '@/assets/images/down.png'
// import UpIcon from '@/assets/images/up.png'
import { fetcher } from '@/service/api-request'
import useSWR from 'swr'
import Big from 'big.js'
import { getChangeColor } from '@/utils'


const Economy = () => {
  const { data: economy = {} } = useSWR('/economy/overview', fetcher)

  const indicies = [
    {
      key: 'cpi',
      name: 'Consumer Price Index',
      icon: CpiIcon,
      fullName: economy.cpi?.name || '',
      value: economy.cpi?.value || '',
      prevValue: economy.cpi?.prevValue || '',
      formatValue: economy.cpi?.value || '-',
      unit: '',
      time: economy.cpi?.time || '',
    },
    {
      key: 'fed_fund_rate',
      name: 'Federal Funds Rate',
      icon: FederalIcon,
      fullName: economy.fed_fund_rate?.name || '',
      value: economy.fed_fund_rate?.value || '',
      prevValue: economy.fed_fund_rate?.prevValue || '',
      formatValue: `${economy.fed_fund_rate?.value || '-'} %`,
      unit: '%',
      time: economy.fed_fund_rate?.time || '',
    },
    {
      key: 'treasury_yield',
      name: '10-Year Treasury Rate',
      icon: TreasuryIcon,
      fullName: economy.treasury_yield?.name || '',
      value: economy.treasury_yield?.value || '',
      prevValue: economy.treasury_yield?.prevValue || '',
      formatValue: `${economy.treasury_yield?.value || '-'} %`,
      unit: '%',
      time: economy.treasury_yield?.time || '',
    },
    {
      key: 'inflation',
      name: 'Inflation Rate - US',
      icon: InflationIcon,
      fullName: economy.inflation?.name || '',
      value: economy.inflation?.value || '',
      prevValue: economy.inflation?.prevValue || '',
      formatValue: `${Number(economy.inflation?.value).toFixed(3) || '-'} %`,
      unit: '%',
      time: economy.inflation?.time || '',
    },
  ]

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
                  <div>{item.name}</div>
                  <div className="date">{item.time}</div>
                </div>
              </div>

              <div className="footer">
                {/* <img className="flag" src={isUp ? UpIcon : DownIcon } /> */}
                <img className="flag" src={isUp ? BearishIcon : BullishIcon } />

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
    </Container>
  )
}

export default Economy
