import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  padding: 1.2rem;
  width: 100%;
  max-width: 1200px;
`

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TopList = styled.section`
  width: 50%;

  & > .title {
    padding: 0.4rem 1rem 1.2rem;
    font-size: 1.4rem;
    font-weight: 900;
  }

  & > .header {
    padding: 0 1rem;
    height: 1.2rem;
    font-size: 0.8rem;
    color: #81858c;

    &:hover {
      background-color: unset !important;
      cursor: unset;
    }
  }
`

export const TopItem = styled.div<{ $isup?: number }>`
  position: relative;
  margin-bottom: 0.6rem;
  padding: 0.7rem 1rem;
  width: 100%;
  height: 3.375rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-weight: 700;
  overflow: hidden;
  cursor: pointer;

  & .background {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    animation: tick .6s linear;
    animation-fill-mode: forwards;
    background-color: ${ props => props.$isup ? '#D0F2F2' : '#FFE2E2' };
    z-index: 0;
    pointer-events: none;

    @keyframes tick {
      to {
        background-color: transparent;
      }
    }
  }

  &:hover {
    background-color: #fff6d8 !important;
  }

  & > .top-icon {
    margin-right: 0.8rem;
    width: 2rem;
    height: auto;
    border-radius: 50%;
    z-index: 1;
  }

  & > .top-name {
    flex: 1;
    z-index: 1;
  }
  & > .top-price {
    width: 30%;
    z-index: 1;
  }
  & > .top-change-percent {
    margin-left: auto;
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
  }

  & .top-flag {
    margin-left: .4rem;
    width: 20px;
    height: auto;
  }
`
