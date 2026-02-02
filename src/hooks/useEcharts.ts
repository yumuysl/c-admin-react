import type { EChartsOption } from 'echarts'

import { useDebounceFn, useSize } from 'ahooks'
import * as echarts from 'echarts/core'
import { useEffect, useRef, useState } from 'react'

import { useAppStore } from '@/stores/appStore'

export function useEcharts(initOptions?: EChartsOption) {
  const { isDark } = useAppStore()
  const chartRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useState<echarts.ECharts | null>(null)

  // 使用 useSize 监听容器尺寸变化
  const size = useSize(chartRef)

  // 使用 useDebounceFn 为 resize 添加防抖处理
  const {
    run: handleResize,
  } = useDebounceFn(() => {
    chart?.resize()
  }, {
    wait: 100,
  })

  // 监听尺寸变化触发 resize
  useEffect(() => {
    handleResize()
  }, [size])

  // 坐标轴线样式
  const getAxisLineStyle = (show = true) => ({
    show,
    lineStyle: {
      color: isDark ? '#444' : '#e8e8e8',
      width: 1,
    },
  })

  // 分割线样式
  const getSplitLineStyle = (show = true) => ({
    show,
    lineStyle: {
      color: isDark ? '#444' : '#e8e8e8',
      width: 1,
      type: 'dashed' as const,
    },
  })

  // 坐标轴标签样式
  const getAxisLabelStyle = () => ({
    show: true,
    color: '#999',
    fontSize: 13,
  })

  // 坐标轴刻度样式
  const getAxisTickStyle = () => ({
    show: false,
  })

  const initChart = (options: EChartsOption = {}) => {
    if (!chartRef.current)
      return

    // 如果已存在图表实例，先销毁
    if (chart) {
      chart.dispose()
      setChart(null)
    }

    const newChart = echarts.init(chartRef.current)
    newChart.setOption({
      ...initOptions,
      ...options,
    })

    setChart(newChart)
    // return newChart
  }

  const updateChart = (options: EChartsOption) => {
    chart?.setOption(options)
  }

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      if (chart) {
        chart.dispose()
        setChart(null)
      }
    }
  }, [chart])

  return {
    isDark,
    chartRef,
    initChart,
    updateChart,
    handleResize,
    getAxisLineStyle,
    getSplitLineStyle,
    getAxisLabelStyle,
    getAxisTickStyle,
  }
}
