import defaultLogo from '@/assets/images/strategle-background.png'
import { New } from './index'
import Image from '@/components/image'
import { useEffect, useRef, useState } from 'react'

interface ScrollListProps {
  title?: string
  list: Array<New>
  reverse?: boolean
}

const ScrollerList = ({ title, list, reverse }: ScrollListProps) => {
  const scrollEl = useRef<HTMLDivElement>(null)
  const itemEl = useRef<HTMLAnchorElement>(null)

  const [isHovered] = useState(false)
  // const handleMouseEnter = () => setIsHovered(true)
  // const handleMouseLeave = () => setIsHovered(false)

  const distance = useRef(1)

  useEffect(() => {
    if (!scrollEl.current || !itemEl.current) return

    const timerId = setInterval(async () => {
      if ((reverse ? -scrollEl.current!.scrollLeft : scrollEl.current!.scrollLeft) === scrollEl.current!.scrollWidth - scrollEl.current!.offsetWidth) distance.current = reverse ? 1 : -1
      if ((reverse ? -scrollEl.current!.scrollLeft : scrollEl.current!.scrollLeft) === 0) distance.current = reverse ? -1 : 1

      scrollEl.current!.scrollLeft += distance.current * (isHovered ? 0 : 1)
    }, 30)

    return () => clearInterval(timerId)
  }, [list, reverse, isHovered])

  return (
    <div className="px-3">
      { title && <div className="mt-4 font-bold text-3xl text-center">{title}</div> }

      <section
        ref={scrollEl}
        className="pt-4 pb-8 w-full flex items-center gap-3 overflow-auto"
        style={reverse ? { direction: 'rtl' } : {}}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        {list.map(item => (
          <a
            key={`${item.source}-${item.title}`}
            href={item.url}
            target="_blank"
            ref={itemEl}
            className="p-3 block max-w-[236px] flex-none basis-[calc(25%-0.75rem)] lg:basis-[calc(20%-0.75rem)] rounded-lg overflow-hidden shadow bg-white hover:bg-up-extend transition-all"
            style={reverse ? { direction: 'ltr' } : {}}
          >
            <div className="mb-3 w-full h-32 rounded-lg overflow-hidden border border-gray-border">
              <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="w-full h-full object-cover bg-gray-border" />
            </div>
            <div className="w-full h-12 font-bold text-secondary-dark truncate line-clamp-2 break-all whitespace-normal">{item.title}</div>
          </a>
        ))}
      </section>
    </div>
  )
}

export default ScrollerList
