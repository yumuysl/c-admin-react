import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { FormContainer } from '@/components/container'
import { formLabelCol, formWrapperCol } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

export default function PageTransferExample() {
  const { t } = useTranslation()
  const { navigateWithData } = usePageTransfer()
  const [form] = Form.useForm()

  // 定义选项数据
  const genderOptions = [
    { label: t('common.gender.male'), value: 'male' },
    { label: t('common.gender.female'), value: 'female' },
  ]

  const hobbyOptions = [
    { label: t('page.pageTransferExample.hobbyOptions.basketball'), value: 'basketball' },
    { label: t('page.pageTransferExample.hobbyOptions.football'), value: 'football' },
    { label: t('page.pageTransferExample.hobbyOptions.badminton'), value: 'badminton' },
    { label: t('page.pageTransferExample.hobbyOptions.pingpong'), value: 'pingpong' },
    { label: t('page.pageTransferExample.hobbyOptions.swimming'), value: 'swimming' },
    { label: t('page.pageTransferExample.hobbyOptions.running'), value: 'running' },
    { label: t('page.pageTransferExample.hobbyOptions.gym'), value: 'gym' },
    { label: t('page.pageTransferExample.hobbyOptions.reading'), value: 'reading' },
  ]

  // 点击按钮处理函数
  function handleClick() {
    const values = form.getFieldsValue()
    navigateWithData('/example/page-transfer/transferred', values)
  }

  return (
    <FormContainer title={t('page.pageTransferExample.transfer')} showBack={false}>
      <Form
        form={form}
        initialValues={{
          name: '',
          age: '',
          gender: '',
          hobby: [],
        }}
        labelCol={formLabelCol}
        wrapperCol={formWrapperCol}
      >
        <Form.Item
          name="name"
          label={t('page.pageTransferExample.form.name')}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label={t('page.pageTransferExample.form.age')}
        >
          <InputNumber
            min={0}
            max={100}
            precision={0}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label={t('page.pageTransferExample.form.gender')}
        >
          <Select options={genderOptions} />
        </Form.Item>

        <Form.Item
          name="hobby"
          label={t('page.pageTransferExample.form.hobby')}
        >
          <Select
            options={hobbyOptions}
            mode="multiple"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 8 }}>
          <Button type="primary" onClick={handleClick}>
            {t('page.pageTransferExample.form.button')}
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  )
}
