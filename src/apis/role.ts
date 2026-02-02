import type { BasePageList } from '@/types/base'
import type { Role } from '@/types/role'

import { request } from '@/utils/request'

export function getRoleListApi(params: BasePageList<Role>): Promise<BasePageList<Role>> {
  return request.get('/role', { params })
}

export function getAllRoleApi(): Promise<Role[]> {
  return request.get('/role/all')
}

export function getRoleDetailApi(id: number): Promise<Role> {
  return request.get(`/role/${id}`)
}

export function createRoleApi(data: Omit<Role, 'id'>): Promise<Role> {
  return request.post('/role', data)
}

export function updateRoleApi(id: number, data: Partial<Role>): Promise<Role> {
  return request.put(`/role/${id}`, data)
}

export function deleteRoleApi(id: number): Promise<void> {
  return request.delete(`/role/${id}`)
}

export function batchDeleteRoleApi(ids: number[]): Promise<void> {
  return request.delete('/role', { data: { ids } })
}
