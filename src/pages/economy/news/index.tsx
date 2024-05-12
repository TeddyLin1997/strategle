import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { fetcherData } from '@/service/api-request'
import { timeFormat } from '@/utils'
import defaultLogo from '@/assets/images/strategle-background.png'
import ScrollerList from './scroller-list'
import Categories from './categories'
import Image from '@/components/image'
import dayjs from 'dayjs'
import ArrowIcon from '@/assets/icons/arrow.svg?react'

const News = () => {
  const { data: news = {} } = useSWR('/api/news/all', fetcherData)

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

  const blockChainFeedList =  useMemo(() => {
    return (deduplicationNews['blockchain'] || []).filter(item => item.source !== 'Benzinga' && item.banner_image)
  }, [deduplicationNews['blockchain']])

  const mainFeed = blockChainFeedList?.[0] || deduplicationNews['blockchain']?.[0]


  const score = (Math.floor((mainFeed?.overall_sentiment_score || 0) * 100) + 100) / 2
  const sentiment = (mainFeed?.overall_sentiment_label || '-').replace('Somewhat-', '')

  const classMap = {
    Bullish: 'bg-up text-up-extend',
    Bearish: 'bg-up text-up-extend',
    Neutral: 'bg-primary text-primary-extend',
  }

  return (
    <div>
      <section className="mx-auto px-2 max-w-screen-xl">

        <div className="mb-4 flex items-center gap-2 justify-between">
          <div className="text-3xl font-bold">Blockchain News</div>
          <Link to="/economy/blockchain" className="flex items-center font-bold gap-1 text-text-blue transition-all">
            <span>Read More</span>
            <ArrowIcon className="w-4 h-4 fill-text-blue" />
          </Link>
        </div>
        <div className="mb-10 w-full flex flex-wrap md:flex-nowrap gap-4">

          <a className="relative block w-full md:w-3/5 cursor-pointer overflow-hidden rounded-2xl border" href={mainFeed?.url} target="_blank">
            <Image src={mainFeed?.banner_image || ''} defaultSrc={defaultLogo} className="w-full h-full object-cover hover:brightness-90" />

            <div className="p-4 absolute w-full bottom-0 h-3/4 flex bg-gradient-to-t from-black to-transparent">
              <div className="mt-auto">
                <div className="mb-4 flex items-center gap-4">
                  <div className={`px-3 py-1 w-fit rounded-3xl font-bold ${classMap[sentiment]}`}>{`${sentiment} ${score}%`}</div>
                  <div className="w-8 h-8 leading-8 font-bold text-center bg-primary rounded-full">{mainFeed?.source[0] || '-'}</div>
                  <span className="flex-1 font-bold text-xl truncate text-white">{mainFeed?.source || '-'}</span>

                  <span className="ml-auto text-sm text-gray-hover">
                    {mainFeed?.time_published ? dayjs(mainFeed?.time_published).format('YYYY-MM-DD HH:mm:ss') : null}
                  </span>
                </div>

                <p className="text-white text-3xl truncate line-clamp-2 break-all whitespace-normal pointer-events-none" style={{ textShadow: '1px 1px 2px #121212' }}>
                  {mainFeed?.title || '-'}
                </p>
              </div>
            </div>
          </a>

          <article className="w-full md:w-2/5 flex flex-col gap-6" >
            {blockChainFeedList.filter(item => item.banner_image).slice(1, 6).map(item => (
              <a key={`${item.source}-${item.title}`} className="flex gap-4" href={item.url} target="_blank">
                <div className="w-56 md:w-40 h-full rounded-md overflow-hidden">
                  <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="w-auto h-full object-cover" />
                </div>
                <div className="w-[calc(100%-15rem)] md:w-[calc(100%-11rem)] flex flex-col">
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 leading-5 text-center bg-primary rounded-full">
                      {item.source[0]}
                    </div>
                    <span className="max-w-1/2 w-fit truncate font-bold">{item.source}</span>
                    <span className="ml-auto max-w-1/2 truncate w-fit text-xs text-right text-[#737373]">
                      {timeFormat(item.time_published, 'YYYY / MM / DD')}
                    </span>
                  </div>
                  <div className="text-secondary text-lg font-bold truncate">{item.title}</div>
                  <div className="mt-auto font-bold truncate line-clamp-2 break-all whitespace-normal">{item.summary}</div>
                </div>
              </a>
            ))}
          </article>
        </div>
      </section>

      <section>
        <ScrollerList category="economy_macro" title={'Macroeconomics'} list={deduplicationNews?.['economy_macro']?.reverse() || []} reverse />

        <ScrollerList category="finance" title={'Finance Markets'} list={deduplicationNews?.['finance'] || []} />

        <ScrollerList category="financial_markets" list={deduplicationNews?.['financial_markets'] || []} reverse />

        <Categories industryList={industryList} />

        <br />
      </section>

    </div>
  )
}

export default News
