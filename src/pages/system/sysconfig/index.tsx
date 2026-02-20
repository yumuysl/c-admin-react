import { useEffect, useState } from 'react'
import Button from '@/components/button/Button'
import { Space, Typography, message } from 'antd'
import type { SysconfigPart } from '@/types/sysconfig'
import { useDebounceFn } from 'ahooks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSysconfigData,
  createSysconfig,
  updateSysconfig,
} from '@/apis/sysconfig'
import { number } from 'echarts'

const defaultFormData: SysconfigPart = {
  ossBucket: '',
  fileUploadMax: 0,
}

const { Title, Text } = Typography
const maxLength = 20
const cacheKey = 'sysConfigInfo'

export default function Sysconfig() {
  const [formData, setFormData] = useState<SysconfigPart>(defaultFormData)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: [cacheKey],
    queryFn: getSysconfigData,
  })

  if (isPending) {
    console.log('isPending', isPending)
  }

  if (isError) {
    console.log(isError)
    messageApi.open({
      type: 'error',
      content: '数据加载失败，请重试',
    })
  }

  if (isSuccess) {
    console.log('data', data)
    defaultFormData.ossBucket = data.ossBucket
    defaultFormData.fileUploadMax = data.fileUploadMax
  }

  useEffect(() => {
    console.log('useEffect', defaultFormData)
    setFormData(() => defaultFormData)
  }, [isSuccess])

  const updateMutation = useMutation({
    mutationFn: (values: Partial<SysconfigPart>) =>
      updateSysconfig(Number(data?.id), values),
    onSuccess: (data) => {
      console.log('修改成功', data)
      queryClient.setQueriesData({ queryKey: [cacheKey] }, data)
      messageApi.open({
        type: 'success',
        content: '修改成功',
      })
      changeMode()
    },
    onError: (err) => {
      console.log('修改异常：', err)
    },
  })

  const handleChange = (field: string, value: string) => {
    console.log('编辑', field, ':', value)
    const cloneFormData = JSON.parse(JSON.stringify(formData))

    switch (field) {
      case 'fileUploadMax':
        cloneFormData[field] = Number(value)
        break
      case 'ossBucket':
        cloneFormData[field] = value
        break
    }

    setFormData(cloneFormData)
  }

  const handleSubmit = async () => {
    console.log('submit: ', formData)

    await updateMutation.mutateAsync(formData)
  }

  const { run } = useDebounceFn(handleSubmit, {
    wait: 500,
  })

  const changeMode = () => {
    setIsEdit(!isEdit)
  }

  const handleCancle = () => {
    setFormData(defaultFormData)
    changeMode()
  }

  return (
    <>
      {contextHolder}
      <div className="m-4">
        <Typography>
          <Title level={4}>云存储OSS Bucket</Title>
          <Text
            editable={{
              maxLength: maxLength,
              editing: isEdit,
              text: formData.ossBucket,
              triggerType: ['text'],
              onChange: (value) => handleChange('ossBucket', value),
            }}
          >
            {formData.ossBucket}
          </Text>
          <Title level={4}>上传文件最大数量</Title>
          <Text
            editable={{
              maxLength: maxLength,
              editing: isEdit,
              text: formData.fileUploadMax.toString(),
              triggerType: ['text'],
              onChange: (value) => handleChange('fileUploadMax', value),
            }}
          >
            {formData.fileUploadMax}
          </Text>
        </Typography>
        <div className="mt-4">
          {isEdit ? (
            <Space>
              <Button onClick={handleCancle}>取消</Button>
              <Button onClick={run}> 保存 </Button>
            </Space>
          ) : (
            <Button onClick={changeMode}>修改</Button>
          )}
        </div>
      </div>
    </>
  )
}
