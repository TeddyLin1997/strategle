import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  padding: 20px;
  width: 100%;
  max-width: 1240px;
`

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TopList = styled.section`
  width: 50%;

  & > .title {
    padding: 10px 16px 24px;
    font-size: 1.4rem;
    font-weight: 900;
  }

  & > .header {
    padding: 0 16px;
    font-size: 0.8rem;
    color: #81858c;

    &:hover {
      background-color: unset;
      cursor: unset;
    }
  }
`

export const TopItem = styled.div`
  margin-bottom: 8px;
  padding: 10px 16px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #fff6d8;
  }

  & > .top-icon {
    margin-right: 12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  & > .top-name {
    flex: 1;
  }
  & > .top-price {
    width: 30%;
  }
  & > .top-change-percent {
    width: 20%;
    text-align: right;
  }
`
