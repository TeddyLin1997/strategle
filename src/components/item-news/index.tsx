import defaultLogo from '@/assets/images/strategle-background.png'
import Image from '@/components/image'
import LinearProgress from '@mui/material/LinearProgress'
import { forwardRef, Ref } from 'react'

interface ItemNewsProps {
  news: New
  isNewsList?: boolean
}

const ItemNews = forwardRef(({ news, isNewsList }: ItemNewsProps, ref: Ref<HTMLDivElement>) => {
  const classStyle = isNewsList ?
    'flex flex-col flex-none basis-[100%] sm:basis-[calc(25%-0.75rem)] lg:basis-[calc(20%-0.75rem)] rounded-lg overflow-hidden shadow hover:shadow-lg transition-all cursor-pointer border' :
    'flex flex-col max-w-80 min-w-64 flex-none basis-[calc(50%-0.75rem)] sm:basis-[calc(25%-0.75rem)] rounded-lg overflow-hidden shadow hover:shadow-lg transition-all cursor-pointer border'

  const score = (Math.floor(news.overall_sentiment_score * 100) + 100) / 2
  const progressValue = Math.max(score, 10)
  const sentiment = news.overall_sentiment_label.replace('Somewhat-', '')

  const textClassMap = {
    Bullish: { theme: 'success', text: 'text-up' },
    Bearish: { theme: 'error', text: 'text-down' },
    Neutral: { theme: 'primary', text: 'text-primary' },
  }

  return (
    <article ref={ref} className={classStyle} style={{ direction: 'ltr' }} onClick={() => window.open(news.url)}>

      <div className="w-full h-40 bg-gray-border border-b border-gray-border">
        <Image src={news.banner_image?.includes('benzinga') ? defaultLogo : news.banner_image} defaultSrc={defaultLogo} className="w-full h-full object-cover" draggable="false" />
      </div>

      <div className="p-3">
        <section className="mb-2 flex items-center gap-2 font-bold">
          <div className="w-8 h-8 border leading-8 text-center border-primary rounded-full">
            {news.source[0]}
          </div>
          <span className="flex-1 truncate">{news.source}</span>
        </section>

        <section className="mb-4 px-2 w-full h-[4.5rem] truncate line-clamp-3 break-all whitespace-normal">
          {news.summary}
        </section>

        <section className="mb-4 flex gap-2">
          { news.topics.slice(0, 3).map(topic => <div key={topic} className="px-3 py-1 h-fit text-sm rounded-3xl bg-gray-border">{topic.split(' ')[topic.split(' ').length - 1]}</div>) }
        </section>

        <section className="px-1">
          <div className={`flex items-center justify-between font-bold ${textClassMap[sentiment].text}`}>
            <span>{sentiment}</span>
            <span>{score} %</span>
          </div>

          <LinearProgress variant="determinate" value={progressValue} className="!h-2 rounded-xl" color={textClassMap[sentiment].theme} />
        </section>
      </div>
    </article>
  )
})

export default ItemNews
