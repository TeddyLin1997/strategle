import styled from 'styled-components'
import Image from '@/components/image'
import defaultLogo from '@/assets/images/strategle-background.png'
import Divider from '@mui/material/Divider'
import { New } from './index'

const Containers = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;

  & > .divider {
    margin: 16px 0;
  }
`

const CategoryContainer = styled.div`
  width: 49%;
`

const NewsContainer = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`

const Title = styled.div`
  margin-bottom: 6px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #121214;
`

const Article = styled.a`
  padding: 8px 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #121214;
  border-radius: 4px;

  &:hover {
    background-color: #efefef;
  }

  .title {
    margin-top: .4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 768px) {
      height: 58px;
    }
  }

  .image {
    vertical-align: top;
    width: 100%;
    height: 112px;
    border-radius: 4px;
    object-fit: cover;
  }
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
        {news.slice(1, 4).map(item => (
          <Article key={`${item.source}-${item.title}`} href={item.url} target="_blank">
            <Image src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} className="image"  />
            <div className="title">{item.title}</div>
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
  return industryList.length > 0 && (
    <>
      <Containers>
        <Category key={industryList?.[0].key} industry={industryList[0]} />
        <Divider className="divider" orientation="vertical" flexItem />
        <Category key={industryList?.[1].key} industry={industryList?.[1]} />
      </Containers>

      <Containers>
        <Category key={industryList?.[2].key} industry={industryList[2]} />
        <Divider className="divider" orientation="vertical" flexItem />
        <Category key={industryList?.[3].key} industry={industryList?.[3]} />
      </Containers>
    </>
  )
}

export default Categories
