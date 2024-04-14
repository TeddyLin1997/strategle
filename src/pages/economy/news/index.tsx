import useSWR from 'swr'
import { fetcher } from '@/service/api-request'
import { useMemo } from 'react'
import { timeFormat } from '@/utils'
import defaultLogo from '@/assets/images/strategle-background.png'
import ScrollerList from './scroller-list'
import Categories from './categories'
import Image from '@/components/image'

// blockchain
// economy_fiscal
// economy_macro
// economy_monetary
// energy_transportation
// finance
// financial_markets
// ipo
// real_estate
// technology

export type New = {
  title: string
  banner_image: string
  source: string
  time_published: string
  url: string
}

const News = () => {
  const { data: news = {} } = useSWR('/news/categories/list', fetcher)

  const deduplicationNews = useMemo(() => {
    const set = new Set()
    const res = {}

    Object.keys(news).forEach(key => {
      res[key] = []

      news[key].forEach(article => {
        if (!set.has(article.title)) res[key].push(article)
        set.add(article.title)
      })
    })

    return res as { [propsName: string]: Array<New> }
  }, [news])

  const industryList = [
    { key: 'technology', name: 'Technology', news: deduplicationNews?.['technology'] || [] },
    { key: 'energy_transportation', name: 'Energy', news: deduplicationNews?.['energy_transportation'] || [] },
    { key: 'finance', name: 'Finance', news: deduplicationNews?.['finance'] || [] },
    { key: 'real_estate', name: 'Real estate', news: deduplicationNews?.['real_estate'] || [] },
  ]

  const mainFeed = deduplicationNews['blockchain']?.find(item => item.source !== 'Benzinga')

  return (
    <div>
      <section className="mx-auto px-2 max-w-screen-xl">
        <div className="mb-6 py-2 px-5 w-full flex rounded-xl shadow bg-white flex-wrap md:flex-nowrap gap-4">

          <article className="pt-3 w-full md:w-3/5 h-fit md:h-auto">
            <a className="relative block w-full h-3/5 cursor-pointer overflow-hidden rounded-lg border" href={mainFeed?.url} target="_blank">
              <Image src={mainFeed?.banner_image || ''} defaultSrc={defaultLogo} className="w-full h-full object-cover hover:brightness-90" />
              <div className="absolute bottom-0 p-3 text-white text-3xl truncate line-clamp-2 break-all whitespace-normal pointer-events-none" style={{ textShadow: '1px 1px 2px #121212' }}>
                {mainFeed?.title || '-'}
              </div>
            </a>

            <div className="mt-4 h-2/5 flex flex-wrap md:flex-nowrap">
              { (deduplicationNews['blockchain'] || []).slice(1, 5).map(item => (
                <a key={`${item.source}-${item.title}`} href={item.url} target="_blank" className="mb-4 px-2 w-1/2 md:w-1/4">
                  <div className="mb-3 w-full h-32 rounded-md overflow-hidden">
                    <Image src={item.banner_image} defaultSrc={defaultLogo} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-fit text-lg font-bold truncate line-clamp-2 md:line-clamp-3 break-all whitespace-normal hover:text-secondary">
                    {item.title}
                  </div>
                </a>
              )) }
            </div>
          </article>

          <article className="w-full md:w-2/5 flex flex-col gap-2" >
            {(deduplicationNews['economy_monetary'] || []).slice(1, 6).map(item => (
              <a key={`${item.source}-${item.title}`} className="p-3 flex-1 flex gap-4 rounded hover:bg-secondary-light transition-all" href={item.url} target="_blank">
                <div className="w-36 h-24 rounded-md overflow-hidden">
                  <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="w-full h-full object-cover" />
                </div>
                <div className="w-[calc(100%-10rem)] flex flex-col justify-between">
                  <div className=" text-lg text-secondary font-bold truncate line-clamp-2 break-all whitespace-normal">{item.title}</div>
                  <div className="flex items-end gap-2">
                    <span className="max-w-1/2 w-fit truncate font-bold">{item.source}</span>
                    <span className="ml-auto max-w-1/2 truncate w-fit text-right text-sm text-[#737373]">
                      {timeFormat(item.time_published, 'YYYY / MM / DD')}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </article>
        </div>
      </section>

      <section>
        <ScrollerList reverse title={'Macroeconomics'} list={deduplicationNews?.['economy_macro']?.reverse() || []} />

        <ScrollerList title={'Finance Markets'} list={deduplicationNews?.['finance'] || []} />

        <ScrollerList reverse list={deduplicationNews?.['financial_markets'] || []} />

        <Categories industryList={industryList} />

        <br />
      </section>

    </div>
  )
}

export default News
