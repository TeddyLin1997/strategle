import { ethers, Log, EventLog } from 'ethers'
import lottie from 'lottie-web'
import { USDT_ADDRESS, STRAG_ADDRESS } from '@/global/contract/contract-address'
import tetherTokenAbi from '@/global/contract/UUSDT.json'
import stragleTokenAbi from '@/global/contract/stragle-token.json'
import { useContext, useEffect, useRef, useState } from 'react'
import { formatAmount, formatNumber } from '@/utils'
import { Button } from '@mui/material'
import { WalletContext } from '@/context/walletContext'

const provider = new ethers.BrowserProvider(window.ethereum)

const tetherTokenContract = new ethers.Contract(USDT_ADDRESS, tetherTokenAbi, provider)
const stragleTokenContract = new ethers.Contract(STRAG_ADDRESS, stragleTokenAbi, provider)

const Protocol = () => {
  const wallet = useContext(WalletContext)

  const [owner, setOwner] = useState('')
  useEffect(() => {
    stragleTokenContract.owner().then(res => setOwner(res))
  }, [wallet.account])

  const isOwner = owner === wallet.account

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

  // treasury events
  const [treasuryEvents, setTreasuryEvents]= useState<Array<Log | EventLog>>([])
  useEffect(() => {
    stragleTokenContract.queryFilter('*')
      .then((events) => {
        setTreasuryEvents(events)
        console.log('treasuryEvents', events)
      })
  }, [])

  // treasury admin events
  const [treasuryAdminEvents, setTreasuryAdminEvents]= useState<Array<Log | EventLog>>([])
  useEffect(() => {
    getAdminEvent()

    async function getAdminEvent () {
      const filters = await Promise.all([
        stragleTokenContract.filters.OwnerDeposit().getTopicFilter(),
        stragleTokenContract.filters.OwnerWithdraw().getTopicFilter(),
      ])

      stragleTokenContract.queryFilter(filters.flat())
        .then((events) => {
          setTreasuryAdminEvents(events)
        })
    }
  }, [])



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
        <div className="flex gpa-4">

          <div className="w-3/5">

            <div className="mb-4 font-bold text-3xl">TREASURY</div>
            <div className="relative mb-4 p-4 rounded-lg bg-gray-1">

              <div className="mb-2">USDT Balance :</div>
              <div className="ml-4 mb-4 text-up font-bold text-lg">{tokenInfo.usdtBalance} USDT</div>

              <div className="mb-2">Contract Address : </div>
              <a href={`https://sepolia.etherscan.io/address/${STRAG_ADDRESS}`} target="__blank" className="ml-4 block font-bold text-primary hover:text-white">
                <pre className="truncate">{STRAG_ADDRESS}</pre>
              </a>
            </div>

            <div className="mb-4 font-bold">Recent Transactions : </div>
            <div className="h-[420px] rounded-lg">
              {treasuryEvents.map((item ,index) => (
                <div key={index} className="mb-2 p-4 rounded border border-gray-1 text-sm">{item.transactionHash}</div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Protocol
