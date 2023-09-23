import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { useIndicate, useHistory } from '../hooks'
import { Economy } from '../constant'
import FearAndGreedIndexChart from './fear-and-greed-index'
import { getChangeColor } from '@/utils'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import * as S from './style'

export default function EconomyChart () {
  const { activeIndicate, handleChange, indicateData, indicateOptions, unit } = useIndicate()

  const history = useMemo(() => {
    return indicateData.value.map((value, index) => ({
      index: index,
      value,
      date: indicateData.date[index],
      change: indicateData.value[index - 1] ? Number(indicateData.value[index] - indicateData.value[index - 1]).toFixed(2) : '-'
    }))
  }, [indicateData])
  const { historyList, sort, handleSort, Sort } = useHistory(history)

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: indicateData.date,
      axisLabel: {
        margin: 12,
        interval: activeIndicate === Economy.inflation ? 6 : 23,
        formatter: (value) => value.replaceAll('-', '/'),
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: { formatter: `{value} ${unit}` },
      name: unit,
    },
    series: [
      {
        type: 'line',
        data: indicateData.value,
        areaStyle: { color: '#FDE281' },
        lineStyle: { width: 3, color: '#FFC408' },
        symbolSize: 10,
        itemStyle: { color: '#FFC408' },
        emphasis: { areaStyle: { color: '#fff6d8' } },
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const prevIndex = params[0].dataIndex - 1
        const prevValue = indicateData.value[prevIndex] || 0

        const change = params[0].value - prevValue
        const isUp = change >= 0

        let tooltipHtml = '<div>'
        tooltipHtml += `<div style="font-weight:bold;">${params[0].name}</div>`
        tooltipHtml += `
          <h3 style="margin-top:4px;font-size:14px;text-align:right;color:#b28905;display:flex;align-items:center;">
            <span style="display:inline-block;background:#FFC408;border-radius:50%;width:10px;height:10px;"></span>&nbsp; &nbsp;
            <span style="color:${getChangeColor(change)};display:${prevIndex === -1 ? 'none' : 'inline'};">
              ${Number(params[0].value).toFixed(3)}${unit}
              (${isUp ? '+' : ''}${Number(change).toFixed(2)}${unit})
            </span>
          </h3>
        `
        tooltipHtml += '</div>'
        return tooltipHtml
      }
    },
  }

  return (
    <div className="chart-container">
      <S.ChartContainer>
        <div className="chart">
          <div className="chart-header">
            <div className="chart-title">{indicateData.name}</div>

            <TextField
              label="Indicate"
              style={{ width: '204px'}}
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
          <ReactECharts style={{ height: '200px' }} option={options} />
        </div>

        <div className="fear-greed-index-container">
          <div className="fear-greed-index-title">Fear & Greed Index</div>
          <FearAndGreedIndexChart />
        </div>
      </S.ChartContainer>

      <S.HistoryContainer>
        <div className="history">
          <div className="history-header">
            <div className="history-title">History : <span>{indicateData.name}</span></div>

            <TextField
              style={{ width: '204px'}}
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
            {historyList.map(item => {
              const change = Number(item.change)
              return (
                <article className="history-item" key={item.index}>
                  <div className="history-date">{item.date}</div>
                  <div className="history-value" style={{ color: getChangeColor(change) }}>{Number(item.value).toFixed(3)} {unit}</div>
                  <div className="history-change" style={{ color: getChangeColor(change) }}>{`${change >= 0 ? '+' : ''} ${item.change}`} {unit}</div>
                </article>
              )
            }
            )}
          </section>
        </div>


        <div className="other">
          各種報價
          <div>BTC</div>
          <div>黃金</div>
          <div>石油</div>
          <div>天然氣</div>
          <div></div>
        </div>

      </S.HistoryContainer>
    </div>
  )
}
