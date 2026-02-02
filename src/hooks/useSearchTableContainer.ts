import type { RefObject } from 'react'

import { useMutationObserver, useSize } from 'ahooks'
import { theme } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useShallow } from 'zustand/react/shallow'

import { useAppStore } from '@/stores/appStore'

export function useSearchTableContainer() {
  const { token } = theme.useToken()

  // 获取窗口高度
  const { height: windowHeight } = useWindowSize()

  // 全局状态管理
  const { headerHeight } = useAppStore(
    useShallow(state => ({
      headerHeight: state.headerHeight,
    })),
  )

  // 搜索卡片引用和尺寸
  const searchCardRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
  const searchCardSize = useSize(searchCardRef)
  const searchCardHeight = searchCardSize?.height || 0

  // 计算间距

  const space = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.5 // gap-2 = 0.5rem

  // 计算表格卡片高度
  const tableCardHeight = windowHeight - headerHeight - searchCardHeight - space * 3

  // 表格头部引用和尺寸
  const [theadRef, setTheadRef] = useState<HTMLDivElement | null>(null)
  const theadSize = useSize(theadRef)
  const theadHeight = theadSize?.height || 0

  // 表格主体引用和尺寸
  const [tbodyRef, setTbodyRef] = useState<HTMLDivElement | null>(null)
  const tbodySize = useSize(tbodyRef)
  const tbodyHeight = tbodySize?.height || 0

  // 分页引用和尺寸
  const [paginationRef, setPaginationRef] = useState<HTMLDivElement | null>(null)
  const paginationSize = useSize(paginationRef)
  const paginationHeight = paginationSize?.height || 0

  // 更新表格元素引用
  const updateTheadHeightRef = () => {
    const header = document.querySelector('.ant-table-thead') as HTMLDivElement
    if (header) {
      setTheadRef(header)
    }
  }

  const updateTbodyHeightRef = () => {
    const body = document.querySelector('.ant-table-tbody') as HTMLDivElement
    if (body) {
      setTbodyRef(body)
    }
  }

  const updatePaginationRef = () => {
    const pagination = document.querySelector('.ant-table-pagination') as HTMLDivElement
    if (pagination) {
      setPaginationRef(pagination)
    }
  }

  const updateTableRef = () => {
    updateTheadHeightRef()
    updateTbodyHeightRef()
    updatePaginationRef()
  }

  useEffect(() => {
    updateTableRef()
  }, [])

  const bodyRef = useRef(document.body)

  useMutationObserver(
    () => {
      updateTableRef()
    },
    bodyRef,
    {
      childList: true,
      subtree: true,
    },
  )

  // 计算表格可滚动区域高度
  const tableScrollY = useMemo(() => {
    const offsetHeight = 6
    const scrollableTableHeight = tableCardHeight - theadHeight - paginationHeight - token.margin * 2 - offsetHeight
    return tbodyHeight >= scrollableTableHeight ? scrollableTableHeight : undefined
  }, [tableCardHeight, theadHeight, paginationHeight, token.margin, tbodyHeight])

  // 返回容器属性
  const listContainerProps = useMemo(() => ({
    searchCardRef,
    tableCardHeight,
  }), [searchCardHeight, tableCardHeight])

  return {
    listContainerProps,
    tableScrollY,
  }
}
