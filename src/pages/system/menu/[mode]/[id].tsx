import type { RadioGroupProps } from 'antd'
import type { Rule } from 'antd/es/form'

import { Form, Input, InputNumber, Radio, Switch } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { createMenuApi, getMenuDetailApi, updateMenuApi } from '@/apis/menu'
import { SaveButton } from '@/components/button'
import FormContainer from '@/components/container/FormContainer'
import { IconSelect } from '@/components/icon'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

import ParentName from '../components/ParentName'

export default function MenuForm() {
  const { t } = useTranslation()
  const { getTransferredData } = usePageTransfer()
  const data = getTransferredData()
  console.log('打印传输数据 ', data)

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
    key: 'menu', // 与列表页的key保持一致，用于提交后刷新列表
    getApiFn: getMenuDetailApi, // 获取数据接口
    createApiFn: createMenuApi, // 创建数据接口
    updateApiFn: updateMenuApi, // 更新数据接口
    initialValues: {
      parentId: data?.id,
      title: null,
      type: null,
      icon: null,
      path: null,
      code: null,
      description: null,
      i18nKey: null,
      sort: 0,
      isShow: true,
    },
  })

  // 获取当前表单值
  const formValues = Form.useWatch([], form)

  // 计算parentId
  const parentId = isCreateMode ? data?.id : formValues?.parentId
  console.log('打印parentId: ', parentId)

  // 计算菜单类型选项
  const menuTypeOptions = useMemo(() => {
    const allOptions = [
      { label: t('page.systemMenu.directory'), value: MENU_TYPE.DIRECTORY },
      { label: t('page.systemMenu.menu'), value: MENU_TYPE.MENU },
      { label: t('page.systemMenu.feature'), value: MENU_TYPE.FEATURE },
    ]

    if (isCreateMode) {
      if (!data?.id) {
        return allOptions.filter((option) => option.value !== MENU_TYPE.FEATURE)
      }

      if (data.type === MENU_TYPE.DIRECTORY) {
        return allOptions.filter((option) => option.value !== MENU_TYPE.FEATURE)
      }

      if (data.type === MENU_TYPE.MENU) {
        return allOptions.filter((option) => option.value === MENU_TYPE.FEATURE)
      }

      console.log('打印allOptions:', allOptions)
      return allOptions
    } else {
      return allOptions.filter((option) => option.value === formValues?.type)
    }
  }, [isCreateMode, data?.id, data?.type, formValues?.type, t])

  // 表单验证规则
  const rules: Record<string, Rule[]> = useMemo(() => {
    const baseRules = {
      title: [{ required: true, message: t('page.systemMenu.rules.title') }],
      type: [{ required: true, message: t('page.systemMenu.rules.type') }],
    }

    return formValues?.type === MENU_TYPE.MENU
      ? {
          ...baseRules,
          path: [{ required: true, message: t('page.systemMenu.rules.path') }],
        }
      : baseRules
  }, [formValues?.type, t])

  // 处理类型变更
  const handleChangeType: RadioGroupProps['onChange'] = (e) => {
    // 重置相关字段
    form.setFieldsValue({
      icon: null,
      path: null,
      code: null,
    })

    // 清除路径验证
    if (
      e.target.value === MENU_TYPE.DIRECTORY ||
      e.target.value === MENU_TYPE.FEATURE
    ) {
      form.resetFields(['icon', 'path', 'code'])
      form.validateFields(['path'])
    }
  }

  return (
    <FormContainer title={title}>
      <Form {...formProps} onFinish={handleSubmit}>
        <Form.Item label={t('page.systemMenu.parentMenu')} name="parentId">
          <ParentName value={parentId} />
        </Form.Item>

        <Form.Item
          label={t('page.systemMenu.title')}
          name="title"
          rules={rules.title}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t('page.systemMenu.description')} name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label={t('page.systemMenu.type')}
          name="type"
          rules={rules.type}
        >
          <Radio.Group
            optionType="button"
            options={menuTypeOptions}
            disabled={isEditMode}
            onChange={handleChangeType}
          />
        </Form.Item>

        {formValues?.type && formValues.type !== MENU_TYPE.FEATURE && (
          <Form.Item label={t('page.systemMenu.icon')} name="icon">
            <IconSelect />
          </Form.Item>
        )}

        {formValues?.type && formValues.type === MENU_TYPE.MENU && (
          <Form.Item
            label={t('page.systemMenu.path')}
            name="path"
            rules={rules?.path}
          >
            <Input />
          </Form.Item>
        )}

        {formValues?.type &&
          (formValues.type === MENU_TYPE.MENU ||
            formValues.type === MENU_TYPE.FEATURE) && (
            <Form.Item label={t('page.systemMenu.code')} name="code">
              <Input />
            </Form.Item>
          )}

        {formValues?.type &&
          (formValues.type === MENU_TYPE.DIRECTORY ||
            formValues.type === MENU_TYPE.MENU) && (
            <Form.Item label={t('page.systemMenu.i18nKey')} name="i18nKey">
              <Input />
            </Form.Item>
          )}

        <Form.Item label={t('page.systemMenu.sort')} name="sort">
          <InputNumber min={0} precision={0} />
        </Form.Item>

        {formValues?.type === MENU_TYPE.MENU && (
          <Form.Item
            label={t('page.systemMenu.isShow')}
            name="isShow"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
          <SaveButton type="primary" loading={isLoading} />
        </Form.Item>
      </Form>
    </FormContainer>
  )
}
