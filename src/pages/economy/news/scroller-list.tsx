import defaultLogo from '@/assets/images/strategle-background.png'
import { New } from './index'
import Image from '@/components/image'

interface ScrollListProps {
  title?: string
  list: Array<New>
}

const ScrollerList = ({ title, list }: ScrollListProps) => {
  return (
    <div className="px-3">
      { title && <div className="mt-4 font-bold text-3xl text-center">{title}</div> }

      <section className="py-8 w-full flex items-center gap-3 overflow-auto snap-mandatory snap-x">
        {list.map(item => (
          <a key={`${item.source}-${item.title}`} href={item.url} target="_blank" className="pt-4 p-3 block flex-none basis-[calc(20%-0.75rem)] rounded-lg overflow-hidden shadow-lg bg-white snap-center hover:bg-up-extend hover:scale-110 transition-all">
            <div className="mb-3 w-full h-32 rounded-lg overflow-hidden border border-gray-border">
              <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="w-full h-full object-cover bg-gray-border" />
            </div>
            <div className="w-full font-bold text-secondary-dark truncate line-clamp-2 break-all whitespace-normal">{item.title}</div>
          </a>
        ))}
      </section>
    </div>
  )
}

export default ScrollerList
