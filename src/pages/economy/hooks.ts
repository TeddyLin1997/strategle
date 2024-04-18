import useSWR from 'swr'
import { useState, useMemo, ChangeEvent } from 'react'
import { fetcher } from '@/service/api-request'
import CpiIcon from '@/assets/images/economy/index.png'
// import CpiIcon from '@/assets/images/economy/cpi.png'
import InflationIcon from '@/assets/images/economy/inflation.png'
import FederalIcon from '@/assets/images/economy/federal.png'
import TreasuryIcon from '@/assets/images/economy/treasury-yield.png'
import { Economy } from './constant'
import dayjs from 'dayjs'

const initData = {
  data: [],
  interval: '',
  name: '',
  unit: '',
  updateTime: '',
}

export const useEconomyOverview = () => {
  const { data: economy = {} } = useSWR('/economy/overview', fetcher)

  const indicies = useMemo(() => {
    return [
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
        key: 'treasury_yield',
        name: '10 Year Treasury Rate',
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
        name: 'Inflation Rate (US)',
        icon: InflationIcon,
        fullName: economy.inflation?.name || '',
        value: economy.inflation?.value || '',
        prevValue: economy.inflation?.prevValue || '',
        formatValue: `${Number(economy.inflation?.value || 0).toFixed(3) || '-'} %`,
        unit: '%',
        time: economy.inflation?.time || '',
      },
    ]
  }, [economy])

  return { indicies }
}

export const useIndicate = () => {
  const [activeIndicate, setActiveIndicate] = useState(Economy.inflation)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setActiveIndicate(event.target.value as Economy)

  const indicateOptions = [
    { label: 'Federal Funds Rate', value: Economy.fed_fund_rate },
    { label: 'Consumer Price Index', value: Economy.cpi },
    { label: 'Treasury Rate', value: Economy.treasury_yield },
    { label: 'Inflation', value: Economy.inflation },
  ]

  const { data: indicateResult = initData } = useSWR(`/economy/${activeIndicate}`, fetcher)

  const indicateData = useMemo(() => {
    return {
      name: indicateResult.name,
      unit: indicateResult.unit,
      date: indicateResult.data.map(item => item.date).reverse(),
      value: indicateResult.data.map(item => item.value).reverse(),
    }
  }, [indicateResult])

  const unit = indicateData.unit === 'percent' ? '%' : ''

  return { activeIndicate, handleChange, indicateData, indicateOptions, unit }
}

export const useHistory = (history: { index: number, value: string, date: string, change: string }[] = []) => {
  enum Sort { Latest = 'Latest', Oldest = 'Oldest' }

  // sort
  const [sort, setSort] = useState(Sort.Latest)
  const handleSort = (event: ChangeEvent<HTMLInputElement>) => setSort(event.target.value as Sort)

  const historyList = useMemo(() => {
    return history.sort((a, b) => {
      const aTime = dayjs(a.date).valueOf()
      const bTime = dayjs(b.date).valueOf()
      return sort === Sort.Latest ? bTime - aTime : aTime - bTime
    })
  }, [history, sort])

  // page
  const PageCount = 6
  const [page, setPage] = useState(1)
  const onPage = (_, page: number) => setPage(page)

  const displayHistory = useMemo(() => {
    const end = page * PageCount
    const start = end - PageCount
    return historyList.slice(start, end)
  }, [historyList, page, sort])

  const count = Math.round(historyList.length / PageCount)

  return { sort, handleSort, Sort, displayHistory, onPage, count }
}
