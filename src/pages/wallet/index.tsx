import { Avatar } from '@mui/material'
import AvatarIcon from '@/assets/images/avatar/avatar1.png'
import { useEffect, useMemo, useState } from 'react'
import Actions from './actions'
import { CHAIN_INFO } from '@/global/chain'
import Container from '@/components/container'
import MarketContainer from '@/context/marketContext'
import WalletContainer from '@/context/walletContext'
import useTitle from '@/hooks/useTitle'
import { copy, formatAmount } from '@/utils'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Profile', url: '/wallet/profile' },
  { label: 'Transactions', url: '/wallet/transactions' },
  { label: 'Setting', url: '/wallet/setting' },
]

const User = () => {
  useTitle('Wallet')

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
        const ensName = await provider.lookupAddress(account)
        ensName && setEnsName(ensName)
      }
    }
  }, [account, provider, isConnect])

  return (
    <div className="bg-white">
      <Container>
        <section className="mb-4 flex flex-wrap sm:flex-nowrap gap-4">
          <article className="w-full sm:w-[65%] flex gap-4">
            <Avatar alt={ensName} src={AvatarIcon} className="mt-2 !w-16 !h-16" />

            <div className="w-[calc(100%-100px)] break-all">
              <div className="text-lg font-bold">{ensName || '-'}</div>
              <div className="mb-1 cursor-pointer" onClick={() => copy(account)}>{account || '-'}</div>
              <div className="text-gray-secondary">This user has not added a bio yet</div>
            </div>
          </article>


          <article className="mt-2 w-full sm:w-[35%]">
            <div className="mb-1 py-2 px-4 h-fit flex flex-col justify-center text-right rounded-md bg-gradient-to-r from-tertiary to-secondary">
              <div className="flex items-center">
                <img src={CHAIN_INFO[chainId]?.coin?.icon} className="w-10 h-10" />

                <div className="ml-auto text-white">
                  <div className="font-bold text-xl">{formatAmount(balance)} {CHAIN_INFO[chainId]?.coin?.name}</div>
                  <div className="text-sm">$ {formatAmount(netValue)}</div>
                </div>
              </div>
            </div>

            <Actions />
          </article>
        </section>

        <section>
          <div className="flex items-center gap-3 border-b">
            { tabs.map(item =>
              <NavLink
                key={item.label}
                to={item.url}
                className={({ isActive }) => `px-5 h-10 text-lg font-bold ${isActive ? 'text-secondary border-b-4 border-secondary' : ''}`}
              >
                {item.label}
              </NavLink>) }
          </div>

          { account && <Outlet /> }
        </section>
      </Container>
    </div>
  )
}

export default User
