export interface BasePageList<T> {
  total: number
  list: T[]
}

export interface BasePageParams {
  page: number
  pageSize: number
}

export type ApiResponse<T> = BasePageList<T> | T[]
