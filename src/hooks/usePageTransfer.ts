import type { NavigateOptions, To } from 'react-router-dom'

import { useLocation, useNavigate } from 'react-router-dom'

import { usePageDataStore } from '@/stores/pageDataStore'

// 路由参数类型
type RouteOptions = To

export function usePageTransfer() {
  const navigate = useNavigate()
  const location = useLocation()
  const pageDataStore = usePageDataStore()

  /**
   * 获取路由的唯一标识
   */
  function getRouteKey(route: RouteOptions): string {
    if (typeof route === 'string') {
      return route
    }

    // 处理对象形式的路由
    if ('pathname' in route && route.pathname) {
      return route.pathname
    }

    // 如果都没有，使用当前路径
    return location.pathname
  }

  /**
   * 跳转到指定页面并携带数据
   * @param options 路由配置对象或路径字符串
   * @param data 要传递的数据
   * @param key 数据的唯一标识（默认使用目标路径）
   * @param navigateOptions 路由导航选项
   */
  function navigateWithData(
    options: RouteOptions,
    data: any,
    key?: string,
    navigateOptions?: NavigateOptions
  ) {
    // 确定数据存储的 key
    const dataKey = key || getRouteKey(options)

    // 存储数据
    pageDataStore.setData(dataKey, data)

    // 跳转页面
    navigate(options, {
      viewTransition: true,
      ...navigateOptions,
    })
  }

  /**
   * 获取传递的数据
   * @param key 数据的唯一标识（默认使用当前路径）
   */
  function getTransferredData(key?: string) {
    const dataKey = key || location.pathname
    console.log('打印dataKey', dataKey)
    console.log('打印pageDataStore的数据', pageDataStore.getData(dataKey))
    return pageDataStore.getData(dataKey)
  }

  /**
   * 清除数据
   * @param key 数据的唯一标识（默认使用当前路径）
   */
  function clearTransferredData(key?: string) {
    const dataKey = key || location.pathname
    pageDataStore.clearData(dataKey)
  }

  return {
    navigateWithData,
    getTransferredData,
    clearTransferredData,
  }
}
