import styled from 'styled-components'

const shadow = 'box-shadow: 2px 2px 10px -3px rgba(0, 0, 0, 0.2);'

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: stretch;

  .chart {
    margin-right: 1.2rem;
    padding: 0 12px 12px;
    width: 75%;
    border-radius: 8px;
    ${shadow}
  }

  .chart-title {
    margin: 12px 0 16px 20px;
    font-size: 24px;
    font-weight: 500;
  }

  .chart-list {
    padding: 1rem;
    width: 25%;
    border-radius: 8px;
    ${shadow}
  }

  .chart-item {

  }
`
