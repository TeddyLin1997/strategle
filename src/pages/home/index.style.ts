import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #FFF;
`

export const StartTrade = styled.div`
  padding: 0 20px;
  background-color: #fff6d8;

  & .container {
    margin: 0 auto;
    padding: 12px 20px;
    width: 100%;
    max-width: 920px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  & .button {
    margin-right: 24px;

    & > .tip {
      margin-bottom: 1.4rem;
      font-size: 1.4rem;
      font-weight: bold;
    }
  }

  & .img {
    width: 35%;
    max-width: 400px;
  }
`
