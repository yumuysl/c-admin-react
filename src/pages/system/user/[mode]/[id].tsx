import { Form, Input, Switch } from 'antd'
import { useTranslation } from 'react-i18next'

import { createUserApi, getUserDetailApi, updateUserApi } from '@/apis/user'
import { SaveButton } from '@/components/button'
import FormContainer from '@/components/container/FormContainer'
import { useForm } from '@/hooks/useForm'

import RoleSelect from '../components/RoleSelect'

export default function UserForm() {
  const { t } = useTranslation()

  // 使用表单Hook
  const {
    title,
    isCreateMode,
    formProps,
    isLoading,
    handleSubmit,
  } = useForm({
    key: 'user', // 与列表页的 key 保持一致，用于提交数据后刷新列表页数据
    getApiFn: getUserDetailApi, // 获取数据接口
    createApiFn: createUserApi, // 创建数据接口
    updateApiFn: updateUserApi, // 更新数据接口
    initialValues: {
      username: null,
      password: null,
      nickName: null,
      email: null,
      phone: null,
      isFrozen: false,
      roles: [],
    },
  })

  // 定义表单验证规则
  const rules = {
    username: [{ required: true, message: t('page.systemUser.rules.username') }],
    password: [{ required: true, message: t('page.systemUser.rules.password') }],
    nickName: [{ required: true, message: t('page.systemUser.rules.nickName') }],
    email: [{ required: true, message: t('page.systemUser.rules.email') }],
    phone: [{ required: true, message: t('page.systemUser.rules.phone') }],
  }

  return (
    <FormContainer title={title}>
      <Form {...formProps}>
        <Form.Item
          label={t('page.systemUser.username')}
          name="username"
          rules={rules.username}
        >
          <Input autoComplete="off" />
        </Form.Item>

        {isCreateMode && (
          <Form.Item
            label={t('page.systemUser.password')}
            name="password"
            rules={rules.password}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          label={t('page.systemUser.nickName')}
          name="nickName"
          rules={rules.nickName}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemUser.email')}
          name="email"
          rules={rules.email}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemUser.phone')}
          name="phone"
          rules={rules.phone}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('page.systemUser.isFrozen')}
          name="isFrozen"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label={t('page.systemUser.roles')}
          name="roles"
        >
          <RoleSelect />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
          <SaveButton type="primary" loading={isLoading} onClick={handleSubmit} />
        </Form.Item>
      </Form>
    </FormContainer>
  )
}
