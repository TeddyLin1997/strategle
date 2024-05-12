import useSWR from 'swr'
import { useEffect, useMemo, useRef, useState } from 'react'
import { newsCategory } from '@/global/news'
import useTitle from '@/hooks/useTitle'
import ItemNews from '@/components/item-news'
import { fetcher } from '@/service/api-request'
import FeedIcon from '@/assets/icons/feed.svg?react'
import ArrowIcon from '@/assets/icons/arrow.svg?react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ProgressCircular from '@/components/progress-circular'
import Pagination from '@mui/material/Pagination'

const EconomyCategory = () => {
  const isInit = useRef(true)

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const page = Number(params.get('page') || 1)

  const { category } = useParams()
  const categoryDetail = useMemo(() => newsCategory.find(item => item.value === category),[category])
  useTitle(`${categoryDetail?.label} news`)

  const navigate = useNavigate()

  //search
  const [searchParams, setSearchParams] = useState({ page: page, pageSize: 20, category })
  useEffect(() => {
    if (isInit.current) return
    setSearchParams(prev => ({ ...prev, page: 1, category }))
  }, [category])
  useEffect(() => navigate(`?page=${searchParams.page}`), [searchParams.page])

  const handlePage = (_, page: number) => setSearchParams(prev => ({ ...prev, page }))

  const [newsList, setNewsList] = useState({ list: [] as New[], total: 0 })

  const { data, isLoading } = useSWR(`/api/news/${searchParams.category}?page=${searchParams.page}&pageSize=${searchParams.pageSize}`, fetcher)

  useEffect(() => {
    if (data) {
      setNewsList({ list: data.data, total: data.total})
      isInit.current = false
    }
  }, [data])

  const totalPage = Math.floor(newsList.total / searchParams.pageSize)

  return (
    <div className="bg-white min-h-[calc(100vh-56px)]">
      <section className="mx-auto max-w-screen-2xl p-5">
        <div className="mb-6 px-4 flex items-center gap-4">
          <FeedIcon className="w-7 h-7 fill-secondary" />
          <span className="font-black text-4xl">News List</span>
        </div>

        <header className="mb-6 flex flex-wrap gap-3 font-bold">
          {newsCategory.map(item =>
            <Link
              key={item.value}
              to={`/economy/${item.value}`}
              className={`py-1 px-4 rounded-3xl bg-gray-border cursor-pointer ${category === item.value ? 'text-primary !bg-gray-bg' : ''}`}
            >
              {item.label}
            </Link>
          )}
        </header>

        { isLoading &&
          <div className="mx-auto my-20 w-fit">
            <ProgressCircular />
          </div>
        }

        { !isLoading &&
          <>
            <div className="mb-3 px-4 hidden sm:flex font-bold text-lg">
              <span className="flex items-center gap-2">
                <em>Page</em>
                <em className="text-secondary font-black">{searchParams.page}, </em>
                <em>Total Page</em>
                <em className="text-secondary font-black">{totalPage}</em>
              </span>

              { searchParams.page !== totalPage &&
                <div
                  onClick={() => setSearchParams(prev => ({ ...prev, page: prev.page + 1 }))}
                  className="ml-auto flex items-center gap-2 cursor-pointer hover:text-text-blue hover:fill-text-blue"
                >
                  <span>Next Page</span>
                  <ArrowIcon className="w-5 h-5" />
                </div>
              }

            </div>
            <section className="mb-4 px-2 flex flex-wrap justify-between gap-y-4">
              { newsList.list.map(news => <ItemNews key={news.id} news={news} isNewsList />) }
            </section>

            <div className="p-2 flex justify-center rounded">
              <Pagination
                page={searchParams.page}
                count={Math.floor(newsList.total / searchParams.pageSize)}
                siblingCount={2}
                onChange={handlePage} className="history-pagination !fill-white" color="primary" variant="text" shape="rounded"/>
            </div>
          </>
        }
      </section>

    </div>
  )
}

export default EconomyCategory
