import { useLocation, useNavigate } from 'react-router'
import { forwardRef, useEffect, useState } from 'react'
import Mint from './mint'
import Stake from './stake'
import Unstake from './unstake'

enum TabsEvent {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
}

const Actions = forwardRef<HTMLDivElement>((_, ref) => {
  const navigate = useNavigate()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const action = params.get('action') || ''

  // tab
  const [tab, setTab] = useState(TabsEvent.Mint)
  useEffect(() => {
    if (action === TabsEvent.Mint) setTab(TabsEvent.Mint)
    if (action === TabsEvent.Stake) setTab(TabsEvent.Stake)
    if (action === TabsEvent.Unstake) setTab(TabsEvent.Unstake)
  }, [action])

  const onActionTab = (tab: TabsEvent) => {
    setTab(tab)
    navigate(`/protocol?tab=Portfolio&action=${tab}`)
  }

  return (
    <div ref={ref} className="p-6 w-full md:w-1/2 h-fit rounded-xl bg-gray-bg">
      <div className="mb-4 flex items-center gap-2 cursor-pointer">
        <div className={`py-2 flex-1 rounded text-center font-bold text-text transition-all ${tab === TabsEvent.Mint ? 'bg-primary' : 'bg-gray-1 !text-white'}`} onClick={() => onActionTab(TabsEvent.Mint)}>{TabsEvent.Mint}</div>
        <div className={`py-2 flex-1 rounded text-center font-bold text-text transition-all ${tab === TabsEvent.Stake ? 'bg-primary' : 'bg-gray-1 !text-white'}`} onClick={() => onActionTab(TabsEvent.Stake)}>{TabsEvent.Stake}</div>
        <div className={`py-2 flex-1 rounded text-center font-bold text-text transition-all ${tab === TabsEvent.Unstake ? 'bg-primary' : 'bg-gray-1 !text-white'}`} onClick={() => onActionTab(TabsEvent.Unstake)}>{TabsEvent.Unstake}</div>
      </div>

      <Mint isActive={tab=== TabsEvent.Mint} />
      <Stake isActive={tab=== TabsEvent.Stake} />
      <Unstake isActive={tab=== TabsEvent.Unstake} />

      <article className="mt-10">
        <div className="mb-2 flex items-center gap-2 text-lg font-bold">
          <img src="/logo.ico" className="w-5 h-5" />
          <span>Tips : </span>
        </div>
        <ul className="ml-8 list-disc leading-relaxed">
          <li>Token supply is limited to 5,000,000.</li>
          <li>The team will inject investment rewards quarterly.</li>
        </ul>
      </article>

    </div>
  )
})

export default Actions
