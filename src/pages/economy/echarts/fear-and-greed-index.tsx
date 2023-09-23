import ReactECharts from 'echarts-for-react'
import useSWR from 'swr'
import { fetcher } from '@/service/api-request'
import { memo } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IndexChart = styled(ReactECharts)`
  margin: auto;
  position: absolute;
  width: 100%;
  height: 22vw !important;
  top: 0;
  bottom: 0;
  pointer-events: none;
`

const initData = {
  label: '',
  value: 0,
  updateTime: '',
}

const FearAndGreedIndexChart = memo(() => {
  const { data: indexData = initData } = useSWR('/economy/fear_and_greed_index', fetcher)

  const options = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '100%',
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#f43545'],
              [0.45, '#ff8902'],
              [0.55, '#fad818'],
              [0.75, '#00ba71'],
              [1, '#00c2de'],
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '30%',
          width: 10,
          offsetCenter: [0, '-50%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 16,
          lineStyle: {
            color: 'auto',
            width: 4
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 12,
          distance: -44,
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 10) {
              return 'Extreme Fear'
            } else if (value === 30) {
              return 'Fear'
            } else if (value === 50) {
              return 'Neutral'
            } else if (value === 70) {
              return 'Greed'
            } else if (value === 90) {
              return 'Extreme Greed'
            }
            return ''
          }
        },
        title: {
          offsetCenter: [0, '-5%'],
          fontSize: '1.2rem',
          color: '#214d57',
        },
        detail: {
          fontSize: '1.6rem',
          offsetCenter: [0, '-23%'],
          valueAnimation: true,
          formatter: function (value) {
            return value
          },
          color: 'inherit'
        },
        data: [
          {
            value: 56,
            name: indexData.label
          }
        ]
      }
    ]
  }
  return (
    <Wrapper>
      <IndexChart option={options} />
    </Wrapper>
  )
})

export default FearAndGreedIndexChart
