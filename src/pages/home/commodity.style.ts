import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1240px;
`

export const Title = styled.div`
  padding: 20px 16px 32px;
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
`

export const CommoditySection = styled.section`
  padding: 0 0 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CommodityItem = styled.article`
  padding: 12px 16px;
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #121214;
  border-radius: 12px;
  background-color: #fafafa;
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
    margin: 0 8px;
    max-width: 64px;
    width: 50%;
    vertical-align: middle;
    text-align: center;
  }

  & .commodity-name {
    margin: 4px 8px 0;
    display: inline-block;
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }

  & .price {
    flex: 1;
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
    font-weight: 500;
    color: #81858c;
  }
`
