
import { useEffect, useMemo, useState } from 'react'
import { EventLog } from 'ethers'
import Pagination from '@mui/material/Pagination'
import ContractContainer from '@/context/contractContext'
import WalletContainer from '@/context/walletContext'
import EventTransactionCard from '@/components/transaction-card-event'
import styled from 'styled-components'

const PageContainer = styled.div`
  .Mui-selected {
    color: black !important;
  }

  button {
    color: white !important;
  }

  svg {
    fill: white;
  }
`

const TxHistory = () => {
  const { account } = WalletContainer.useContainer()
  const { STRAGContract } = ContractContainer.useContainer()

  // transactions
  const [transactionEvents, setTransactionEvents]= useState<Array<EventLog>>([])
  useEffect(() => {
    getTransactions()

    async function getTransactions () {
      const filterMint = await STRAGContract.filters.Mint(account, null, null).getTopicFilter()
      const filterStake = await STRAGContract.filters.Stake(account, null, null).getTopicFilter()
      const filterUnstake = await STRAGContract.filters.Unstake(account, null).getTopicFilter()
      const filterClaimRewards = await STRAGContract.filters.ClaimRewards(account, null, null).getTopicFilter()

      const res = await Promise.all([
        STRAGContract.queryFilter(filterMint, -50000),
        STRAGContract.queryFilter(filterStake, -50000),
        STRAGContract.queryFilter(filterUnstake, -50000),
        STRAGContract.queryFilter(filterClaimRewards, -50000),
      ])

      const events = res.flat().sort((a, b) => b.blockNumber - a.blockNumber) as EventLog[]
      setTransactionEvents(events)
    }
  }, [account])


  // page
  const PageCount = 5
  const [page, setPage] = useState(1)
  const onPage = (_, page: number) => setPage(page)

  const displayTransactionEvents = useMemo(() => {
    const end = page * PageCount
    const start = end - PageCount
    return transactionEvents.slice(start, end)
  }, [transactionEvents, page])

  const count = Math.round(transactionEvents.length / PageCount)

  return (
    <div className="w-full md:w-1/2">
      {displayTransactionEvents.length === 0 && <div className="p-4 text-center text-xl font-bold">No transaction record</div>}

      { displayTransactionEvents.length !== 0 &&
        <div>
          {displayTransactionEvents.map((item ,index) => <EventTransactionCard key={index} event={item} />)}
          { displayTransactionEvents.length > PageCount &&
              <PageContainer className="p-2 flex justify-center rounded">
                <Pagination count={count} onChange={onPage} className="history-pagination !fill-white" color="primary" variant="text" shape="rounded" siblingCount={1}/>
              </PageContainer>
          }
        </div>
      }
    </div>

  )
}

export default TxHistory
