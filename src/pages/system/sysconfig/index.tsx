import { useState } from 'react'
import Button from '@/components/button/Button'
import { Space, Typography } from 'antd'
import type { SysconfigPart } from '@/types/sysconfig'
import { useDebounceFn } from 'ahooks'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSysconfigData,
  createSysconfig,
  updateSysconfig,
} from '@/apis/sysconfig'

const defaultFormData: SysconfigPart = {
  bucket: '',
}

const { Title, Text } = Typography
const maxLength = 20
const cacheKey = 'sysConfigInfo'

export default function Sysconfig() {
  const [formData, setFormData] = useState<SysconfigPart>(defaultFormData)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: [cacheKey],
    queryFn: getSysconfigData,
  })

  if (isPending) {
    console.log('isPending', isPending)
  }

  if (isError) {
    console.log(isError)
  }

  if (isSuccess) {
    console.log('data', data)
    defaultFormData.bucket = data.bucket
    formData.bucket = data.bucket
  }

  const updateMutation = useMutation({
    mutationFn: (values: Partial<SysconfigPart>) =>
      updateSysconfig(Number(data?.id), values),
    onSuccess: (data) => {
      console.log('修改成功', data)
      queryClient.setQueriesData({ queryKey: [cacheKey] }, data)
      changeMode()
    },
    onError: (err) => {
      console.log('修改异常：', err)
    },
  })

  const handleChange = (field: string, value: string) => {
    console.log('编辑', field, ':', value)
    const cloneFormData = JSON.parse(JSON.stringify(formData))
    cloneFormData[field] = value
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
      <div>
        <Typography>
          <Title level={3}>OSS Bucket</Title>
          <Text
            editable={{
              maxLength: maxLength,
              editing: isEdit,
              text: formData.bucket,
              triggerType: ['text'],
              onChange: (value) => handleChange('bucket', value),
            }}
          >
            {formData.bucket}
          </Text>
        </Typography>
        <div>
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
