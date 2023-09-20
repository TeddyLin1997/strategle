import styled from 'styled-components'

export const Title = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 500;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 2px solid #efefef;
  background-color: #FFF;

  & > .indicies {
    padding: 1rem 1.4rem;
    width: 25%;
    border-right: 2px solid #efefef;

    .header {
      display: flex;
      align-items: center;
      font-size: 1.125rem;
      font-weight: 500;

      .icon-container {
        padding: 0.2rem 0.4rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        border-radius: 6px;
        background-color: #D0F2F2;

        img {
          margin: auto;
          width: 100%;
          height: auto;
        }
      }

      .title-container {
        margin-left: auto;
        text-align: right;
        flex: 1;
      }

      .date {
        font-size: .8rem;
        color: #81858c;
      }
    }

    .footer {
      margin-top: .6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: right;

      .flag {
        width: 44px;
        height: auto;
      }

      .value {
        font-size: 1.6rem;
        font-weight: bold;
      }
      .change {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }

  & > .indicies:last-of-type {
    border-right: none;
  }
`
