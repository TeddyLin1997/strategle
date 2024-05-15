import styled from 'styled-components'

export const StockIndex = styled.div`
  width: 100%;
  user-select: none;
  background-color: #2a2932;
  display: flex;
`

export const MainIndex = styled.div`
  width: 100%;
  display: flex;
`

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 1.2rem;
  width: 100%;
  max-width: 1200px;
  height: 30vw;
  max-height: 480px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`

export const WorldMap = styled.div`
  max-width: 720px;
  width: 50vw;
  position: relative;
  flex: 1;
  overflow: visible;
  height: 100%;
  display: flex;
  align-items: center;

  & > svg {
    user-select: none;
    position: absolute;
    width: 100%;
    position: relative;

    & > .country-border {
      stroke: #1d1e25;
      stroke-width: 0.4px;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        fill-opacity: 1;
      }
    }
  }
`

export const IndexList = styled.section`
  margin: 10px 0 2rem;
  width: 32%;
  max-width: 320px;
  height: 100%;
  color: #FFF;
  font-weight: 700;
  overflow: auto;

  // 隱藏滾動
  -ms-overflow-style: none; /* 隱藏 IE 和 Edge 的滾動條 */
  scrollbar-width: none; /* 隱藏 Firefox 的滾動條 */
  &::-webkit-scrollbar {
    display: none;
  }


  & > .index-item {
    padding: 0.6rem 1rem;
    display: flex;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all .4s;
    cursor: pointer;
    &:hover {
      background-color: #b289055a;
    }
  }
`
