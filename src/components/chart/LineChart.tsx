import type { EChartsOption } from 'echarts'

import { LineChart as LineChartComponent } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useEcharts } from '@/hooks/useEcharts'
import { hexToRgba } from '@/utils/color'

echarts.use([
  LineChartComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

interface SeriesItem {
  name: string
  data: number[]
  color?: string
}

interface LineChartProps {
  data: number[] | SeriesItem[]
  xAxisData: string[]
  height?: string
  color?: string | string[]
  lineWidth?: number
  showAreaColor?: boolean
  showLegend?: boolean
}

export default function LineChart({
  height = '16rem',
  data = [],
  xAxisData = [],
  color = '',
  lineWidth = 3,
  showAreaColor = false,
  showLegend = false,
}: LineChartProps) {
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

  const defaultColors = [
    '#0094FF',
    '#55D8FE',
    '#5C8EFF',
    '#3FA4FF',
    '#00C2F9',
    '#00D4C2',
    '#91CC75',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
  ]

  const isMultiSeries = useMemo(() => {
    return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'name' in data[0]
  }, [data])

  function getColor(index: number, specificColor?: string) {
    // 优先使用指定的具体颜色
    if (specificColor) {
      return specificColor
    }

    if (color) {
      if (Array.isArray(color)) {
        return color[index % color.length]
      }
      return color
    }

    return defaultColors[index % defaultColors.length]
  }

  function getAreaStyle(seriesColor: string, enableAreaColor: boolean) {
    if (!enableAreaColor)
      return undefined

    return {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: hexToRgba(seriesColor, 0.2).rgba,
        },
        {
          offset: 1,
          color: hexToRgba(seriesColor, 0.01).rgba,
        },
      ]),
    }
  }

  const generateSeries = useMemo(() => {
    if (isMultiSeries) {
      return (data as SeriesItem[]).map((item, index) => {
        const seriesColor = getColor(index, item.color)
        return {
          name: item.name,
          type: 'line' as const,
          smooth: true,
          symbol: 'none',
          data: item.data,
          lineStyle: {
            width: lineWidth,
            color: seriesColor,
          },
          itemStyle: {
            color: seriesColor,
          },
          areaStyle: getAreaStyle(seriesColor, showAreaColor),
        }
      })
    }
    else {
      const seriesColor = getColor(0)

      return [{
        name: '数据',
        type: 'line' as const,
        smooth: true,
        symbol: 'none',
        data,
        lineStyle: {
          width: lineWidth,
          color: seriesColor,
        },
        itemStyle: {
          color: seriesColor,
        },
        areaStyle: getAreaStyle(seriesColor, showAreaColor),
      }]
    }
  }, [data, isMultiSeries, lineWidth, showAreaColor])

  // 获取图例数据
  const legendData = useMemo(() => {
    if (isMultiSeries) {
      return (data as SeriesItem[]).map(item => item.name)
    }
    return [t('component.chart.common.data')]
  }, [data, isMultiSeries, t])

  const chartOptions = useMemo<EChartsOption>(() => {
    // 计算底部边距，如果显示图例则增加空间
    const bottomMargin = showLegend ? 30 : 0

    return {
      grid: {
        top: 15,
        right: 15,
        bottom: bottomMargin,
        left: 0,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: showLegend,
        data: legendData,
        bottom: 0,
        left: 'center',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          fontSize: 12,
          color: isDark ? '#808290' : '#222B45',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisTick: getAxisTickStyle(),
        axisLine: getAxisLineStyle(),
        axisLabel: getAxisLabelStyle(),
      },
      yAxis: {
        axisLabel: getAxisLabelStyle(),
        axisLine: getAxisLineStyle(),
        splitLine: getSplitLineStyle(),
      },
      series: generateSeries,
    }
  }, [
    showLegend,
    legendData,
    isDark,
    xAxisData,
    getAxisTickStyle,
    getAxisLineStyle,
    getAxisLabelStyle,
    getSplitLineStyle,
    generateSeries,
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

  const lineChartStyle = {
    width: 'calc(100% + 10px)',
    height,
  }

  return (
    <div ref={chartRef} style={lineChartStyle} />
  )
}
