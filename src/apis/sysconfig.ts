import { request } from '@/utils/request'
import type { SysConfigInfo } from '@/types/sysconfig'

export function getSysconfigData(): Promise<SysConfigInfo> {
  return request.get('/sysconfig/list')
}

export function createSysconfig(
  data: Omit<SysConfigInfo, 'id' | 'crateAt' | 'updateAt'>
) {
  return request.post('/sysconfig', data)
}

export function updateSysconfig(
  id: number,
  data: Omit<SysConfigInfo, 'id' | 'crateAt' | 'updateAt'>
) {
  return request.put(`/sysconfig/${id}`, data)
}
