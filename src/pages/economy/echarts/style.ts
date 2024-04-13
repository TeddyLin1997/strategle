import styled from 'styled-components'

const shadow = 'box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);'

export const ChartContainer = styled.div`

  .chart-title {
    margin-bottom: 12px;
    font-weight: 700;
    color: #306F7D;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export const HistoryContainer = styled.div`
  margin: 1.8rem 0;
  display: flex;
  align-items: stretch;

  .history {
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    width: 60%;

    .history-header {
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
    }

    .history-title {
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      span {
        color: #306F7D;
      }
    }

    .history-list {
      margin-top: 16px;
      padding: 0 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: .8rem;
      overflow: visible;
    }

    .history-pagination {
      margin: 16px auto 0;
      padding: 0 12px .6rem;
      width: fit-content;
    }

    .history-item {
      padding: .8rem 1rem;
      display: flex;
      border-radius: 4px;
      ${shadow}

      .history-date {
        width: 40%;
      }
      .history-value {
        width: 30%;
        text-align: right;
      }
      .history-change {
        flex: 1;
        text-align: right;
      }
    }
  }
`
