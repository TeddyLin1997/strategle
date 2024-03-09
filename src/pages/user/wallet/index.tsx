import { useState } from 'react'
import { Padding, SubTabs, SubTab } from './style'
import Send from './send'
import Swap from './swap'
import Donate from './donate'

enum ETab {
  OVERVIEW = 'overview',
  SEND = 'send',
  SWAP = 'swap',
  BRIDGE = 'bridge',
  DONATE = 'donate',
}

const tabList = [
  { name: 'Send', value: ETab.SEND },
  { name: 'Swap', value: ETab.SWAP },
  { name: 'Donate', value: ETab.DONATE },
]

const Wallet = () => {
  // tab
  const [tab, setTab] = useState(ETab.SEND)
  const handleTab = (value: ETab) => setTab(value)

  return (
    <Padding>
      <SubTabs>
        {tabList.map(item => (
          <SubTab key={item.name} active={tab === item.value ? 1 : 0} onClick={() => handleTab(item.value)}>
            {item.name}
          </SubTab>
        ))}
      </SubTabs>

      <div style={{ marginTop: '8px', flex: 1 }}>
        {tab === ETab.SEND && <Send />}
        {tab == ETab.SWAP && <Swap /> }
        {tab == ETab.DONATE && <Donate /> }
      </div>


    </Padding>
  )
}

export default Wallet
