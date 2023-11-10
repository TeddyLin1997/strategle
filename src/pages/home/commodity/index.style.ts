import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  padding: 0 1.6rem 1rem;
  width: 100%;
  max-width: 1200px;
`

export const Title = styled.div`
  padding: 1.4rem 1rem 1.6rem;
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
`

export const CommoditySection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const CommodityItem = styled.article`
  margin-bottom: 1.6rem;
  padding: 16px 16px 16px 8px;
  width: 31%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: #F2F2F2;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    background-color: #fff6d8;
  }

  & .name {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  & .commodity-icon {
    margin: 0 0.5rem;
    width: 3rem;
    vertical-align: middle;
    text-align: center;
  }

  & .commodity-name {
    margin: 0.25rem 0.5rem 0;
    width: 60px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    white-space: nowrap;
  }

  & .price {
    width: 50%;
  }

  & .commodity-price {
    text-align: right;
    font-weight: bold;
    font-size: 1.2rem;

    & > .unit {
      font-size: 0.7rem;
    }
  }

  & .commodity-description {
    text-align: right;
    font-size: 0.8rem;
    font-weight: 700;
    color: #81858c;
  }
`
