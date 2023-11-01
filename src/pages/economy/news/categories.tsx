import styled from 'styled-components'
import Image from '@/components/image'
import defaultLogo from '@/assets/images/strategle-background.png'
import { New } from './index'

const Containers = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CategoryContainer = styled.div`

`

const NewsContainer = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  text-align: center;
`

const Article = styled.article`

`

type Industry = { key: string, name: string, news: New[] }

interface CategoryProps {
  industry: Industry
}

const Category = ({ industry: { name, news } }: CategoryProps) => {
  return (
    <CategoryContainer>
      <Title>{name}</Title>

      <NewsContainer>
        {news.map(item => (
          <Article key={`${item.source}-${item.title}`}>
            {/* {item.title} */}
            {/* <Image src={item.banner_image} defaultSrc={defaultLogo} className='image'  /> */}
          </Article>
        ))}
      </NewsContainer>

    </CategoryContainer>
  )
}

interface CategoriesProps {
  industryList: Array<Industry>
}

const Categories = ({ industryList }: CategoriesProps) => {
  return (
    <Containers>
      {industryList.map(industry => <Category key={industry.key} industry={industry} />)}
    </Containers>
  )
}

export default Categories
