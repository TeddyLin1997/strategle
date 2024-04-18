import Image from '@/components/image'
import defaultLogo from '@/assets/images/strategle-background.png'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'

type Industry = { key: string, name: string, news: New[] }

interface CategoryProps {
  industry: Industry
}

const Category = ({ industry: { name, news } }: CategoryProps) => {
  return (
    <div className="mb-6 px-2 w-full md:w-1/2 2xl:w-1/4">
      <div className="mb-2 text-center text-secondary-dark text-2xl font-bold">{name}</div>

      <section className="flex flex-col gap-4">
        {news.length === 0 && Array.from(Array(4)).map((_, index) => (
          <div key={index} className="block p-3 w-full rounded-xl bg-white shadow hover:shadow-lg transition-all">
            <div className="flex gap-4">
              <section className="min-w-44 w-1/3">
                <Skeleton variant="rounded" className="mb-4 w-full !h-28" />
                <div className="flex gap-2">
                  <Skeleton variant="text" className="w-16" />
                  <Skeleton variant="text" className="w-16" />
                </div>
              </section>

              <section className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Skeleton variant="circular" className="!w-8 !h-8" />
                  <Skeleton variant="text" className="w-40" />
                </div>

                <Skeleton variant="rounded" className="w-full !h-[4.5rem]" />

                <div className="flex items-center justify-between">
                  <Skeleton variant="text" className="w-20" />
                  <Skeleton variant="text" className="w-10" />
                </div>

                <Skeleton variant="text" />
              </section>
            </div>
          </div>
        ))}

        {news.length > 0 && news.slice(0, 4).map(item => {
          const score = (Math.floor(item.overall_sentiment_score * 100) + 100) / 2
          const progressValue = Math.max(score, 10)
          const sentiment = item.overall_sentiment_label.replace('Somewhat-', '')

          const textClassMap = {
            Bullish: { theme: 'success', text: 'text-up' },
            Bearish: { theme: 'error', text: 'text-down' },
            Neutral: { theme: 'primary', text: 'text-primary' },
          }
          return (
            <a key={`${item.source}-${item.title}`} href={item.url} target="_blank" className="block p-3 w-full rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <section className="min-w-44 w-1/3">
                  <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="mb-4 w-full h-28 rounded-lg object-cover"  />
                  <div className="flex gap-2">
                    { item.topics.slice(0, 2).map(item => <div key={item.topic} className="px-3 py-1 h-fit text-xs rounded-3xl bg-gray-border">{item.topic.split(' ')[item.topic.split(' ').length - 1]}</div>) }
                  </div>
                </section>

                <section className="flex-1">
                  <div className="mb-2 flex items-center gap-2 font-bold">
                    <div className="w-8 h-8 border leading-8 text-center border-primary rounded-full">
                      {item.source[0]}
                    </div>
                    <span className="flex-1 truncate">{item.source}</span>
                  </div>

                  <p className="mb-2 px-2 w-full h-[4.5rem] truncate line-clamp-3 break-all whitespace-normal">
                    {item.summary}
                  </p>

                  <section className="px-1">
                    <div className={`flex items-center justify-between font-bold ${textClassMap[sentiment].text}`}>
                      <span>{sentiment}</span>
                      <span>{score} %</span>
                    </div>

                    <LinearProgress variant="determinate" value={progressValue} className="!h-2 rounded-xl" color={textClassMap[sentiment].theme} />
                  </section>
                </section>
              </div>
            </a>
          )})}
      </section>

    </div>
  )
}

interface CategoriesProps {
  industryList: Array<Industry>
}

const Categories = ({ industryList }: CategoriesProps) => {
  return industryList.length > 0 && (
    <>
      <section className="p-4 flex flex-wrap 2xl:flex-nowrap">
        <Category key={industryList?.[0].key} industry={industryList[0]} />
        <Divider className="md:hidden" orientation="vertical" flexItem />
        <Category key={industryList?.[1].key} industry={industryList?.[1]} />
        <Divider className="md:hidden" orientation="vertical" flexItem />
        <Category key={industryList?.[2].key} industry={industryList[2]} />
        <Divider className="md:hidden" orientation="vertical" flexItem />
        <Category key={industryList?.[3].key} industry={industryList?.[3]} />
      </section>
    </>
  )
}

export default Categories
