import useSWR from 'swr'
import { fetcher } from '@/service/api-request'
import CpiIcon from '@/assets/images/economy/cpi.png'
import InflationIcon from '@/assets/images/economy/inflation.png'
import FederalIcon from '@/assets/images/economy/federal.png'
import TreasuryIcon from '@/assets/images/economy/treasury-yield.png'
import { useMemo } from 'react'
import { Economy } from './constant'

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
        key: 'treasury_yield',
        name: '10-Year Treasury Rate',
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
        name: 'Inflation Rate - US',
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

export const useIndicate = (indicate: Economy) => {
  const { data: indicateResult = initData } = useSWR(`/economy/${indicate}`, fetcher)

  const indicateData = useMemo(() => {
    return {
      name: indicateResult.name,
      unit: indicateResult.unit,
      date: indicateResult.data.map(item => item.date).reverse(),
      value: indicateResult.data.map(item => item.value).reverse(),
    }
  }, [indicateResult])

  return { indicateData }
}
