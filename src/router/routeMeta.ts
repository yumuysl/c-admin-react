import { API, MENU, ROLE, USER } from '../constants/permissions'
import { flattenTree } from '../utils/array'

// 基础元数据类型
interface RouteMeta {
  layout?: 'blank' | 'default'
  public?: boolean
  [key: string]: unknown
}

interface Route {
  name: string
  path?: string
  meta?: RouteMeta
  children?: Route[]
}

const routeMetaConfig: Route[] = [
  { name: '登录', path: '/login', meta: { public: true, layout: 'blank' } },
  {
    name: '异常',
    children: [
      { name: '403', path: '/exception/403', meta: { layout: 'blank' } },
      { name: '404', path: '/exception/404', meta: { layout: 'blank' } },
      { name: '500', path: '/exception/500', meta: { layout: 'blank' } },
    ],
  },
  {
    name: '系统设置',
    children: [
      { name: '用户管理', path: '/system/user', meta: { permission: USER.READ } },
      { name: '角色管理', path: '/system/role', meta: { permission: ROLE.READ } },
      { name: '菜单管理', path: '/system/menu', meta: { permission: MENU.READ } },
      { name: 'API管理', path: '/system/api', meta: { permission: API.READ } },
    ],
  },
]

const flatMetaRoutes = flattenTree(routeMetaConfig)

export function getRouteMeta(path: string) {
  const routeItem = flatMetaRoutes.find(item => path === item.path)

  if (routeItem && routeItem.meta) {
    return routeItem.meta
  }

  return null
}
