import { request } from '@/utils/request'
import type { SysConfigAll, SysconfigPart } from '@/types/sysconfig'

export function getSysconfigData(): Promise<SysConfigAll> {
  return request.get('/sysconfig/info')
}

export function createSysconfig(data: SysconfigPart): Promise<SysConfigAll> {
  return request.post('/sysconfig', data)
}

export function updateSysconfig(
  id: number,
  data: Partial<SysconfigPart>
): Promise<SysConfigAll> {
  return request.put(`/sysconfig/${id}`, data)
}
