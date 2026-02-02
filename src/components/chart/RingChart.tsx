import type { EChartsOption } from 'echarts'

import { PieChart } from 'echarts/charts'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useEcharts } from '@/hooks/useEcharts'

echarts.use([
  PieChart,
  CanvasRenderer,
])

interface RingChartProps {
  data?: Array<{ value: number, name: string }>
  height?: string
  color?: string[]
  radius?: string[]
}

export default function RingChart({
  data = [],
  height = '16rem',
  color = [],
  radius = ['50%', '80%'],
}: RingChartProps) {
  const { t } = useTranslation()

  const {
    chartRef,
    isDark,
    initChart,
    updateChart,
  } = useEcharts()

  const chartOptions = useMemo<EChartsOption>(() => {
    return {
      series: [
        {
          name: t('component.chart.common.dataRatio'),
          type: 'pie',
          radius,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            position: 'outside',
            color: '#999',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 25,
            smooth: true,
          },
          data,
          color,
        },
      ],
    }
  }, [data, radius, color])

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
    <div ref={chartRef} className="ring-chart" style={{ height }} />
  )
}
