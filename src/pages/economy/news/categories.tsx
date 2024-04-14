import Image from '@/components/image'
import defaultLogo from '@/assets/images/strategle-background.png'
import Divider from '@mui/material/Divider'
import { New } from './index'

type Industry = { key: string, name: string, news: New[] }

interface CategoryProps {
  industry: Industry
}

const Category = ({ industry: { name, news } }: CategoryProps) => {
  return (
    <section className="w-full">
      <div className="mb-2 text-center text-secondary-dark text-2xl font-bold">{name}</div>

      <article className="flex gap-3">
        {news.slice(1, 4).map(item => (
          <a key={`${item.source}-${item.title}`} href={item.url} target="_blank" className="block py-3 px-4 w-full rounded-xl bg-white shadow hover:shadow-lg transition-all">
            <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="mb-4 align-top w-full h-28 rounded-lg object-cover"  />
            <div className="h-12 font-bold line-clamp-2 break-all whitespace-normal">{item.title}</div>
          </a>
        ))}
      </article>

    </section>
  )
}

interface CategoriesProps {
  industryList: Array<Industry>
}

const Categories = ({ industryList }: CategoriesProps) => {
  return industryList.length > 0 && (
    <>
      <section className="py-4 flex gap-3 flex-wrap lg:flex-nowrap">
        <Category key={industryList?.[0].key} industry={industryList[0]} />
        <Divider className="divider" orientation="vertical" flexItem />
        <Category key={industryList?.[1].key} industry={industryList?.[1]} />
      </section>

      <section className="py-4 flex gap-3 flex-wrap lg:flex-nowrap">
        <Category key={industryList?.[2].key} industry={industryList[2]} />
        <Divider className="divider" orientation="vertical" flexItem />
        <Category key={industryList?.[3].key} industry={industryList?.[3]} />
      </section>
    </>
  )
}

export default Categories
