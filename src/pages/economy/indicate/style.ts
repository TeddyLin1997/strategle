import styled from 'styled-components'

export const Header = styled.header`
  padding: 0 12px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  & > .indicies {
    padding: .6rem 1rem;
    width: calc(25% - 15px);

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
        color: #214d57;
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
  }
`
