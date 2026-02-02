import type { Api, ApiTree } from '@/types/api'

import { request } from '@/utils/request'

export function getApiTreeApi(): Promise<ApiTree> {
  return request.get('/api')
}

export function getFlatApiApi(): Promise<Omit<Api, 'children'>[]> {
  return request.get('/api/flat')
}

export function getApiDetailApi(id: number): Promise<Omit<Api, 'children'>> {
  return request.get(`/api/${id}`)
}

export function getApiPermissionApi(): Promise<Omit<Api, 'children'>[]> {
  return request.get('/api/permission')
}

export function createApiApi(data: Omit<Api, 'id' | 'children'>): Promise<Api> {
  return request.post('/api', data)
}

export function updateApiApi(id: number, data: Partial<Omit<Api, 'children'>>): Promise<Api> {
  return request.put(`/api/${id}`, data)
}

export function deleteApiApi(id: number): Promise<void> {
  return request.delete(`/api/${id}`)
}
