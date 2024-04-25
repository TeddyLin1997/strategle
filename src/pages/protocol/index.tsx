import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Portfolio from './portfolio'
import Info from './info'
import useTitle from '@/hooks/useTitle'

enum Tabs {
  Info = 'Info',
  Portfolio = 'Portfolio'
}

const Protocol = () => {
  useTitle('STRAG Protocol')
  const navigate = useNavigate()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initTab = params.get('tab') as Tabs
  useEffect(() => { initTab && setTab(initTab) }, [initTab])

  // tab
  const [tab, setTab] = useState(Tabs.Info)
  const toggleToInfo = () => {
    const tab = Tabs.Info
    setTab(tab)
    navigate(`/protocol?tab=${tab}`)
  }

  const toggleToPortfolio = () => {
    const tab =  Tabs.Portfolio
    setTab(tab)
    navigate(`/protocol?tab=${tab}`)
  }

  return (
    <div className="bg-bg min-h-[calc(100vh-100px)] text-white">
      <div className="mx-auto p-5 max-w-[1200px]">

        { tab === Tabs.Info && <Info handleTab={toggleToPortfolio} /> }
        { tab === Tabs.Portfolio && <Portfolio handleTab={toggleToInfo} /> }
      </div>
    </div>
  )
}

export default Protocol
