import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import { createRoleApi, getRoleDetailApi, updateRoleApi } from '@/apis/role'
import { SaveButton } from '@/components/button'
import FormContainer from '@/components/container/FormContainer'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'

import ApiPermissionSelect from '../components/ApiPermissionSelect'
import MenuPermissionSelect from '../components/MenuPermissionSelect'

export default function UserForm() {
  const { t } = useTranslation()

  // 使用表单Hook
  const {
    title,
    formProps,
    isLoading,
    handleSubmit,
  } = useForm({
    key: 'role', // 与列表页的 key 保持一致，用于提交数据后刷新列表页数据
    getApiFn: getRoleDetailApi, // 获取数据接口
    createApiFn: createRoleApi, // 创建数据接口
    updateApiFn: updateRoleApi, // 更新数据接口
    initialValues: {
      name: null,
      code: null,
      description: null,
      menuPermissions: [],
      featurePermissions: [],
      apiPermissions: [],
    },
  })

  // 定义表单验证规则
  const rules = {
    name: [{ required: true, message: t('page.systemRole.rules.name') }],
    code: [{ required: true, message: t('page.systemRole.rules.code') }],
  }

  return (
    <FormContainer title={title}>
      <Form {...formProps}>
        <Form.Item
          label={t('page.systemUser.username')}
          name="name"
          rules={rules.name}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemRole.code')}
          name="code"
          rules={rules.code}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemRole.description')}
          name="description"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemRole.menuPermissions')}
          name="menuPermissions"
        >
          <MenuPermissionSelect type={MENU_TYPE.MENU} />
        </Form.Item>

        <Form.Item
          label={t('page.systemRole.featurePermissions')}
          name="featurePermissions"
        >
          <MenuPermissionSelect type={MENU_TYPE.FEATURE} />
        </Form.Item>

        <Form.Item
          label={t('page.systemRole.apiPermissions')}
          name="apiPermissions"
        >
          <ApiPermissionSelect />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
          <SaveButton type="primary" loading={isLoading} onClick={handleSubmit} />
        </Form.Item>
      </Form>
    </FormContainer>
  )
}
