import TreasuryImage from '@/assets/images/treasury.png'
import { STRAG_ADDRESS } from '@/global/contract/contract-address'
import CardEvent from '@/components/transaction-card-event'
import CardTreasury from '@/components/transaction-card-treasury'
import useSWR from 'swr'
import { fetcherData } from '@/service/api-request'

const Treasury = ({ treasuryBalance }: { treasuryBalance: string }) => {

  const { data: transactions } = useSWR('/api/protocol/transaction', fetcherData)

  return (
    <div className="Protocol-Treasury">
      {/* Treasury Info */}
      <pre className="mb-6 w-full text-center font-bold text-4xl tracking-wider">TREASURY</pre>

      <section className="mb-10">
        <header className="mb-8 mx-auto p-6 gap-4 flex w-full md:w-2/3 max-w-[680px] items-stretch font-bold bg-gray-bg rounded-3xl">

          <div className="hidden lg:flex w-[224px]">
            <img src={TreasuryImage} className="mx-auto w-full h-auto object-contain" />
          </div>

          <div className="flex-1">
            <div className="mb-2">USDT Balance :</div>
            <div className="sm:ml-6 mb-4 w-fit text-up sm:text-3xl">$ {treasuryBalance} USDT</div>

            <div className="mb-2">Contract Address : </div>
            <a
              className="sm:ml-6 block w-fit text-primary hover:text-white"
              href={`https://arbiscan.io/address/${STRAG_ADDRESS}`}
              target="__blank"
            >
              <pre className="truncate">{STRAG_ADDRESS}</pre>
            </a>
          </div>

        </header>

        <div className="flex gap-8 flex-wrap md:flex-nowrap">
          {/* Treasury USDT Transaction */}
          <article className="w-full md:w-1/2">
            <div className="mb-2 font-bold text-lg">Treasury USDT Transactions : </div>
            <div className="py-2 rounded-lg overflow-auto">
              {(transactions?.treausryTxns || []).map((item: Transaction) => <CardTreasury key={item.id} event={item}  />)}
            </div>
          </article>

          {/* Recent Transactions */}
          <article className="w-full md:w-1/2">
            <div className="mb-2 font-bold text-lg">Recent Transactions : </div>
            <div className="py-2 rounded-lg overflow-auto">
              {(transactions?.protocolTxns || []).map((item: Transaction) => <CardEvent key={item.id} event={item} />)}
            </div>
          </article>

        </div>
      </section>
    </div>
  )
}

export default Treasury
