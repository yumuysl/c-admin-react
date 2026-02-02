import type { ReactNode } from 'react'

import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import { MENU_TYPE } from '@/constants/menu'
import { usePermission } from '@/hooks/usePermission'
import { hideLoading } from '@/plugins'
import { getRouteMeta } from '@/router/routeMeta'
import { useUserStore } from '@/stores/userStore'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const [hydrated, setHydrated] = useState(false)

  // 首次加载时执行 rehydrate
  useEffect(() => {
    const initialize = async () => {
      if (!useUserStore.persist.hasHydrated()) {
        await useUserStore.persist.rehydrate()
      }

      setHydrated(true)
    }

    initialize()
  }, [])

  const { isLogin, fetchUserInfo, userInfo, menuPermissions } = useUserStore(
    useShallow(state => ({
      isLogin: state.isLogin,
      fetchUserInfo: state.fetchUserInfo,
      userInfo: state.userInfo,
      menuPermissions: state.menuPermissions,
    })),
  )

  const location = useLocation()
  const { hasPermission } = usePermission()
  const routeMeta = getRouteMeta(location.pathname)

  useEffect(() => {
    // 如果已登录但没有用户信息，获取用户信息
    if (isLogin && !userInfo) {
      fetchUserInfo().catch(console.error)
    }
  }, [isLogin, userInfo, fetchUserInfo])

  if (!hydrated) {
    return null
  }

  hideLoading()

  // 如果是公共路由，则直接放行
  if (routeMeta?.public) {
    return (
      <>
        {children}
      </>
    )
  }

  // 未登录时重定向到登录页
  if (!isLogin) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  }

  // 等待用户信息加载
  if (!userInfo) {
    return null
  }

  // 权限检查
  if (routeMeta?.permission && !hasPermission({
    permission: menuPermissions,
    permissionType: MENU_TYPE.MENU,
  })) {
    return <Navigate to="/exception/403" replace />
  }

  return <>{children}</>
}
