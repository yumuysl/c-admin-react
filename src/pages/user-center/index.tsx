import type { Rule } from 'antd/es/form'

import { App, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import { updateUserPasswordApi } from '@/apis/user'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { formLabelCol, formWrapperCol } from '@/hooks/useForm'

interface Model {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function UserCenter() {
  const { t } = useTranslation()

  const [form] = Form.useForm<Model>()

  const { message } = App.useApp()

  // 确认密码验证函数
  const validateConfirmPassword = (_: Rule, value: string) => {
    const newPassword = form.getFieldValue('newPassword')
    if (value !== newPassword) {
      return Promise.reject(new Error(t('page.userCenter.rules.passwordNotMatch')))
    }
    return Promise.resolve()
  }

  // 表单验证规则
  const rules = {
    oldPassword: [
      { required: true, message: t('page.userCenter.rules.oldPassword') },
    ],
    newPassword: [
      { required: true, message: t('page.userCenter.rules.newPassword') },
      { min: 6, max: 16, message: t('page.userCenter.rules.passwordLength') },
    ],
    confirmPassword: [
      { required: true, message: t('page.userCenter.rules.confirmPassword') },
      { validator: validateConfirmPassword, trigger: 'blur' },
    ],
  }

  // 表单提交处理函数
  const handleSubmit = async (values: Model) => {
    try {
      await updateUserPasswordApi(values)
      message.success(t('page.userCenter.success'))
      // 可选：重置表单
      form.resetFields()
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <FormContainer>
      <Form
        form={form}
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        labelCol={formLabelCol}
        wrapperCol={formWrapperCol}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item label={t('page.userCenter.oldPassword')} name="oldPassword" rules={rules.oldPassword}>
          <Input.Password />
        </Form.Item>

        <Form.Item label={t('page.userCenter.newPassword')} name="newPassword" rules={rules.newPassword}>
          <Input.Password />
        </Form.Item>

        <Form.Item label={t('page.userCenter.confirmPassword')} name="confirmPassword" rules={rules.confirmPassword}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
          <SaveButton type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </FormContainer>
  )
}
