import type { BasePageList } from '@/types/base'
import type {
  AuthTokens,
  LoginInfo,
  User,
  UserInfo,
  UserListParams,
} from '@/types/user'

import { request } from '@/utils/request'

export function loginApi(data: LoginInfo): Promise<AuthTokens> {
  console.log('loginApi,打印data：', data)
  return request.post('/user/login', data)
}

export function refreshTokenApi(refreshToken: string): Promise<AuthTokens> {
  return request.get('/user/refresh', { params: { refreshToken } })
}

export function getUserInfoApi(): Promise<UserInfo> {
  return request.get('/user/info')
}

export function getUserListApi(
  params: UserListParams = { page: 1, pageSize: 10 }
): Promise<BasePageList<User>> {
  return request.get('/user', { params })
}

export function getUserDetailApi(id: number): Promise<User> {
  return request.get(`/user/${id}`)
}

export function createUserApi(data: Omit<User, 'id'>): Promise<User> {
  return request.post('/user', data)
}

export function updateUserApi(id: number, data: Partial<User>): Promise<User> {
  return request.put(`/user/${id}`, data)
}

export function updateUserPasswordApi(data: {
  oldPassword: string
  newPassword: string
}): Promise<void> {
  return request.post('/user/password', data)
}

export function deleteUserApi(id: number): Promise<void> {
  return request.delete(`/user/${id}`)
}

export function batchDeleteUserApi(ids: number[]): Promise<void> {
  return request.delete('/user', { data: { ids } })
}
