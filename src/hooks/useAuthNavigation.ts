import { useMemo } from 'react'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'

import type { LoginInfo } from '@/types/user'

import { useUserStore } from '@/stores/userStore'

export function useAuthNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const matches = useMatches()

  const {
    login: storeLogin,
    logout: storeLogout,
    flatUserMenus,
  } = useUserStore(
    useShallow((state) => ({
      login: state.login,
      logout: state.logout,
      flatUserMenus: state.flatUserMenus,
    }))
  )

  const matchedMenuPath = useMemo(() => {
    const possiblePaths = [...matches].map((item) => item.pathname).reverse()

    const menuPathMap = new Set(flatUserMenus.map((menu) => menu.path))

    const matchedPath = possiblePaths.find((path) => menuPathMap.has(path))

    if (!matchedPath) return ''

    if (matchedPath === '/' && location.pathname !== '/') {
      return ''
    }

    return matchedPath
  }, [flatUserMenus, location.pathname, matches])

  async function login(data: LoginInfo, redirectPath?: string) {
    const targetPath = redirectPath || '/'

    await storeLogin(data)

    navigate(targetPath)
    try {
      console.log('登录成功')
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  function logout(redirectPath?: string) {
    const currentPath = redirectPath || location.pathname

    storeLogout()

    navigate(
      redirectPath !== '/' && redirectPath !== '/login'
        ? `/login?redirect=${encodeURIComponent(currentPath)}`
        : '/login'
    )
  }

  return {
    login,
    logout,
    matchedMenuPath,
  }
}
