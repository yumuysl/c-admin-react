export enum HOME {
  READ = 'home:read',
}

/**
 * 用户管理
 */
export enum USER {
  CREATE = 'system:user:create',
  READ = 'system:user:read',
  UPDATE = 'system:user:update',
  DELETE = 'system:user:delete',
}

/**
 * 角色管理
 */
export enum ROLE {
  CREATE = 'system:role:create',
  READ = 'system:role:read',
  UPDATE = 'system:role:update',
  DELETE = 'system:role:delete',
}

/**
 * 菜单管理
 */
export enum MENU {
  CREATE = 'system:menu:create',
  READ = 'system:menu:read',
  UPDATE = 'system:menu:update',
  DELETE = 'system:menu:delete',
}

/**
 * API管理
 */
export enum API {
  CREATE = 'system:api:create',
  READ = 'system:api:read',
  UPDATE = 'system:api:update',
  DELETE = 'system:api:delete',
}

/**
 * 文件管理
 */
export enum FILE {
  CREATE = 'case:file:create',
  READ = 'case:file:read',
  UPDATE = 'case:file:update',
  DELETE = 'case:file:delete',
}
