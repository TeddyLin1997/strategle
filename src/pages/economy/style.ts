import styled from 'styled-components'

export const Title = styled.div`
  margin-bottom: 1rem;
  padding: 0 12px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
`

export const FedNew = styled.a`
  margin-left: auto;
  width: 40%;
  font-size: 12px;
  text-align: right;
  color: #306F7D;
  text-decoration: underline;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  & > .indicies {
    padding: .6rem 1rem;
    width: 25%;
    border-radius: 8px;
    box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);

    .header {
      display: flex;
      align-items: center;
      font-size: 1.125rem;
      font-weight: 700;

      .icon-container {
        margin-right: .8rem;
        padding: 0.2rem 0.4rem;
        width: 3rem;
        height: 3rem;
        display: flex;
        border-radius: 6px;
        background-color: #D0F2F2;
        flex: 0 0 3rem;

        img {
          margin: auto;
          width: 100%;
          height: auto;
        }
      }

      .title-container {
        width: calc(100% - 3.8rem);
        margin-left: auto;
        text-align: right;
        flex: 1;
      }

      .title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .date {
        font-size: .8rem;
        color: #81858c;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      text-align: right;

      .flag {
        width: 2.1rem;
        height: auto;
      }

      .value {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .change {
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.2rem;
      }
    }
  }
`
