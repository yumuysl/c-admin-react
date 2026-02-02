import type { ReactNode } from 'react'

import { Card } from 'antd'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useWindowSize } from 'react-use'
import { useShallow } from 'zustand/react/shallow'

import { useAppStore } from '@/stores/appStore'
import { scrollbarOptions } from '@/utils/overlayscrollbars'

interface BaseContainerProps {
  title?: string
  children?: ReactNode
}

export default function BaseContainer({ title = '', children }: BaseContainerProps) {
  // 从应用存储获取 headerHeight
  const { headerHeight } = useAppStore(
    useShallow(state => ({
      headerHeight: state.headerHeight,
    })),
  )

  // 获取窗口高度
  const { height: windowHeight } = useWindowSize()

  // 计算间距
  const space = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.5 // gap-2 = 0.5rem

  // 计算卡片高度
  const cardHeight = windowHeight - headerHeight - space * 2

  // 计算滚动区域高度
  const overlayScrollbarsHeight = cardHeight - 55

  return (
    <div className="m-2 overflow-hidden">
      <Card
        title={title}
        variant="borderless"
        style={{ height: `${cardHeight}px` }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <OverlayScrollbarsComponent
          options={scrollbarOptions}
          defer
          style={{
            height: `${overlayScrollbarsHeight}px`,
          }}
        >
          <div className="mx-auto p-5">
            {children}
          </div>
        </OverlayScrollbarsComponent>
      </Card>
    </div>
  )
}
