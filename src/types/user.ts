import type { BasePageParams } from '@/types/base'
import type { MenuTree } from '@/types/menu'

export interface LoginInfo {
  username: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface UserInfo {
  id: number
  username: string
  nickName: string
  headPic: string
  menus: MenuTree
  menuPermissions: string[]
  featurePermissions: string[]
}

export interface User {
  id: number
  username: string | null
  password?: string | null
  nickName?: string | null
  email?: string | null
  phone?: string | null
  headPic?: string | null
  isFrozen: boolean
  createTime?: string | null
  updateTime?: string | null
  roles?: string[]
}

export interface UserListParams extends BasePageParams {
  username?: string | null
  nickName?: string | null
  email?: string | null
  phone?: string | null
}

export interface UserList {
  total: number
  list: User[]
}
