import type { EChartsOption } from 'echarts'

import { theme } from 'antd'
import { ScatterChart as ScatterChartComponent } from 'echarts/charts'
import {
  AxisPointerComponent,
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useMemo } from 'react'

import { useEcharts } from '@/hooks/useEcharts'

echarts.use([
  ScatterChartComponent,
  GridComponent,
  TooltipComponent,
  AxisPointerComponent,
  CanvasRenderer,
])

interface ScatterChartProps {
  data?: { value: number[] }[]
  color?: string
  height?: string
  symbolSize?: number
}

export default function ScatterChart({
  data = [],
  color,
  height = '16rem',
  symbolSize = 14,
}: ScatterChartProps) {
  const {
    chartRef,
    isDark,
    initChart,
    updateChart,
    getAxisLineStyle,
    getAxisLabelStyle,
    getAxisTickStyle,
    getSplitLineStyle,
  } = useEcharts()

  const { token } = theme.useToken()

  const chartOptions = useMemo<EChartsOption>(() => {
    const computedColor = color || token.colorPrimary

    return {
      grid: {
        top: 10,
        right: 10,
        bottom: 0,
        left: 3,
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        formatter(params: any) {
          return `(${params.value[0]}, ${params.value[1]})`
        },
      },
      xAxis: {
        type: 'value',
        axisTick: getAxisTickStyle(),
        axisLabel: getAxisLabelStyle(),
        axisLine: getAxisLineStyle(),
        splitLine: getSplitLineStyle(),
      },
      yAxis: {
        type: 'value',
        axisLabel: getAxisLabelStyle(),
        axisLine: getAxisLineStyle(),
        axisTick: getAxisTickStyle(),
        splitLine: getSplitLineStyle(),
      },
      series: [
        {
          data,
          type: 'scatter',
          itemStyle: {
            color: computedColor,
          },
          symbolSize,
        },
      ],
    }
  }, [
    data,
    color,
    symbolSize,
    token.colorPrimary,
    getAxisLineStyle,
    getAxisLabelStyle,
    getAxisTickStyle,
    getSplitLineStyle,
  ])

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
    <div ref={chartRef} style={{ height }} />
  )
}
