import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  padding: 0 1.6rem;
  width: 100%;
  max-width: 1200px;
`

export const Title = styled.div`
  padding: 1.25rem 1rem 0;
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
`

export const ForexList = styled.section`
  padding: 1.6rem 0;
  display: flex;
  justify-content: space-between;

  & .forex-group {
    flex: 1;
  }

  & .forex-divider {
    margin: 1.6rem 2.8rem;
    @media screen and (max-width: 1200px) {
      margin: 1.6rem;
    }
  }
`

export const Forex = styled.article<{ $isUp: boolean }>`
  padding: .8rem 0;
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;

  & .forex-icon {
    margin-right: .6rem;
  }
  & .forex-price {
    margin-left: auto;
    color: ${ props => props.$isUp ? '#0ecb81' : '#FF6E6E' };
  }

  & .forex-flag {
    margin-left: .4rem;
    width: 1.4rem;
    height: auto;
  }
`
