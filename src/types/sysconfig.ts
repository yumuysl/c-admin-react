type commonType = {
  id: string
  createAt: string
  updateAt: string
}

export interface SysconfigPart {
  fileUploadMax: number
  ossBucket: string
}

export interface SysConfigAll extends commonType, SysconfigPart {}
