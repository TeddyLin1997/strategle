import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  padding: 1.2rem;
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
    padding: 0.8rem 1rem 1.4rem;
    font-size: 1.4rem;
    font-weight: 900;
  }

  & > .header {
    padding: 0 1rem;
    font-size: 0.8rem;
    color: #81858c;

    &:hover {
      background-color: unset;
      cursor: unset;
    }
  }
`

export const TopItem = styled.div`
  margin-bottom: 0.6rem;
  padding: 0.7rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #fff6d8;
  }

  & > .top-icon {
    margin-right: 0.8rem;
    width: 2rem;
    height: auto;
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
