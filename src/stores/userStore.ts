import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Menu } from '@/types/menu'
import type { AuthTokens, LoginInfo, UserInfo } from '@/types/user'

import { getUserInfoApi, loginApi } from '@/apis/user'
import { flattenTree } from '@/utils/array'
import { projectSign } from '@/utils/string'

interface UserState {
  // 认证相关
  accessToken: string | null
  refreshToken: string | null
  isLogin: boolean
  setAllToken: (accessToken: string, refreshToken: string) => void
  clearAllToken: () => void
  setIsLogin: (isLogin: boolean) => void

  // 用户信息相关
  userInfo: UserInfo | null
  userMenus: Menu[]
  flatUserMenus: Omit<Menu, 'children'>[]
  menuPermissions: string[]
  featurePermissions: string[]

  // 操作方法
  fetchUserInfo: () => Promise<void>
  clearUserInfo: () => void
  login: (data: LoginInfo, redirectPath?: string) => Promise<AuthTokens>
  logout: (currentPath?: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isLogin: false,
      // get isLogin() {
      //   return !!get().accessToken
      // },
      setAllToken: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
          // isLogin: true,
        }),
      clearAllToken: () =>
        set({
          accessToken: null,
          refreshToken: null,
          // isLogin: false,
        }),
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      userInfo: null,
      // get userMenus() {
      //   return get().userInfo?.menus || []
      // },
      userMenus: [],
      flatUserMenus: [],
      menuPermissions: [],
      featurePermissions: [],
      // get menuPermissions() {
      //   return get().userInfo?.menuPermissions || []
      // },
      // get featurePermissions() {
      //   return get().userInfo?.featurePermissions || []
      // },
      fetchUserInfo: async () => {
        try {
          const userInfoRes = await getUserInfoApi()
          set({
            userInfo: userInfoRes,
            userMenus: userInfoRes.menus,
            flatUserMenus: flattenTree(userInfoRes.menus),
            menuPermissions: userInfoRes.menuPermissions,
            featurePermissions: userInfoRes.featurePermissions,
          })
        } catch (error) {
          console.error('获取用户信息失败:', error)
          throw error
        }
      },

      clearUserInfo: () => set({ userInfo: null }),

      login: async (data: LoginInfo) => {
        try {
          const loginRes = await loginApi(data)

          // 设置令牌
          get().setAllToken(loginRes.accessToken, loginRes.refreshToken)
          get().setIsLogin(true)

          // 获取用户信息
          await get().fetchUserInfo()

          // 路由导航将在组件层处理
          return loginRes
        } catch (error) {
          console.error('userStore的login函数，登录失败:', error)
          throw error
        }
      },

      logout: (_currentPath?: string) => {
        get().clearAllToken()
        get().clearUserInfo()
        get().setIsLogin(false)
      },
    }),
    {
      name: projectSign('user-storage'),
      partialize: (state) => ({
        // 只持久化这些字段
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLogin: state.isLogin,
      }),
    }
  )
)
