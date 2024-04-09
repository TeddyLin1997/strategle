import { ethers, EventLog } from 'ethers'
import { useEffect, useState } from 'react'
import { formatNumber } from '@/utils'
import TreasuryImage from '@/assets/images/treasury.png'
import ContractContainer from '@/context/contractContext'
import CardEvent from '@/components/transaction-card-event'
import CardTreasury from '@/components/transaction-card-treasury'

enum Event {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
  Withdraw = 'Withdraw',
  ClaimRewards = 'ClaimRewards'
}

const eventList = [Event.Mint, Event.Stake, Event.Unstake, Event.Withdraw, Event.ClaimRewards]

const Treasury = () => {

  const { STRAG_ADDRESS, USDTContract, STRAGContract } = ContractContainer.useContainer()

  const [usdtBalance, setUsdtBalance] = useState('-')
  useEffect(() => {
    USDTContract.balanceOf(STRAG_ADDRESS).then(res => setUsdtBalance(formatNumber(ethers.formatEther(res))))
  }, [])

  // all transactions
  const [transactionEvents, setTransactionEvents]= useState<Array<EventLog>>([])
  useEffect(() => {
    STRAGContract.queryFilter('*', -50000)
      .then((res) => {
        const events = res.filter((item: any) => eventList.includes(item.eventName)).sort((a, b) => b.blockNumber - a.blockNumber).slice(0, 5) as EventLog[]
        setTransactionEvents(events)
      })
  }, [])

  // treasury USDT transaction
  const [usdtTransferEvents, setUsdtTransferEvents]= useState<Array<EventLog>>([])
  useEffect(() => {
    getUsdtTransferEvents()

    async function getUsdtTransferEvents () {
      const filterFrom = await USDTContract.filters.Transfer(STRAG_ADDRESS, null, null).getTopicFilter()
      const filterTo = await USDTContract.filters.Transfer(null, STRAG_ADDRESS, null).getTopicFilter()

      const res = await Promise.all([
        USDTContract.queryFilter(filterFrom, -50000),
        USDTContract.queryFilter(filterTo, -50000),
      ])

      const events = res.flat().sort((a, b) => b.blockNumber - a.blockNumber).slice(0, 5) as EventLog[]
      setUsdtTransferEvents(events)
    }
  }, [])

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
            <div className="sm:ml-6 mb-4 w-fit text-up sm:text-3xl">$ {usdtBalance} USDT</div>

            <div className="mb-2">Contract Address : </div>
            <a
              className="sm:ml-6 block w-fit text-primary hover:text-white"
              href={`https://sepolia.etherscan.io/address/${STRAG_ADDRESS}`}
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
              {usdtTransferEvents.map((item ,index) => <CardTreasury key={index} event={item}  />)}
            </div>
          </article>

          {/* Recent Transactions */}
          <article className="w-full md:w-1/2">
            <div className="mb-2 font-bold text-lg">Recent Transactions : </div>
            <div className="py-2 rounded-lg overflow-auto">
              {transactionEvents.map((item ,index) => <CardEvent key={index} event={item} />)}
            </div>
          </article>

        </div>
      </section>
    </div>
  )
}

export default Treasury
