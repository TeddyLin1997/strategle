import { useEffect, useRef } from 'react'
import Skeleton from '@mui/material/Skeleton'
import ItemNews from '@/components/item-news'

interface ScrollListProps {
  title?: string
  list: Array<New>
  reverse?: boolean
}

const ltrStyle = { direction: 'ltr' } as const
const rtlStyle = { direction: 'rtl' } as const

const ScrollerList = ({ title, list, reverse }: ScrollListProps) => {
  const scrollEl = useRef<HTMLDivElement>(null)
  const itemEl = useRef<HTMLDivElement>(null)

  const distance = useRef(1)

  useEffect(() => {
    if (!scrollEl.current || !itemEl.current) return

    const timerId = setInterval(async () => {
      if (Math.floor(reverse ? -scrollEl.current!.scrollLeft : scrollEl.current!.scrollLeft) === scrollEl.current!.scrollWidth - scrollEl.current!.offsetWidth) distance.current = reverse ? 1.5 : -1.5
      if (Math.floor(reverse ? -scrollEl.current!.scrollLeft : scrollEl.current!.scrollLeft) === 0) distance.current = reverse ? -1.5 : 1.5
      scrollEl.current!.scrollLeft += distance.current
    }, 40)

    return () => clearInterval(timerId)
  }, [list, reverse])

  return (
    <div className="">
      { title && <div className="mt-4 font-bold text-3xl text-center">{title}</div> }

      <section
        ref={scrollEl}
        className="pt-4 pb-8 w-full flex items-center gap-3 overflow-auto"
        style={reverse ? rtlStyle : {}}
      >
        {list.length > 0 && list.map(news => <ItemNews ref={itemEl} key={`${news.source}-${news.title}`} news={news} />)}

        {list.length === 0 && Array.from(Array(20)).map((_, index) => (
          <article
            ref={itemEl}
            key={index}
            className="flex flex-col max-w-80 min-w-64 flex-none basis-[calc(50%-0.75rem)] sm:basis-[calc(25%-0.75rem)] rounded-lg overflow-hidden shadow hover:shadow-lg transition-all cursor-pointer"
            style={ltrStyle}
          >
            <Skeleton variant="rectangular" className="w-full !h-40" />

            <div className="p-3">
              <section className="mb-2 flex items-center gap-2 font-bold">
                <Skeleton variant="circular" className="w-8 !h-8" />
                <Skeleton variant="text" className="flex-1" />
              </section>

              <Skeleton variant="rectangular" className="mb-4 w-full !h-[4.5rem]" />

              <section className="mb-4 flex gap-2">
                { Array.from(Array(3)).map((_,index) => <Skeleton key={index} variant="rounded" className="px-3 py-1 w-20 !h-8 text-sm !rounded-3xl bg-gray-border" />) }
              </section>

              <section className="px-1">
                <div className="flex items-center justify-between">
                  <Skeleton variant="text" className="w-10" />
                  <Skeleton variant="text" className="w-10" />
                </div>

                <Skeleton variant="rounded" className="flex-1 !h-3" />
              </section>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default ScrollerList
