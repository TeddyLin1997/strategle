import useSWR from 'swr'
import { fetcher } from '@/service/api-request'
import { Container, Title, Header, MainNew, Monetary } from './style'
import Divider from '@mui/material/Divider'
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

  return (
    <div>
      <Title>Latest News</Title>

      <Container>
        <Header>
          <MainNew>
            <a className='main-image-container' href={deduplicationNews['blockchain']?.[0].url} target="_blank">
              <Image src={deduplicationNews['blockchain']?.[0].banner_image} defaultSrc={defaultLogo} className='image'  />
              <div className="main-new-title">
                {deduplicationNews['blockchain']?.[0].title}
              </div>
            </a>

            <div className='main-sub-container'>
              { (deduplicationNews['blockchain'] || []).slice(1, 5).map(item => (
                <a key={`${item.source}-${item.title}`} href={item.url} target="_blank" className='main-sub-article'>
                  <div className="main-sub-image">
                    <Image src={item.banner_image} defaultSrc={defaultLogo} className='image' />
                  </div>
                  <div className="main-sub-title">{item.title}</div>
                </a>
              )) }

            </div>
          </MainNew>

          <Monetary>
            {(deduplicationNews['economy_monetary'] || []).slice(1, 7).map(item => (
              <a key={`${item.source}-${item.title}`} className="monetary-article" href={item.url} target="_blank">
                <div className="monetary-image-container">
                  <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="monetary-image" />
                </div>
                <div className="monetary-content">
                  <div className="monetary-title">{item.title}</div>
                  <div className="monetary-tip">
                    <span>{item.source}</span>
                    <span>{timeFormat(item.time_published, 'YYYY / MM / DD')}</span>
                  </div>
                </div>
              </a>
            ))}
          </Monetary>
        </Header>

      </Container>

      <Divider style={{ margin: '0 16px' }} className="divider" />

      <ScrollerList title={'Macroeconomics'} list={deduplicationNews?.['economy_macro'] || []} />

      <ScrollerList title={'Finance Markets'} list={deduplicationNews?.['finance'] || []} />

      <ScrollerList list={deduplicationNews?.['financial_markets'] || []} />

      <Categories industryList={industryList} />

      <br />
      <br />
    </div>
  )
}

export default News
