import { ethers, EventLog } from 'ethers'
import lottie from 'lottie-web'
import { USDT_ADDRESS, STRAG_ADDRESS } from '@/global/contract/contract-address'
import tetherTokenAbi from '@/global/contract/UUSDT.json'
import stragleTokenAbi from '@/global/contract/stragle-token.json'
import { useEffect, useRef, useState } from 'react'
import { formatAmount, formatNumber, truncateSlice } from '@/utils'
import { Button } from '@mui/material'
// import { WalletContext } from '@/context/walletContext'
import ReceiveIcon from '@/assets/images/receive-arrow.png'
import TreasuryImage from '@/assets/images/treasury.png'
import SendIcon from '@/assets/images/send-arrow.png'
import LinkIcon from '@/assets/icons/external-link.svg?react'
import MintIcon from '@/assets/icons/event-mint.svg?react'
import StakeIcon from '@/assets/icons/event-stake.svg?react'
import UnstakeIcon from '@/assets/icons/event-unstake.svg?react'
import WithdrawIcon from '@/assets/icons/event-withdraw.svg?react'
import ClaimIcon from '@/assets/icons/event-claim.svg?react'
import TimeIcon from '@/assets/icons/time.svg?react'
import Copy from '@/components/copy'
import dayjs from 'dayjs'

const provider = new ethers.BrowserProvider(window.ethereum)

const tetherTokenContract = new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, provider)
const stragleTokenContract = new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, provider)


enum Event {
  Mint = 'Mint',
  Stake = 'Stake',
  Unstake = 'Unstake',
  Withdraw = 'Withdraw',
  ClaimRewards = 'ClaimRewards'
}

const eventList = [Event.Mint, Event.Stake, Event.Unstake, Event.Withdraw, Event.ClaimRewards]

const eventMap = {
  [Event.Mint]: {
    value: (event: EventLog) => formatAmount(formatNumber(ethers.formatEther(event.args[1]))),
    icon: <div className="mr-2 w-8 h-8 flex bg-[#F9BCC0] rounded-full"><MintIcon className="m-auto w-6 h-6 fill-[#DF1522]" /></div>,
    unit: 'STRAG',
  },
  [Event.Stake]: {
    value: (event: EventLog) => formatNumber(formatNumber(ethers.formatEther(event.args[1]))),
    icon: <div className="mr-2 w-8 h-8 flex bg-secondary rounded-full"><StakeIcon className="m-auto w-7 h-7 fill-secondary-light" /></div>,
    unit: 'STRAG',
  },
  [Event.Unstake]: {
    value: () => '-',
    icon: <div className="mr-2 w-8 h-8 flex bg-[#C8E2EC] rounded-full"><UnstakeIcon className="m-auto w-7 h-7 fill-[#30728C]" /></div>,
    unit: 'STRAG',
  },
  [Event.Withdraw]: {
    value: (event: EventLog) => formatAmount(formatNumber(ethers.formatEther(event.args[1]))),
    icon: <div className="mr-2 w-8 h-8 flex bg-down-extend rounded-full"><WithdrawIcon className="m-auto w-5 h-5 fill-down" /></div>,
    unit: 'STRAG',
  },
  [Event.ClaimRewards]: {
    value: (event: EventLog) => formatAmount(formatNumber(ethers.formatEther(event.args[1]))),
    icon: <div className="mr-2 w-8 h-8 flex bg-up-extend rounded-full"><ClaimIcon className="m-auto w-6 h-6 fill-up" /></div>,
    unit: 'USDT',
  },
}

const Protocol = () => {
  // const wallet = useContext(WalletContext)

  // const [owner, setOwner] = useState('')
  // useEffect(() => {
  //   stragleTokenContract.owner().then(res => setOwner(res))
  // }, [wallet.account])

  // const isOwner = owner === wallet.account

  // token info
  const [tokenInfo, setTokenInfo] = useState({
    totalSupply: '-',
    totalStake: '-',
    usdtBalance: '-',
  })
  useEffect(() => {
    stragleTokenContract.totalSupply().then(res => setTokenInfo(prev => ({ ...prev, totalSupply: formatAmount(formatNumber(ethers.formatEther(res))) })) )
    stragleTokenContract.balanceOf(STRAG_ADDRESS).then(res => setTokenInfo(prev => ({ ...prev, totalStake: formatAmount(formatNumber(ethers.formatEther(res))) })) )
    tetherTokenContract.balanceOf(STRAG_ADDRESS).then(res => setTokenInfo(prev => ({ ...prev, usdtBalance: formatAmount(formatNumber(ethers.formatEther(res))) })) )
  }, [])

  const bannerAnimation = useRef(null)
  useEffect(() => {
    if (!bannerAnimation.current) return
    lottie.loadAnimation({
      container: bannerAnimation.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/public/animation/banner.json' // the path to the animation json
    })
  }, [])

  // all transactions
  const [transactionEvents, setTransactionEvents]= useState<Array<EventLog>>([])
  useEffect(() => {
    stragleTokenContract.queryFilter('*')
      .then((res) => {
        const events = res.filter((item: any) => eventList.includes(item.eventName)).sort((a, b) => b.blockNumber - a.blockNumber).slice(0, 5) as EventLog[]
        events.forEach(item => getBlockTimestamp(item.blockHash))
        setTransactionEvents(events)
      })
  }, [])

  // treasury USDT transaction
  const [usdtTransferEvents, setUsdtTransferEvents]= useState<Array<EventLog>>([])
  useEffect(() => {
    getUsdtTransferEvents()

    async function getUsdtTransferEvents () {
      const filterFrom = await tetherTokenContract.filters.Transfer(STRAG_ADDRESS, null, null).getTopicFilter()
      const filterTo = await tetherTokenContract.filters.Transfer(null, STRAG_ADDRESS, null).getTopicFilter()

      const res = await Promise.all([
        tetherTokenContract.queryFilter(filterFrom),
        tetherTokenContract.queryFilter(filterTo),
      ])

      const events = res.flat().sort((a, b) => b.blockNumber - a.blockNumber).slice(0, 5) as EventLog[]
      events.forEach(item => getBlockTimestamp(item.blockHash))
      setUsdtTransferEvents(events)
    }
  }, [])


  // block timestamp
  const [blockTimestamp, setBlockTimestamp] = useState({})
  const getBlockTimestamp = async (blockHash: string) => {
    const block = await provider.getBlock(blockHash)
    setBlockTimestamp(prev => {
      const res = {...prev}
      res[blockHash] = block?.timestamp
      return res
    })
  }




  return (
    <div className="bg-bg min-h-[calc(100vh-100px)] text-white">
      <div className="mx-auto p-5 max-w-[1200px]">

        {/* header */}
        <div className="mb-8 md:mb-14 w-full flex">
          <div className="w-full md:w-3/5">
            <pre className="mb-4 text-4xl font-bold leading-normal">{'Decentralized \nAI Investment protocol.'}</pre>

            <div className="mb-4 flex items-center font-bold">
              <div className="w-1/2">
                <div className="mb-2">TVL：</div>
                <div className="ml-4 text-2xl text-primary-light">{ tokenInfo.totalStake } $USD</div>
              </div>
              <div className="w-1/2">
                <div className="mb-2">Total mint：</div>
                <div className="ml-4 text-2xl text-primary-light">{ tokenInfo.totalSupply } STRAG</div>
              </div>
            </div>

            <div className="mb-6 font-semibold">
              Stragle Protocol empowers users to stake <span className="text-primary text-xl" >STRAG tokens</span>  for AI-driven trading returns. By exchanging <span className="text-up text-xl">USDT</span> , investors can access potential gains of up to <span className="text-primary text-xl">12%</span> annually. With flexible profit withdrawals and a focus on security and transparency, it offers a seamless crypto investment experience.
            </div>

            <Button variant="contained" className="!font-bold">Get Started</Button>
          </div>

          {/* banner animation */}
          <div ref={bannerAnimation} className="ml-auto hidden w-2/5 md:block" />
        </div>

        <hr className="mb-8 md:mb-10 border-gray-1" />

        {/* treasury */}
        <pre className="mb-6 w-full text-center font-bold text-4xl tracking-wider">TREASURY</pre>

        <section className="mb-10">
          <header className="mb-6 relative gap-4 flex items-center font-bold">

            <div className="w-3/5 p-4 rounded-3xl bg-gray-bg">
              <div className="mb-2">USDT Balance :</div>
              <div className="ml-6 mb-4 w-fit text-up text-3xl">$ {tokenInfo.usdtBalance} USDT</div>

              <div className="mb-2">Contract Address : </div>
              <a href={`https://sepolia.etherscan.io/address/${STRAG_ADDRESS}`} target="__blank" className="ml-6 block w-fit text-primary hover:text-white">
                <pre className="truncate">{STRAG_ADDRESS}</pre>
              </a>
            </div>
            <div className="w-2/5">
              <img src={TreasuryImage} alt="" className="mx-auto w-[360px]" />
            </div>

          </header>


          <div className="flex gap-8">
            {/* Treasury USDT Transaction */}
            <article className="w-1/2">
              <div className="mb-2 font-bold text-lg">Treasury USDT Transactions : </div>
              <div className="py-2 rounded-lg overflow-auto">
                {usdtTransferEvents.map((item ,index) => {
                  const isReceive = STRAG_ADDRESS === item.args[1]
                  return (
                    <div key={index} className="mb-2 px-3 py-2 rounded border border-gray-1 text-sm shadow-lg">
                      <div className="mb-2 flex items-center">
                        <div className="py-1">
                          <img src={isReceive ? ReceiveIcon : SendIcon} className="mr-2 w-6 h-6 bg-white rounded-full" style={{ transform: isReceive ? 'rotate(90deg)' : 'roatte(0deg)' }} />
                        </div>
                        <span className="font-bold text-lg">{ isReceive ? 'Deposit' : 'withdraw' }</span>
                        <div className="ml-auto flex items-center gap-2 text-xs text-gray-secondary">
                          <TimeIcon className="w-4 h-4 fill-primary-light" />
                          <span className="font-bold">{blockTimestamp[item.blockHash] ? dayjs(blockTimestamp[item.blockHash] * 1000).format('YYYY-MM-DD HH:mm:ss') : '-' }</span>
                        </div>
                      </div>

                      <div className="h-[48px] flex items-end">
                        <div>
                          <div className="mb-2 font-bold flex gap-2">
                            <span>{ isReceive ? 'From :' : 'To :' }</span>
                            <span className="whitespace-nowrap">
                              {isReceive ? truncateSlice(item.args[0]) : truncateSlice(item.args[1])} &nbsp;
                              <Copy text={isReceive ? item.args[0] : item.args[1]} />
                            </span>
                          </div>
                          <div className="font-bold flex flex-wrap gap-2">
                            <span>Tx Hash : </span>
                            <span className="whitespace-nowrap">
                              {truncateSlice(item.transactionHash)} &nbsp;
                              <Copy text={item.transactionHash} />
                            </span>
                          </div>
                        </div>

                        <div className="ml-auto text-right">
                          <div className={isReceive ? 'text-lg font-bold text-up' : 'text-lg font-bold text-down'}>{formatAmount(formatNumber(ethers.formatEther(item.args[2])))} U</div>
                          <a href={`https://sepolia.etherscan.io/tx/${item.transactionHash}`} target="__blank" className="flex justify-end items-center gap-1 hover:opacity-60 transition-all">
                            <span  className="text-xs" >View on Scan</span>
                            <LinkIcon className="w-4 h-4 fill-primary-light" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>

            {/* Recent Transactions */}
            <article className="w-1/2">
              <div className="mb-2 font-bold text-lg">Recent Transactions : </div>
              <div className="py-2 rounded-lg overflow-auto">
                {transactionEvents.map((item ,index) => {
                  return (
                    <div key={index} className="mb-2 px-3 py-2 rounded border border-gray-1 text-sm shadow-lg">
                      <div className="mb-2 flex items-center">
                        { eventMap[item.eventName]?.icon || '-' }
                        <span className="font-bold text-lg">{item.eventName}</span>
                        <div className="ml-auto flex items-center gap-2 text-xs text-gray-secondary">
                          <TimeIcon className="w-4 h-4 fill-primary-light" />
                          <span className="font-bold">{blockTimestamp[item.blockHash] ? dayjs(blockTimestamp[item.blockHash] * 1000).format('YYYY-MM-DD HH:mm:ss') : '-' }</span>
                        </div>
                      </div>

                      <div className="h-[48px] flex items-end">
                        <div>
                          <div className="mb-2 font-bold flex gap-2">
                            <span>{`Address : ${truncateSlice(item.address)}` }</span>
                            <Copy text={item.address} />
                          </div>
                          <div className="font-bold flex gap-2">
                            <span>Tx Hash : {truncateSlice(item.transactionHash)}</span>
                            <Copy text={item.transactionHash} />
                          </div>
                        </div>

                        <div className="ml-auto text-right">
                          <div className="mb-2 font-bold text-secondary-light">{`${eventMap[item.eventName]?.value(item)} ${eventMap[item.eventName]?.unit}`}</div>
                          <a href={`https://sepolia.etherscan.io/tx/${item.transactionHash}`} target="__blank" className="flex justify-end items-center gap-1 hover:opacity-60 transition-all">
                            <span  className="text-xs" >View on Scan</span>
                            <LinkIcon className="w-4 h-4 fill-primary-light" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>

          </div>
        </section>


      </div>
    </div>
  )
}

export default Protocol
