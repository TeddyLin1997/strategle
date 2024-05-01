import useSWR from 'swr'
import { useEffect, useMemo, useState } from 'react'
import { newsCategory } from '@/global/news'
import useTitle from '@/hooks/useTitle'
import ItemNews from '@/components/item-news'
import { fetcher } from '@/service/api-request'
import LogoIcon from '@/assets/images/logo-icon.png'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ProgressCircular from '@/components/progress-circular'
import Pagination from '@mui/material/Pagination'

const EconomyCategory = () => {
  const { category } = useParams()
  const categoryDetail = useMemo(() => newsCategory.find(item => item.value === category),[category])
  useTitle(`${categoryDetail?.label} news`)

  //search
  const [searchParams, setSearchParams] = useState({ page: 1, pageSize: 20, category })
  useEffect(() => setSearchParams(prev => ({ ...prev, page: 1, category })), [category])

  const handlePage = (_, page: number) => setSearchParams(prev => ({ ...prev, page }))

  const [newsList, setNewsList] = useState({
    list: [] as New[],
    total: 0,
  })
  const { data, isLoading } = useSWR(`/news/${searchParams.category}?page=${searchParams.page}&pageSize=${searchParams.pageSize}`, fetcher)

  useEffect(() => {
    if (data) setNewsList({ list: data.data, total: data.total})
  }, [data])

  const totalPage = Math.floor(newsList.total / searchParams.pageSize)

  return (
    <div className="bg-white min-h-[calc(100vh-56px)]">
      <section className="mx-auto max-w-screen-2xl p-5">
        <div className="mb-6 px-4 flex items-center gap-4 font-bold text-3xl">
          <img src={LogoIcon} className="w-8 h-8" />
          <span>News List</span>
        </div>

        <header className="mb-6 flex flex-wrap gap-3 font-bold">
          {newsCategory.map(item =>
            <Link
              key={item.value}
              className={`py-1 px-4 rounded-3xl bg-gray-border cursor-pointer ${category === item.value ? 'text-primary !bg-gray-bg' : ''}`}
              to={`/economy/${item.value}`}
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
              { searchParams.page !== totalPage && <span onClick={() => setSearchParams(prev => ({ ...prev, page: prev.page + 1 }))} className="ml-auto cursor-pointer hover:text-secondary">{'Next Page >'}</span> }
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
