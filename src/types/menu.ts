import type { MENU_TYPE } from '@/constants/menu'

export interface Menu {
  id: number
  parentId: number | null
  title: string
  code?: string
  icon: string
  type: MENU_TYPE
  path?: string
  i18nKey?: string
  children?: Menu[]
}

export type MenuTree = Menu[]

export type FlatMenu = Omit<Menu, 'children'>
