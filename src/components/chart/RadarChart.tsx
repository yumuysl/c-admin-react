import type { EChartsOption } from 'echarts'

import { RadarChart as RadarChartComponent } from 'echarts/charts'
import {
  LegendComponent,
  RadarComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useMemo } from 'react'

import { useEcharts } from '@/hooks/useEcharts'

echarts.use([
  RadarChartComponent,
  TooltipComponent,
  LegendComponent,
  RadarComponent,
  CanvasRenderer,
])

interface RadarDataItem {
  name: string
  value: number[]
}

interface RadarChartProps {
  indicator?: Array<{ name: string, max: number }>
  data?: RadarDataItem[]
  height?: string
  colors?: string[]
}

export default function RadarChart({
  indicator = [],
  data = [],
  height = '16rem',
  colors = [],
}: RadarChartProps) {
  const {
    chartRef,
    isDark,
    initChart,
    updateChart,
  } = useEcharts()

  const chartOptions = useMemo<EChartsOption>(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        data: data.map(item => item.name),
        bottom: '0',
        textStyle: {
          color: isDark ? '#fff' : '#333',
        },
      },
      radar: {
        indicator,
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
        axisLine: {
          lineStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
        axisName: {
          color: '#999',
        },
      },
      series: [
        {
          type: 'radar',
          data: data.map((item, index) => ({
            name: item.name,
            value: item.value,
            symbolSize: 4,
            lineStyle: {
              width: 2,
              color: colors[index],
            },
            itemStyle: {
              color: colors[index],
            },
            areaStyle: {
              color: colors[index],
              opacity: 0.2,
            },
          })),
        },
      ],
    }
  }, [data, indicator, colors, isDark])

  // 监听图表选项和暗模式变化
  useEffect(() => {
    updateChart(chartOptions)
  }, [chartOptions, isDark, updateChart])

  // 组件挂载后初始化图表
  useEffect(() => {
    const timer = setTimeout(() => {
      initChart(chartOptions)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={chartRef} className="radar-chart" style={{ height }} />
  )
}
