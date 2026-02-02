import { Card } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'react-use'
import { useShallow } from 'zustand/react/shallow'

import { BackButton } from '@/components/button'
import { useAppStore } from '@/stores/appStore'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

interface FormContainerProps {
  margin?: number
  title?: string
  showBack?: boolean
  children?: React.ReactNode
}

export default function FormContainer({
  margin = 20,
  title = '',
  showBack = true,
  children,
}: FormContainerProps) {
  const navigate = useNavigate()

  const { sidebarWidth, headerHeight } = useAppStore(useShallow(state => ({
    sidebarWidth: state.sidebarWidth,
    headerHeight: state.headerHeight,
  })))

  // 获取窗口高度
  const { height: windowHeight } = useWindowSize()

  // 使用自定义断点 hook
  const breakpoints: Record<string, string> = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg',
    'xl': 'xl',
    '2xl': '2xl',
  }
  const breakpointsTailwind: Record<string, number> = {
    '2xl': 1536,
    'xl': 1280,
    'lg': 1024,
    'md': 768,
    'sm': 640,
  }
  const breakpointsName = ['2xl', 'xl', 'lg', 'md', 'sm']

  // 计算间距
  const space = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.5 // gap-2 = 0.5rem

  // 计算卡片高度
  const cardHeight = windowHeight - headerHeight - space * 2

  // 计算滚动区域高度
  const overlayScrollbarsHeight = cardHeight - 100

  // 获取最大宽度
  function getMaxWidth() {
    return breakpointsName.reduce((result, point) => {
      if (result)
        return result

      if (breakpoints[point]) {
        return `${breakpointsTailwind[point] - sidebarWidth - margin * 2}px`
      }

      if (point === 'sm' && !result) {
        return '100%'
      }

      return ''
    }, '')
  }

  const [maxWidth, setMaxWidth] = useState('')

  useEffect(() => {
    setMaxWidth(getMaxWidth())
  }, [breakpoints, sidebarWidth, margin])

  function handleBack() {
    navigate(-1)
  }

  return (
    <div className="m-2 overflow-hidden">
      <Card
        title={title}
        variant="borderless"
        style={{ height: `${cardHeight}px` }}
        styles={{
          body: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        extra={showBack ? <BackButton onClick={handleBack} /> : null}
      >
        <OverlayScrollbarsComponent
          options={scrollbarOptions}
          defer
          style={{ height: `${overlayScrollbarsHeight}px` }}
        >
          <div className="mx-auto" style={{ maxWidth }}>
            {children}
          </div>
        </OverlayScrollbarsComponent>
      </Card>
    </div>
  )
}
