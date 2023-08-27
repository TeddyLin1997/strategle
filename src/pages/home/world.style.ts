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

  & > .world-map {
    max-width: 1240px;
    position: relative;
    flex: 1;
    overflow: hidden;
    height: 35vw;
    max-height: 480px;

    & > svg {
      position: absolute;
      top: -15%;
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
  }

  & > .index-list {
    width: 25%;
    max-width: 320px;

    & > .index-item {
      display: flex;
    }
  }
`
