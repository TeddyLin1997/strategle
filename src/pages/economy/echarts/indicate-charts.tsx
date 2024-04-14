import ReactECharts from 'echarts-for-react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { getChangeColor } from '@/utils'
import { Economy } from '../constant'
import { useIndicate } from '../hooks'
import useWindowSize from '@/hooks/useWindowSize'

const IndicateCharts = () => {

  const { windowSize, Size } = useWindowSize()

  const isSmall = windowSize === Size.Small
  const width = isSmall ? '164px' : '204px'

  const { activeIndicate, handleChange, indicateData, indicateOptions, unit } = useIndicate()

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
    <div className="px-4 py-2 hidden md:block w-1/3 bg-white rounded-xl shadow">
      <div className="mb-2 flex justify-between items-center gap-4">
        <div className="mb-3 font-bold text-lg text-secondary truncate">
          {indicateOptions.find(item => item.value === activeIndicate)?.label || '-'}
        </div>

        <TextField
          label="Indicate"
          style={{ width: width, maxWidth: '40%' }}
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
      <ReactECharts style={{ height: '160px' }} option={options} />
    </div>
  )
}

export default IndicateCharts
