import type { Menu, MenuTree } from '@/types/menu'

import { request } from '@/utils/request'

export function getMenuTreeApi(): Promise<MenuTree> {
  return request.get('/menu')
}

export function getFlatMenuApi(): Promise<Omit<Menu, 'children'>[]> {
  return request.get('/menu/flat')
}

export function getMenuDetailApi(id: number): Promise<Omit<Menu, 'children'>> {
  return request.get(`/menu/${id}`)
}

export function getMenuPermissionApi(type: 'MENU' | 'FEATURE'): Promise<Omit<Menu, 'children'>[]> {
  return request.get(`/menu/permission?type=${type}`)
}

export function createMenuApi(data: Omit<Menu, 'id' | 'children'>): Promise<Menu> {
  return request.post('/menu', data)
}

export function updateMenuApi(id: number, data: Partial<Omit<Menu, 'children'>>): Promise<Menu> {
  return request.put(`/menu/${id}`, data)
}

export function deleteMenuApi(id: number): Promise<void> {
  return request.delete(`/menu/${id}`)
}
