import DownIcon from '@/assets/images/down.png'
import UpIcon from '@/assets/images/up.png'
import { getChangeColor } from '@/utils'
import Big from 'big.js'
import { useEconomyOverview } from '../hooks'

export default function Indicate () {
  const { indicies } = useEconomyOverview()

  return (
    <div className="mx-auto max-w-screen-xl">
      <section className="flex items-center flex-wrap md:flex-nowrap">
        { indicies.map(item => {
          const curr = new Big(item.value || 0)
          const prev = new Big(item.prevValue || 0)
          const change = curr.minus(prev)
          const changeNumber = change.toNumber()
          const isUp = changeNumber >= 0

          return (
            <div key={item.key} className="px-2 w-1/2 md:w-1/4">
              <div className="mb-6 p-3 bg-[#ccebf1] rounded-lg">
                <div className="flex items-center gap-3 font-bold text-lg">
                  <div className="w-12 h-12 rounded-md">
                    <img src={item.icon} className="w-full h-full"/>
                  </div>

                  <div className="w-[calc(100%-48px)] text-right">
                    <div className="w-full truncate text-[#214d57]">{item.name}</div>
                    <div className="text-sm text-[#81858c] truncate">{item.time}</div>
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
            </div>
          )
        }
        ) }
      </section>
    </div>
  )
}
