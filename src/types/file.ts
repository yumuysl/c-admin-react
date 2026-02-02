import type { BasePageParams } from './base'

export interface File {
  id: number
  name: string
  filetype: string
  size: number
  actorId: number
  createTime: string
  updateTime: string
}

export interface FileListParams extends BasePageParams {
  name?: string | null
  filetype?: string | null
  size?: number | null
  actor?: string | null
}
