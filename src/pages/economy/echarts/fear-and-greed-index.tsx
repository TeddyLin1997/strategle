import ReactECharts from 'echarts-for-react'
import useSWR from 'swr'
import { fetcherData } from '@/service/api-request'
import { memo } from 'react'

const initData = {
  label: '',
  value: 0,
  updateTime: '',
}

const FearAndGreedIndexChart = memo(() => {
  const { data: indexData = initData } = useSWR('/economy/summary/fear_and_greed_index', fetcherData)

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
          offsetCenter: [0, '-40%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 0,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 12,
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
          color: '#214d57',
          fontWeight: 'bold',
        },
        detail: {
          fontSize: '1.4rem',
          offsetCenter: [0, '-23%'],
          valueAnimation: true,
          formatter: function (value) {
            return value
          },
          color: 'inherit'
        },
        data: [
          {
            value: indexData.value,
            name: indexData.label
          }
        ]
      }
    ]
  }

  return (
    <div className="px-4 py-2 w-1/2 md:w-1/3 rounded-xl shadow bg-white">
      <div className="text-lg text-secondary font-bold">Fear & Greed Index</div>
      <div className="relative h-full flex items-center justify-center">
        <ReactECharts className="m-auto absolute top-0 bottom-0 w-full !h-[18vw] min-h-[150px] max-h-[280px] pointer-events-none" option={options} />
      </div>
    </div>
  )
})

export default FearAndGreedIndexChart
