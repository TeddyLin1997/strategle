import styled from 'styled-components'

const shadow = 'box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);'

export const ChartContainer = styled.div`
  margin-top: 1.8rem;
  display: flex;
  align-items: stretch;

  .chart {
    margin-right: 16px;
    padding: 0 12px;
    width: 60%;
    border-radius: 8px;
  }

  .chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .chart-title {
    margin-bottom: 12px;
    font-weight: 500;
    color: #306F7D;
  }

  .fear-greed-index-container {
    flex: 1;
    border-radius: 8px;
  }

  .fear-greed-index-title {
    color: #306F7D;
    font-weight: 500;
  }
`

export const HistoryContainer = styled.div`
  margin: 1.8rem 0;
  display: flex;
  align-items: stretch;

  .history {
    margin-right: 16px;
    width: 60%;

    .history-header {
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
    }

    .history-title {
      margin-bottom: 12px;
      font-weight: 500;

      span {
        color: #306F7D;
      }
    }

    .history-list {
      margin-top: 16px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: .8rem;
      height: 400px;
      overflow: auto;
    }

    .history-item {
      padding: .8rem 1rem;
      display: flex;
      border-radius: 4px;
      ${shadow}

      .history-date {
        width: 20%;
      }
      .history-value {
        width: 40%;
        text-align: right;
      }
      .history-change {
        flex: 1;
        text-align: right;
      }
    }
  }

  .other {
    flex: 1;
  }
`
