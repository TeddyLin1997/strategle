import { useMemo } from 'react'
import { useIndicate, useHistory } from '../hooks'
import FearAndGreedIndexChart from './fear-and-greed-index'
import IndicateCharts from './indicate-charts'
import MainQuotes from './main-quotes'
import { getChangeColor } from '@/utils'
import Pagination from '@mui/material/Pagination'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import * as S from './style'
import useWindowSize from '@/hooks/useWindowSize'

export default function EconomyChart () {
  const { windowSize, Size } = useWindowSize()

  const isSmall = windowSize === Size.Small
  const width = isSmall ? '164px' : '204px'

  const { activeIndicate, handleChange, indicateData, indicateOptions, unit } = useIndicate()

  const history = useMemo(() => indicateData.value.map((value, index) => ({
    index: index,
    value,
    date: indicateData.date[index],
    change: indicateData.value[index - 1] ? Number(indicateData.value[index] - indicateData.value[index - 1]).toFixed(2) : '-'
  })), [indicateData])

  const { displayHistory, onPage, count, sort, handleSort, Sort } = useHistory(history)

  return (
    <div className="chart-container">
      <S.ChartContainer>
        <div className="chart">
          <div className="chart-header">
            <div className="chart-title">{indicateData.name}</div>

            <TextField
              label="Indicate"
              style={{ width: width }}
              value={activeIndicate}
              onChange={handleChange}
              select
              size="small"
            >
              {indicateOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <IndicateCharts
            activeIndicate={activeIndicate}
            indicateData={indicateData}
            unit={unit}
          />
        </div>

        <div className="fear-greed-index-container">
          <div className="fear-greed-index-title">Fear & Greed Index</div>
          <FearAndGreedIndexChart />
        </div>
      </S.ChartContainer>

      <S.HistoryContainer>
        <div className="history">
          <div className="history-header">
            <div className="history-title">
              <span>{indicateData.name}</span>
              <div className="history-sub-title">History</div>
            </div>

            <TextField
              style={{ width: width }}
              value={sort}
              onChange={handleSort}
              size="small"
              select
            >
              <MenuItem value={Sort.Latest}>{Sort.Latest}</MenuItem>
              <MenuItem value={Sort.Oldest}>{Sort.Oldest}</MenuItem>
            </TextField>
          </div>

          <section className="history-list">
            {displayHistory.map(item => {
              const change = Number(item.change)
              return (
                <article className="history-item" key={item.index}>
                  <div className="history-date">{String(item.date).replaceAll('-', ' / ')}</div>
                  <div className="history-value" style={{ color: getChangeColor(change) }}>{Number(item.value || 0).toFixed(3)} {unit}</div>
                  <div className="history-change" style={{ color: getChangeColor(change) }}>{`${change >= 0 ? '+' : ''} ${item.change}`} {unit}</div>
                </article>
              )
            }
            )}
          </section>

          <Pagination
            count={count}
            onChange={onPage}
            className="history-pagination"
            color="primary"
            variant="outlined"
            shape="rounded"
            siblingCount={1}
            size={isSmall ? 'small' : 'medium'}
          />
        </div>

        <MainQuotes />

      </S.HistoryContainer>
    </div>
  )
}
