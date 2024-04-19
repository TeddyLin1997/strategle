import { Tabs, Tab, Avatar } from '@mui/material'
import AvatarIcon from '@/assets/images/avatar/avatar1.png'
import { useEffect, useMemo, useState } from 'react'
import Wallet from './wallet'
import Info from './info'
import { CHAIN_INFO } from '@/global/chain'
import { Title, Account, Balance } from './style'
import Container from '@/components/container'
import MarketContainer from '@/context/marketContext'
import WalletContainer from '@/context/walletContext'

enum TabEnum {
  Wallet = 'Wallet',
  Info = 'Info',
}

const User = () => {
  const [tab, setTab]= useState(TabEnum.Wallet)
  const handleTab = (_, tab: TabEnum) => setTab(tab)

  const { chainId, account, provider, isConnect, balance } = WalletContainer.useContainer()

  const chainInfo = CHAIN_INFO[chainId]

  const { ticker } = MarketContainer.useContainer()
  const netValue = useMemo(() => {
    const coinPrice = Number(ticker?.[`${chainInfo.coin.name}USDT`]?.price) || 0
    return (coinPrice * balance).toFixed(2)
  }, [chainId, ticker, balance])


  // ens name
  const [ensName, setEnsName] = useState('-')
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
    <Container style={{ backgroundColor: 'white' }}>
      <Title>
        <Account>
          <Avatar alt={ensName} src={AvatarIcon} className="!w-16 !h-16" />
          <div className="avatar-text">
            <div className="ensname">{ensName || '-'}</div>
            <div className="account">{account || '-'}</div>
            <div className="bio">This user has not added a bio yet</div>
          </div>
        </Account>

        <Balance>
          <div className="balance">
            <img src={CHAIN_INFO[chainId]?.coin?.icon} />
            <div>
              <div className="coin-balance">{balance} {CHAIN_INFO[chainId]?.coin?.name}</div>
              <div className="netvalue">≈$ {netValue}</div>
            </div>
          </div>
        </Balance>
      </Title>

      <div>
        <Tabs value={tab} onChange={handleTab} textColor="secondary" indicatorColor="secondary">
          <Tab label={TabEnum.Wallet} value={TabEnum.Wallet} />
          <Tab label={TabEnum.Info} value={TabEnum.Info} />
        </Tabs>

        { tab === TabEnum.Wallet && <Wallet /> }
        { tab === TabEnum.Info && <Info /> }
      </div>
    </Container>
  )
}

export default User
