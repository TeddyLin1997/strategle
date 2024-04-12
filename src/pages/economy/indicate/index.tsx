import DownIcon from '@/assets/images/down.png'
import UpIcon from '@/assets/images/up.png'
import { getChangeColor } from '@/utils'
import Big from 'big.js'
import { useEconomyOverview } from '../hooks'
import { Header } from './style'

export default function Indicate () {
  const { indicies } = useEconomyOverview()

  return (
    <Header>
      { indicies.map(item => {
        const curr = new Big(item.value || 0)
        const prev = new Big(item.prevValue || 0)
        const change = curr.minus(prev)
        const changeNumber = change.toNumber()
        const isUp = changeNumber >= 0

        return (
          <div key={item.key} className="indicies shadow  bg-secondary-light rounded-md">
            <div className="header">
              <div className="icon-container">
                <img src={item.icon} />
              </div>
              <div className="title-container">
                <div className="title">{item.name}</div>
                <div className="date">{item.time}</div>
              </div>
            </div>

            <div className="flex items-end">
              <img className="ml-2 w-8 h-8" src={isUp ? UpIcon : DownIcon } />

              <div className="ml-auto text-right">
                <div className="font-bold text-xl">{item.formatValue}</div>
                <div className="font-bold" style={{ color: getChangeColor(changeNumber) }}>
                  {`${isUp ? '+' : '-'} ${change.toFixed(2)} ${item.unit}`}
                </div>
              </div>
            </div>
          </div>
        )
      }
      ) }
    </Header>
  )
}



