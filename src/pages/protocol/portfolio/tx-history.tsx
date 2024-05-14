import EventTransactionCard from '@/components/transaction-card-event'

const TxHistory = ({ transactionList = [] }: { transactionList: Transaction[] }) => {

  return (
    <div className="w-full md:w-1/2">
      {transactionList.length === 0 && <div className="p-4 text-center text-xl font-bold">No transaction record</div>}

      <div>
        {transactionList.map((item: Transaction) => <EventTransactionCard key={item.id} event={item} />)}
      </div>
    </div>

  )
}

export default TxHistory
