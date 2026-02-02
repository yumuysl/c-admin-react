import { useShallow } from 'zustand/react/shallow'

import { MENU_TYPE } from '@/constants/menu'
import { useUserStore } from '@/stores/userStore'

// 权限类型：菜单权限、功能权限
export type PermissionType = MENU_TYPE.MENU | MENU_TYPE.FEATURE

// 权限验证模式：全部满足(all)或满足其一(any)
export type MatchMode = 'all' | 'any'

// 权限检查选项接口
export interface PermissionOptions {
  // 要检查的权限
  permission: string | string[]
  // 权限类型：菜单权限或功能权限
  permissionType: PermissionType
  // 匹配模式，默认为'all'(全部满足)
  matchMode?: MatchMode
}

export function usePermission() {
  const { menuPermissions, featurePermissions } = useUserStore(useShallow(state => ({
    menuPermissions: state.menuPermissions,
    featurePermissions: state.featurePermissions,
  })))

  /**
   * 检查是否拥有权限
   * @param options 权限检查选项对象
   * @returns 是否拥有权限
   */
  function hasPermission(options: PermissionOptions): boolean {
    const { permission, permissionType, matchMode = 'all' } = options

    const userPermissions = permissionType === MENU_TYPE.MENU
      ? menuPermissions
      : featurePermissions

    // 如果权限只有一个，并且是 *，则表示拥有所有权限
    if (userPermissions.length === 1 && userPermissions[0] === '*') {
      return true
    }

    if (typeof permission === 'string') {
      return userPermissions.includes(permission)
    }

    // 如果是权限数组，则根据模式进行检查
    const hasPermission = matchMode === 'all'
      ? permission.every(p => userPermissions.includes(p))
      : permission.some(p => userPermissions.includes(p))

    return hasPermission
  }

  return {
    hasPermission,
  }
}
