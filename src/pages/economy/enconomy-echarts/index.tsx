import { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useIndicate } from '../hooks'
import { Economy } from '../constant'
import * as S from './style'
import { getChangeColor } from '@/utils'


export default function EconomyChart () {
  const [indicate, setIndicate] = useState(Economy.fed_fund_rate)

  const { indicateData } = useIndicate(indicate)

  const unit = indicateData.unit === 'percent' ? '%' : ''

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: indicateData.date,
      axisLabel: {
        interval: indicate === Economy.inflation ? 6 : 23, // 强制所有标签显示
        margin: 12, // 设置标签与轴线的距离
        formatter: function (value) {
          return value.replaceAll('-', '/')
        }
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: `{value} ${unit}`,
      },
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
        emphasis: {
          areaStyle: { color: '#fff6d8' }
        }
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
    <S.Container>
      <div className="chart">
        <div className="chart-title">{indicateData.name}</div>
        <ReactECharts option={options} />
      </div>

      <div className="chart-list">
        {Object.keys(Economy).map(key => <div key={key} onClick={() => setIndicate(key as Economy)}>{key}</div>) }
      </div>
    </S.Container>
  )
}
