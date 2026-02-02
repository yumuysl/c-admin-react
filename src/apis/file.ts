import type { BasePageList } from '@/types/base'
import type { File, FileListParams } from '@/types/file'

import { request } from '@/utils/request'

export function getFileListApi(
  params: FileListParams = { page: 1, pageSize: 10 }
): Promise<BasePageList<File>> {
  return request.get('/file', { params })
}

export function getFileDetailApi(id: number): Promise<File> {
  return request.get(`/file/${id}`)
}

export function createFileApi(data: Omit<File, 'id'>): Promise<File> {
  return request.post('/file', data)
}

export function deleteFileApi(id: number): Promise<void> {
  return request.delete(`/file/${id}`)
}

export function batchDeleteFileApi(ids: number[]): Promise<void> {
  return request.delete('/file', { data: { ids } })
}
