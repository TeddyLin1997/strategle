import styled from 'styled-components'
import defaultLogo from '@/assets/images/strategle-background.png'
import { New } from './index'
import Image from '@/components/image'

const Container = styled.div`
  padding: 0 12px;
  width: 100%;
`

const Section = styled.section`
  padding: 1.2rem 0;
  min-width: 100%;
  white-space: nowrap;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  & > a:not(:last-child) {
    margin-right: 16px;
  }
`

const Title = styled.div`
  margin-top: 2rem;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
`

const Article = styled.a`
  position: relative;
  display: inline-block;
  width: 256px;
  height: 164px;
  vertical-align: middle;
  border-radius: 6px;
  background-color: #000;
  box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  transition: all .2s;
  cursor: pointer;

  &:hover {
    filter: brightness(80%);
  }

  @media screen and (max-width: 768px) {
    width: calc(50vw - 28px);
  }

  & > .article-title {
    margin-top: -4px;
    padding: 0 12px;
    color: #fff;
    font-size: .875rem;

    display: -webkit-box;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 768px) {
      margin-top: 0;
  }
  }

  & > .article-image {
    width: 100%;
    height: 70%;
    object-fit: cover;
    filter: brightness(95%);
  }
`

interface ScrollListProps {
  title?: string
  list: Array<New>
}



const ScrollerList = ({ title, list }: ScrollListProps) => {
  return (
    <Container>
      { title && <Title>{title}</Title> }

      <Section>
        {list.map(item => (
          <Article key={`${item.source}-${item.title}`} href={item.url} target="_blank">
            <Image className="article-image" src={item.banner_image?.includes('benzinga') ? defaultLogo : item.banner_image} defaultSrc={defaultLogo} />
            <div className="article-title">{item.title}</div>
          </Article>
        ))}
      </Section>
    </Container>
  )
}

export default ScrollerList
