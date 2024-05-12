
import { useMemo, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import WalletContainer from '@/context/walletContext'
import EventTransactionCard from '@/components/transaction-card-event'
import styled from 'styled-components'
import useSWR from 'swr'
import { fetcherData } from '@/service/api-request'

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
  // const { STRAGContract } = ContractContainer.useContainer()

  const { data: transactionEvents = [] } = useSWR(`/api/protocol/transaction/${account}`, fetcherData)


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
          {displayTransactionEvents.map((item: Transaction) => <EventTransactionCard key={item.id} event={item} />)}
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
