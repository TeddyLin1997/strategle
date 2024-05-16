import { Tabs, Tab, Avatar } from '@mui/material'
import AvatarIcon from '@/assets/images/avatar/avatar1.png'
import { useEffect, useMemo, useState } from 'react'
import Wallet from './wallet'
import Info from './info'
import { CHAIN_INFO } from '@/global/chain'
import Container from '@/components/container'
import MarketContainer from '@/context/marketContext'
import WalletContainer from '@/context/walletContext'
import useTitle from '@/hooks/useTitle'
import { formatAmount } from '@/utils'

enum TabEnum {
  Wallet = 'Wallet',
  Info = 'Info',
}

const User = () => {
  useTitle('Wallet')

  const [tab, setTab]= useState(TabEnum.Wallet)
  const handleTab = (_, tab: TabEnum) => setTab(tab)

  const { chainId, account, provider, isConnect, balance } = WalletContainer.useContainer()

  const chainInfo = CHAIN_INFO[chainId]

  const { ticker } = MarketContainer.useContainer()
  const netValue = useMemo(() => {
    const coinPrice = Number(ticker?.[`${chainInfo?.coin?.name || '-'}USDT`]?.price) || 0
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
    <div className="bg-white">
      <Container>
        <section className="mb-6 flex flex-wrap sm:flex-nowrap gap-4">
          <article className="w-full sm:w-[65%] flex gap-4">
            <Avatar alt={ensName} src={AvatarIcon} className="mt-2 !w-16 !h-16" />

            <div className="w-[calc(100%-100px)] break-all">
              <div className="text-base font-bold">{ensName || '-'}</div>
              <div className="mb-1">{account || '-'}</div>
              <div className="text-gray-secondary">This user has not added a bio yet</div>
            </div>
          </article>

          <article className="mt-2 py-2 px-4 w-full sm:w-[35%] h-fit flex flex-col justify-center text-right rounded-md bg-gradient-to-r from-[#14bdbd] to-secondary ">
            <div className="flex items-center">
              <img src={CHAIN_INFO[chainId]?.coin?.icon} className="w-10 h-10" />

              <div className="ml-auto text-white">
                <div className="font-bold text-xl">{formatAmount(balance)} {CHAIN_INFO[chainId]?.coin?.name}</div>
                <div className="text-sm">$ {formatAmount(netValue)}</div>
              </div>
            </div>
          </article>
        </section>

        <div>
          <Tabs value={tab} onChange={handleTab} textColor="secondary" indicatorColor="secondary">
            <Tab label={TabEnum.Wallet} value={TabEnum.Wallet} />
            <Tab label={TabEnum.Info} value={TabEnum.Info} />
          </Tabs>

          { tab === TabEnum.Wallet && <Wallet /> }
          { tab === TabEnum.Info && <Info /> }
        </div>
      </Container>
    </div>
  )
}

export default User
