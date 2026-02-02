import type { EChartsOption } from 'echarts'

import { CandlestickChart } from 'echarts/charts'
import {
  AxisPointerComponent,
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useEcharts } from '@/hooks/useEcharts'

echarts.use([
  CandlestickChart,
  GridComponent,
  TooltipComponent,
  AxisPointerComponent,
  CanvasRenderer,
])

interface KLineDataItem {
  time: string
  open: number
  close: number
  high: number
  low: number
}

interface KLineChartProps {
  data?: KLineDataItem[]
  height?: string
}

export default function KLineChart({
  data = [],
  height = '16rem',
}: KLineChartProps) {
  const { t } = useTranslation()

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

  const chartOptions = useMemo<EChartsOption>(() => {
    return {
      grid: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 60,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: any) => {
          const item = params[0]
          const data = item.data
          return `
            ${t('component.chart.kline.time')}: ${data[0]}<br/>
            ${t('component.chart.kline.open')}: ${data[1]}<br/>
            ${t('component.chart.kline.close')}: ${data[2]}<br/>
            ${t('component.chart.kline.low')}: ${data[3]}<br/>
            ${t('component.chart.kline.high')}: ${data[4]}<br/>
          `
        },
      },
      xAxis: {
        type: 'category',
        axisTick: getAxisTickStyle(),
        data: data.map(item => item.time),
        axisLabel: getAxisLabelStyle(),
        axisLine: getAxisLineStyle(),
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLabel: getAxisLabelStyle(),
        axisLine: getAxisLineStyle(),
        splitLine: getSplitLineStyle(),
      },
      series: [
        {
          type: 'candlestick',
          data: data.map(item => [item.open, item.close, item.low, item.high]),
          itemStyle: {
            color: '#4C87F3', // 上涨颜色
            color0: '#8BD8FC', // 下跌颜色
            borderColor: '#4C87F3', // 上涨边框颜色
            borderColor0: '#8BD8FC', // 下跌边框颜色
          },
        },
      ],
    }
  }, [data, t, getAxisLineStyle, getAxisLabelStyle, getAxisTickStyle, getSplitLineStyle])

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
