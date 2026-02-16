import type { BasePageParams } from './base'

export interface FileContent {
  id: number
  fileName: string
  filetype: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'TEXT' | 'APPLICATION'
  size?: number
  adress: string
  file?: File
  isShow?: boolean
}

export interface FileListParams extends BasePageParams {
  name?: string | null
  filetype?: string | null
  size?: number | null
  actor?: string | null
}
