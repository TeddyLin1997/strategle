import { useEffect, useMemo, useState } from 'react'
import Container from '@/components/container'
import { Tabs, Tab, Avatar } from '@mui/material'
import { Wrapper, Title, Account, Balance, Content } from './style'
import { useWallet } from '@/hooks/useWallet'
import { CHAIN_INFO } from '@/global/chain'
import AvatarIcon from '@/assets/images/avatar3.png'
import Send from './send'
import Swap from './swap'
import Bridge from './bridge'
import Donate from './donate'
import { useMarket } from '@/hooks/useMarket'


const containerStyle = { padding: '20px 120px' }

enum ETab {
  OVERVIEW = 'overview',
  SEND = 'send',
  SWAP = 'swap',
  BRIDGE = 'bridge',
  DONATE = 'donate',
}

const tabList = [
  // { name: 'Overview', value: ETab.OVERVIEW },
  { name: 'Send', value: ETab.SEND },
  { name: 'Swap', value: ETab.SWAP },
  { name: 'Bridge', value: ETab.BRIDGE },
  { name: 'Donate', value: ETab.DONATE },
]

const Wallet = () => {
  const [tab, setTab] = useState(ETab.SEND)
  const handleChange = (_, value: ETab) => setTab(value)

  const { ticker } = useMarket()

  const { chainId, account, provider, isConnect, balance } = useWallet()
  const chainInfo = CHAIN_INFO[chainId]
  const [ensName, setEnsName] = useState('-')

  const netValue = useMemo(() => {
    const coinPrice = Number(ticker?.[`${chainInfo.coin.name}USDT`]?.price) || 0
    return (coinPrice * balance).toFixed(2)
  }, [chainId, ticker, balance])

  useEffect(() => {
    getEnsName()

    async function getEnsName() {
      if (isConnect && account && provider) {
        const ensName = await provider.lookupAddress('0x020cA66C30beC2c4Fe3861a94E4DB4A498A35872')
        ensName && setEnsName(ensName)
      }
    }
  }, [account, provider, isConnect])

  return (
    <Container style={containerStyle}>
      <Title>
        <Account>
          <Avatar alt={ensName} src={AvatarIcon} sx={{ marginRight: '1rem', width: 84, height: 84 }} />
          <div>
            <div className="ensname">{ensName || '-'}</div>
            <div className="account">{account || '-'}</div>
            <div className="bio">This user has not added a bio yet</div>
          </div>
        </Account>

        <Balance>
          <div className="balance">
            <img src={CHAIN_INFO[chainId]?.coin?.icon} />
            <div>{balance} {CHAIN_INFO[chainId]?.coin?.name}</div>
          </div>
          <div className="netvalue">≈$ {netValue}</div>
        </Balance>
      </Title>

      <Wrapper>
        <Content style={{ width: '65%' }}>
          <Tabs value={tab} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
            {tabList.map(tab => <Tab key={tab.name} label={tab.name} value={tab.value} />)}
          </Tabs>

          <TabPane tab={tab} index={ETab.SEND}>
            <Send />
          </TabPane>

          <TabPane tab={tab} index={ETab.SWAP}>
            <Swap />
          </TabPane>

          <TabPane tab={tab} index={ETab.BRIDGE}>
            <Bridge />
          </TabPane>

          <TabPane tab={tab} index={ETab.DONATE}>
            <Donate />
          </TabPane>
        </Content>

        <Content style={{ width: '35%' }}>

        </Content>

      </Wrapper>
    </Container>
  )
}


function TabPane ({ tab, index, children }) {
  return tab === index && (
    <div>
      { children }
    </div>
  )
}

export default Wallet
