import ReactECharts from 'echarts-for-react'
import { getChangeColor } from '@/utils'
import { Economy } from '../constant'

const IndicateCharts = ({ activeIndicate, indicateData, unit }) => {
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

  return <ReactECharts style={{ height: '200px' }} option={options} />
}

export default IndicateCharts
