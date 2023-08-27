import styled from 'styled-components'

export const StockIndex = styled.div`
  width: 100%;
  user-select: none;
  background-color: #1d1e25;
  display: flex;
`

export const MainIndex = styled.div`
  width: 100%;
  display: flex;
`

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1240px;
  display: flex;
  align-items: center;
`

export const WorldMap = styled.div`
  max-width: 1240px;
  position: relative;
  flex: 1;
  overflow: hidden;
  height: 35vw;
  max-height: 600px;
  display: flex;
  align-items: center;

  & > svg {
    position: absolute;
    width: 100%;
    position: relative;

    & > .country-border {
      stroke: #1d1e25;
      stroke-width: 1;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        filter: contrast(300%);
      }
    }
  }
`

export const IndexList = styled.section`
  padding: 10px 0;
  width: 25%;
  max-width: 320px;
  height: 35vw;
  max-height: 600px;
  color: #FFF;
  overflow: auto;


  & > .index-item {
    padding: 0.6rem 1rem;
    display: flex;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all .4s;
    &:hover {
      background-color: #b289055a;
    }

    & > .index-item-name {

    }
    & > .index-item-price {

    }
  }
`
