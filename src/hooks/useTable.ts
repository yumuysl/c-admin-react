import type { TableProps } from 'antd'
import type { FormInstance } from 'antd/es/form'
import type { Key } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { usePageTransfer } from '@/hooks/usePageTransfer'

// 基础类型定义
export interface BasePageList<T> {
  total: number
  list: T[]
}

export interface BasePageParams {
  page: number
  pageSize: number
}

export type ApiResponse<T> = BasePageList<T> | T[]

// 提取 ApiResponse 中的数据类型
type UnwrapApiResponse<T> = T extends ApiResponse<infer U>
  ? U extends BasePageList<infer V>
    ? V
    : U extends Array<infer V>
      ? V
      : U
  : T

// 从 listApiFn 推断出 TItem 类型
type InferredItem<T> = T extends (params: any) => Promise<infer U>
  ? UnwrapApiResponse<U>
  : never

interface QueryState {
  params: Record<string, any>
  page: number
  pageSize: number
}

interface UseTableOptions<TApiFn extends (params: any) => Promise<ApiResponse<any>>> {
  listApiFn: TApiFn
  deleteApiFn?: (id: number) => Promise<void>
  batchDeleteApiFn?: (ids: number[]) => Promise<void>
  key: string
  idKey?: string
  cacheEnabled?: boolean
  dataStaleTime?: number
  pagination?: boolean
  selectable?: boolean
  formInitialValues?: Record<string, any>
  columns: TableProps<any>['columns']
  scrollX?: string | number
  scrollY?: number | string
  pageCreatePath?: string
  pageEditPath?: string
}

// 判断是否为分页响应
function isPageResponse<T>(data: ApiResponse<T>): data is BasePageList<T> {
  return !Array.isArray(data) && 'total' in data && 'list' in data
}

export function useTable<TApiFn extends (params: any) => Promise<ApiResponse<any>>>({
  listApiFn,
  deleteApiFn,
  batchDeleteApiFn,
  key,
  idKey = 'id',
  cacheEnabled = true,
  dataStaleTime = 1000 * 60 * 10, // 默认 10 分钟
  pagination = true,
  selectable = false,
  formInitialValues = {},
  columns,
  scrollX = '100%',
  scrollY,
  pageCreatePath,
  pageEditPath,
}: UseTableOptions<TApiFn>) {
  const { navigateWithData } = usePageTransfer()

  const needsForm = Object.keys(formInitialValues).length > 0

  // 创建form实例
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = needsForm ? Form.useForm() : [null]

  const location = useLocation()
  const queryClient = useQueryClient()

  // -------------------- State Management --------------------
  // 分页状态
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 查询状态
  const [queryState, setQueryState] = useState<Record<string, any>>(formInitialValues)

  // 选择状态
  const [selectedState, setSelectedState] = useState<number[]>([])
  const selectedCount = useMemo(() => selectedState.length, [selectedState])
  const selectedIsEmpty = useMemo(() => selectedCount === 0, [selectedCount])

  const listQueryKey = `${key}-list`
  const stateQueryKey = `${key}-list-state`

  // -------------------- Cache Management --------------------
  // 清除保存的查询状态
  const clearSavedState = () => {
    if (cacheEnabled) {
      queryClient.removeQueries({ queryKey: [stateQueryKey] })
    }
  }

  // 初始化状态
  useEffect(() => {
    if (cacheEnabled) {
      const initialState = queryClient.getQueryData<QueryState>([stateQueryKey])

      if (initialState) {
        form?.setFieldsValue(initialState.params)
        setQueryState(initialState.params)
        if (pagination) {
          setPage(initialState.page)
          setPageSize(initialState.pageSize)
        }
      }
      else {
        form?.setFieldsValue(formInitialValues)
      }
    }
    else {
      form?.setFieldsValue(formInitialValues)
    }
  }, [cacheEnabled, form, formInitialValues, pagination, queryClient, stateQueryKey])

  // -------------------- Query & Data Fetching --------------------
  const {
    data,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [listQueryKey, queryState, page, pageSize],
    queryFn: async () => {
      // 创建基础参数对象
      const baseParams = { ...queryState }

      // 如果启用分页，添加分页参数
      if (pagination) {
        return await listApiFn({
          ...baseParams,
          page,
          pageSize,
        })
      }

      // 不分页的情况
      return await listApiFn(baseParams)
    },
    staleTime: cacheEnabled ? dataStaleTime : 0,
    gcTime: cacheEnabled ? dataStaleTime : 0,
  })

  // -------------------- Mutation --------------------
  const deleteMutation = useMutation({
    mutationFn: deleteApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
    },
  })

  const batchDeleteMutation = useMutation({
    mutationFn: batchDeleteApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
      setSelectedState([])
    },
  })

  // -------------------- Actions --------------------
  const handleSearch = async () => {
    try {
      const values = await form?.validateFields()
      // 直接使用新的值保存状态
      if (cacheEnabled) {
        const state: QueryState = {
          params: values,
          page: 1, // 直接使用新的页码
          pageSize: 10, // 直接使用新的每页条数
        }
        queryClient.setQueryData([stateQueryKey], state)
      }
      if (pagination) {
        setPage(1)
      }
      setSelectedState([])
    }
    catch (error) {
      console.error('Search form validation failed:', error)
    }
  }

  const handleReset = async () => {
    form?.resetFields()
    setQueryState(formInitialValues)

    // 直接使用新的值保存状态
    if (cacheEnabled) {
      const state: QueryState = {
        params: formInitialValues,
        page: 1, // 直接使用新的页码
        pageSize: 10, // 直接使用新的每页条数
      }
      queryClient.setQueryData([stateQueryKey], state)
    }

    if (pagination) {
      setPage(1)
      setPageSize(10)
    }
    setSelectedState([])
  }

  const handleCreate = (transferData: Record<string, any> | null = null, query: Record<string, any> = {}) => {
    if (pageCreatePath) {
      navigateWithData(
        {
          pathname: pageCreatePath,
          search: new URLSearchParams(query).toString(),
        },
        transferData,
      )
    }
    else {
      navigateWithData(
        {
          pathname: `${location.pathname}/create/new`,
          search: new URLSearchParams(query).toString(),
        },
        transferData,
      )
    }
  }

  const handleEdit = (data: InferredItem<TApiFn>, transferData: Record<string, any> | null = null, query: Record<string, any> = {}) => {
    const record = data as Record<string, any>

    if (pageEditPath) {
      navigateWithData(
        {
          pathname: pageEditPath,
          search: new URLSearchParams(query).toString(),
        },
        transferData,
      )
    }
    else {
      navigateWithData(
        {
          pathname: `${location.pathname}/edit/${record[idKey]}`,
          search: new URLSearchParams(query).toString(),
        },
        transferData,
      )
    }
  }

  const handleDelete = async (id: number) => {
    if (deleteApiFn) {
      await deleteMutation.mutateAsync(id)
    }
  }

  const handleBatchDelete = async () => {
    if (batchDeleteApiFn && selectedState.length > 0) {
      await batchDeleteMutation.mutateAsync(selectedState)
    }
  }

  // -------------------- Computed Properties --------------------
  const list = useMemo(() => {
    if (!data)
      return []
    return isPageResponse(data) ? data.list : data
  }, [data])

  const total = useMemo(() => {
    if (!data)
      return 0
    return isPageResponse(data) ? data.total : data.length
  }, [data])

  const handlePageChange = useCallback((newPage: number, newPageSize: number) => {
    setPage(newPage)
    setPageSize(newPageSize)

    if (cacheEnabled) {
      const state: QueryState = {
        params: { ...form?.getFieldsValue() },
        page: newPage,
        pageSize: newPageSize,
      }
      queryClient.setQueryData([stateQueryKey], state)
    }

    setSelectedState([])
  }, [cacheEnabled, form, queryClient, stateQueryKey])

  // -------------------- Table Props --------------------
  const tableProps = useMemo(() => ({
    rowKey: idKey,
    columns,
    dataSource: list,
    loading: isLoading,
    sticky: true,
    ...(selectable
      ? {
          rowSelection: {
            type: 'checkbox' as const,
            selectedRowKeys: selectedState,
            onChange: (selectedRowKeys: Key[]) => {
              setSelectedState(selectedRowKeys.map(key => Number(key)))
            },
          } as TableProps<any>['rowSelection'],
        }
      : {}),
    scroll: {
      x: scrollX,
      y: scrollY,
    },
    pagination: pagination
      ? {
          current: page,
          pageSize,
          total,
          onChange: handlePageChange,
        }
      : false as const,
  }), [
    idKey,
    columns,
    list,
    isLoading,
    selectable,
    selectedState,
    scrollX,
    scrollY,
    pagination,
    page,
    pageSize,
    total,
    refetch,
  ])

  return {
    // 表单
    form: form as FormInstance,

    // 表格
    tableProps,

    // 状态
    isLoading,
    isDeleting: deleteMutation.isPending,
    isBatchDeleting: batchDeleteMutation.isPending,

    // 数据
    data,
    list,
    total,

    // 事件
    handleSearch,
    handleReset,
    handleCreate,
    handleEdit,
    handleDelete,
    handleBatchDelete,

    // 选中状态
    selectedState,
    selectedCount,
    selectedIsEmpty,
    setSelectedState,
    resetSelectedState: () => setSelectedState([]),

    // 清除缓存状态
    clearSavedState,

    // 分页状态
    ...(pagination
      ? {
          currentPage: page,
          currentPageSize: pageSize,
          setPage,
          setPageSize,
        }
      : {}),
  }
}
