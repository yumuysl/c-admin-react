import type { Rule } from 'antd/es/form'

import { Form, Input, InputNumber, Radio, Select } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { createApiApi, getApiDetailApi, updateApiApi } from '@/apis/api'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { API_METHOD, API_TYPE } from '@/constants/api'
import { useForm } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

import ParentName from '../components/ParentName'

export default function ApiForm() {
  const { t } = useTranslation()

  const { getTransferredData } = usePageTransfer()
  const data = getTransferredData()

  // 使用表单Hook
  const {
    title,
    isCreateMode,
    isEditMode,
    form,
    formProps,
    isLoading,
    handleSubmit,
  } = useForm({
    key: 'api', // 与列表页的 key 保持一致，用来提交数据后，使列表页数据刷新
    getApiFn: getApiDetailApi, // 获取数据接口
    createApiFn: createApiApi, // 创建数据接口
    updateApiFn: updateApiApi, // 更新数据接口
    initialValues: {
      parentId: data?.id,
      title: null,
      type: null,
      path: null,
      method: null,
      code: null,
      description: null,
      sort: 0,
    },
  })

  // 获取当前表单值
  const formValues = Form.useWatch([], form)

  // 计算parentId
  const parentId = isCreateMode ? data?.id : formValues?.parentId

  // API类型选项
  const apiTypeOptions = useMemo(() => [
    { label: t('page.systemApi.directory'), value: API_TYPE.DIRECTORY },
    { label: t('page.systemApi.api'), value: API_TYPE.API },
  ], [t])

  // API方法选项
  const methodOptions = [
    { label: 'GET', value: API_METHOD.GET },
    { label: 'POST', value: API_METHOD.POST },
    { label: 'PUT', value: API_METHOD.PUT },
    { label: 'PATCH', value: API_METHOD.PATCH },
    { label: 'DELETE', value: API_METHOD.DELETE },
  ]

  // 表单验证规则
  const rules: Record<string, Rule[]> = useMemo(() => {
    const baseRules = {
      title: [{
        required: true,
        message: t('page.systemApi.rules.title'),
      }],
      type: [{
        required: true,
        message: t('page.systemApi.rules.type'),
      }],
    }

    if (formValues?.type === API_TYPE.API) {
      return {
        ...baseRules,
        path: [{
          required: true,
          message: t('page.systemApi.rules.path'),
        }],
        method: [{
          required: true,
          message: t('page.systemApi.rules.method'),
        }],
      }
    }

    return baseRules
  }, [formValues?.type, t])

  // 处理类型变更
  const handleChangeType = () => {
    // 重置相关字段
    form.setFieldsValue({
      method: null,
      path: null,
      code: null,
    })
  }

  return (
    <FormContainer title={title}>
      <Form
        {...formProps}
        onFinish={handleSubmit}
      >
        <Form.Item label={t('page.systemApi.parentApi')}>
          <ParentName value={parentId} />
        </Form.Item>

        <Form.Item
          label={t('page.systemApi.title')}
          name="title"
          rules={rules.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemApi.description')}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label={t('page.systemApi.type')}
          name="type"
          rules={rules.type}
        >
          <Radio.Group
            optionType="button"
            options={apiTypeOptions}
            disabled={isEditMode}
            onChange={handleChangeType}
          />
        </Form.Item>

        {formValues?.type === API_TYPE.API && (
          <Form.Item
            label={t('page.systemApi.path')}
            name="path"
            rules={rules.path}
          >
            <Input />
          </Form.Item>
        )}

        {formValues?.type === API_TYPE.API && (
          <Form.Item
            label={t('page.systemApi.method')}
            name="method"
            rules={rules.method}
          >
            <Select
              options={methodOptions}
              allowClear
            />
          </Form.Item>
        )}

        {formValues?.type === API_TYPE.API && (
          <Form.Item
            label={t('page.systemApi.code')}
            name="code"
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label={t('page.systemApi.sort')}
          name="sort"
        >
          <InputNumber min={0} precision={0} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
          <SaveButton type="primary" loading={isLoading} />
        </Form.Item>
      </Form>
    </FormContainer>
  )
}
