import type { BasePageList } from '@/types/base'
import type { FileContent, FileListParams } from '@/types/file'

import { request } from '@/utils/request'

export function getFileListApi(
  params: FileListParams = { page: 1, pageSize: 10 }
): Promise<BasePageList<FileContent>> {
  return request.get('/file', { params })
}

export function getFileDetailApi(id: number): Promise<FileContent> {
  return request.get(`/file/${id}`)
}

export function createFileApi(data: FormData): Promise<FileContent> {
  return request.post('/file/upload', data)
}

export function deleteFileApi(id: number): Promise<void> {
  return request.delete(`/file/${id}`)
}

export function batchDeleteFileApi(ids: number[]): Promise<void> {
  return request.delete('/file', { data: { ids } })
}
