import { useMemo } from 'react'
import Divider from '@mui/material/Divider'
import up from '@/assets/images/up.png'
import down from '@/assets/images/down.png'
import MarketContainer from '@/context/marketContext'
import Skeleton from '@mui/material/Skeleton'

const Forex = ({ forexList }) => {
  const { ticker } = MarketContainer.useContainer()

  const forexListNode = useMemo(() => forexList.map(item => {
    const { price = 0, open = 0 } = ticker[item.symbol] || {}
    const isUp = price >= open
    return (
      <article key={item.symbol} onClick={() => window.open(item.url)} className="py-3 flex items-center font-bold cursor-pointer">
        <img className="mr-2" src={item.icon} />
        <div>{item.name}</div>
        <div className={`ml-auto ${ isUp ? 'text-up' : 'text-down' }`}>{Number(price).toFixed(5) || '-'}</div>
        <img className="ml-2 w-6 h-auto" src={isUp ? up : down} />
      </article>
    )
  }), [forexList])

  return (
    <div className="m-auto py-6 w-full max-w-screen-lg">
      <Divider />

      <header className="py-6 px-4 text-3xl font-black text-center">Forex Exchange</header>

      { forexList.length === 0 &&
        <section className="py-6 flex justify-between flex-wrap">
          <div className="w-full sm:w-[30%]">
            <div className="px-12 sm:px-4">
              {Array.from(Array(3)).map((_, index) => (
                <article key={index} className="py-3 flex items-center font-bold gap-4">
                  <Skeleton variant="text" className="w-12" />
                  <Skeleton variant="text" className="w-32" />
                  <Skeleton variant="text" className="ml-auto w-32" />
                  <Skeleton variant="circular" className="w-6 h-6" />
                </article>
              ))}
            </div>
          </div>
          <Divider className="!my-4 " orientation="vertical" flexItem />
          <div className="w-full sm:w-[30%]">
            <div className="px-12 sm:px-4">
              {Array.from(Array(3)).map((_, index) => (
                <article key={index} className="py-3 flex items-center font-bold gap-4">
                  <Skeleton variant="text" className="w-12" />
                  <Skeleton variant="text" className="w-32" />
                  <Skeleton variant="text" className="ml-auto w-32" />
                  <Skeleton variant="circular" className="w-6 h-6" />
                </article>
              ))}
            </div>
          </div>
          <Divider className="!my-4 " orientation="vertical" flexItem />
          <div className="w-full sm:w-[30%]">
            <div className="px-12 sm:px-4">
              {Array.from(Array(3)).map((_, index) => (
                <article key={index} className="py-3 flex items-center font-bold gap-4">
                  <Skeleton variant="text" className="w-12" />
                  <Skeleton variant="text" className="w-32" />
                  <Skeleton variant="text" className="ml-auto w-32" />
                  <Skeleton variant="circular" className="w-6 h-6" />
                </article>
              ))}
            </div>
          </div>
        </section>
      }

      { forexList.length > 0 &&
        <section className="py-6 flex justify-between flex-wrap">
          <div className="w-full sm:w-[30%]">
            <div className="px-12 sm:px-4">
              {forexListNode.slice(0, 3)}
            </div>
          </div>
          <Divider className="!my-4 " orientation="vertical" flexItem />
          <div className="w-full sm:w-[30%]">
            <div className="px-12 sm:px-4">
              {forexListNode.slice(3, 6)}
            </div>
          </div>
          <Divider className="!my-4 " orientation="vertical" flexItem />
          <div className="w-full sm:w-[30%]">
            <div className="px-12 sm:px-4">
              {forexListNode.slice(6, 9)}
            </div>
          </div>
        </section>
      }
    </div>
  )
}

export default Forex
