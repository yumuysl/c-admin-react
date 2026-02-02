import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

// 提取 Promise 返回值类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// 表单布局配置
export const formLabelCol = {
  xs: { span: 24 },
  sm: { span: 6 },
  md: { span: 6 },
  lg: { span: 6 },
  xl: { span: 6 },
  xxl: { span: 6 },
}

export const formWrapperCol = {
  xs: { span: 24 },
  sm: { span: 18 },
  md: { span: 18 },
  lg: { span: 16 },
  xl: { span: 14 },
  xxl: { span: 12 },
}

interface UseFormOptions<TCreateFn extends (data: any) => Promise<any>> {
  key: string
  getApiFn?: (id: number) => Promise<UnwrapPromise<ReturnType<TCreateFn>>>
  createApiFn: TCreateFn
  updateApiFn: (
    id: number,
    data: Partial<UnwrapPromise<ReturnType<TCreateFn>>>
  ) => Promise<UnwrapPromise<ReturnType<TCreateFn>>>
  initialValues?: Record<string, any>
  backAfterSuccess?: boolean
}

export function useForm<TCreateFn extends (data: any) => Promise<any>>({
  key,
  getApiFn,
  createApiFn,
  updateApiFn,
  initialValues = {},
  backAfterSuccess = true,
}: UseFormOptions<TCreateFn>) {
  type TModel = UnwrapPromise<ReturnType<TCreateFn>>

  const { t } = useTranslation()
  const params = useParams()
  console.log('打印params：', params)
  console.log('打印initialValues：', initialValues)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 创建antd表单实例
  const [form] = Form.useForm()

  // 用于处理初始加载和提交中状态
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ---------- 查询键 ----------
  const listQueryKey = `${key}-list`
  const detailQueryKey = `${key}-detail`

  // ---------- 模式 ----------
  const { mode, id } = params as { mode?: string; id?: string }
  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'

  // ---------- 标题 ----------
  const title = isCreateMode
    ? t('common.create')
    : isEditMode
      ? t('common.edit')
      : ''

  // ---------- 详情数据 ----------
  const { data: detailData, isLoading: isLoadingDetail } = useQuery({
    queryKey: [detailQueryKey, id],
    queryFn: () => (getApiFn ? getApiFn(Number(id)) : null),
    enabled: isEditMode && !!getApiFn && !!id,
    // select: (data) => {
    //   if (data) {
    //     // 设置表单值
    //     form.setFieldsValue(data)
    //   }
    // },
  })

  useEffect(() => {
    if (detailData) {
      form.setFieldsValue(detailData)
    }
  }, [detailData, form])

  // ---------- 创建和更新操作 ----------
  const createMutation = useMutation({
    mutationFn: createApiFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
      if (backAfterSuccess) handleBack()
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (values: Partial<TModel>) => updateApiFn(Number(id), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [listQueryKey] })
      if (backAfterSuccess) handleBack()
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  // ---------- 操作方法 ----------
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      // 使用form.validateFields()进行表单验证
      const values = await form.validateFields()

      console.log('isCreateMode: ', isCreateMode, values)

      if (isCreateMode) {
        await createMutation.mutateAsync(values)
      } else if (isEditMode && id) {
        await updateMutation.mutateAsync(values)
      }
    } catch (error) {
      // 表单验证失败
      console.log('Form validation failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  // ---------- 表单属性 ----------
  const formProps = useMemo(
    () => ({
      form,
      layout: 'horizontal' as const,
      initialValues: isCreateMode ? initialValues : undefined, // 仅创建模式使用初始值
      labelCol: formLabelCol,
      wrapperCol: formWrapperCol,
      autoComplete: 'off',
    }),
    [form, isCreateMode, initialValues]
  )

  return {
    id,
    title,
    isCreateMode,
    isEditMode,
    form,
    formProps,
    detailData,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      isLoadingDetail ||
      isSubmitting,
    handleSubmit,
    handleBack,
  }
}
