import type { CheckboxProps } from 'antd'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { LoginInfo } from '@/types/user'

import { LangSelect, ThemeToggle } from '@/components/common'
import { Icon } from '@/components/icon'
import { Wave } from '@/components/login'
import { useAuthNavigation } from '@/hooks/useAuthNavigation'
import { useLoading } from '@/hooks/useLoading'
import { deCode, enCode } from '@/utils/string'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuthNavigation()
  const { loading, loadingFnWrapper } = useLoading()
  const [form] = Form.useForm()

  // 记住我状态
  const [isRemember, setIsRemember] = useState(false)
  const rememberKey = enCode('LOGIN_REMEMBER')
  const rememberValueTrue = enCode('LOGIN_REMEMBER_TRUE')
  const rememberUsernameKey = enCode('LOGIN_REMEMBER_USERNAME')
  const rememberPasswordKey = enCode('LOGIN_REMEMBER_PASSWORD')

  useEffect(() => {
    if (localStorage.getItem(rememberKey) === rememberValueTrue) {
      setRemember()
    }
  }, [])

  const onRememberChange: CheckboxProps['onChange'] = (e) => {
    if (!e.target.checked) {
      clearRemember()
    }
  }

  function onForgot() {
    // 跳转到忘记密码页面
  }

  const handleLogin = loadingFnWrapper(async (data: LoginInfo) => {
    await login(data)
    if (isRemember) {
      saveRemember(data.username, data.password)
    }
  })

  function onFinish(data: LoginInfo) {
    handleLogin(data)
  }

  function setRemember() {
    const remember = localStorage.getItem(rememberKey)
    if (remember === rememberValueTrue) {
      const username = deCode(localStorage.getItem(rememberUsernameKey) || '')
      const password = deCode(localStorage.getItem(rememberPasswordKey) || '')
      form.setFieldsValue({
        username,
        password,
      })
      setIsRemember(true)
    }
  }

  function saveRemember(username: string, password: string) {
    localStorage.setItem(rememberKey, rememberValueTrue)
    localStorage.setItem(rememberUsernameKey, enCode(username))
    localStorage.setItem(rememberPasswordKey, enCode(password))
  }

  function clearRemember() {
    localStorage.removeItem(rememberKey)
    localStorage.removeItem(rememberUsernameKey)
    localStorage.removeItem(rememberPasswordKey)
  }

  return (
    <div className="relative bg-login dark:bg-login-dark">
      <div className="min-h-[80vh] w-screen flex flex-col items-center justify-center py-10">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 text-center text-white/88 dark:text-black/85">
            <Icon icon="icon-local:logo" className="block text-5xl" />
            <div className="text-3xl font-bold">
              {import.meta.env.VITE_APP_TITLE}
            </div>
          </div>
          <div className="w-80 border rounded-xl bg-white/80 p-4 shadow transition-all dark:bg-black/80 hover:shadow-2xl">
            <Form
              form={form}
              initialValues={{
                username: 'pure-admin',
                password: '123456',
              }}
              size="large"
              validateTrigger={['onChange', 'onBlur']}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: t('page.login.userNamePlaceholder') },
                ]}
              >
                <Input
                  disabled={loading}
                  size="large"
                  allowClear
                  placeholder={t('page.login.userNamePlaceholder')}
                  prefix={(
                    <UserOutlined style={{ color: '#D9D9D9' }} />
                  )}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: t('page.login.passwordPlaceholder') },
                ]}
              >
                <Input.Password
                  disabled={loading}
                  size="large"
                  allowClear
                  placeholder={t('page.login.passwordPlaceholder')}
                  prefix={(
                    <LockOutlined style={{ color: '#D9D9D9' }} />
                  )}
                />
              </Form.Item>
              <div className="mb-4 flex flex-row justify-between">
                <Checkbox
                  checked={isRemember}
                  disabled={loading}
                  className="cursor-pointer select-none"
                  onChange={onRememberChange}
                >
                  {t('page.login.rememberMe')}
                </Checkbox>
                <Typography.Link
                  className="cursor-pointer select-none"
                  onClick={onForgot}
                >
                  {t('page.login.forgotPassword')}
                </Typography.Link>
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  {t('page.login.login')}
                </Button>
              </Form.Item>
            </Form>
            <div className="flex justify-end">
              <LangSelect />
              <ThemeToggle animate={false} />
            </div>
          </div>
        </div>
      </div>
      <Wave />
    </div>
  )
}
