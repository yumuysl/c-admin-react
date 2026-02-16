import { useState } from 'react'
import Button from '@/components/button/Button'
import { Space, Typography } from 'antd'
import { useDebounceFn } from 'ahooks'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  getSysconfigData,
  createSysconfig,
  updateSysconfig,
} from '@/apis/sysconfig'

interface FormDataType {
  ossSever: 'aliyun' | 'tengxun'
  bucket: string
}

const defaultFormData: FormDataType = {
  ossSever: 'aliyun',
  bucket: '',
}

const { Title, Text } = Typography
const maxLength = 20

export default function Sysconfig() {
  const [formData, setFormData] = useState<FormDataType>(defaultFormData)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const sysConfigInfo = useQuery({
    queryKey: ['sysConfigInfo'],
    queryFn: getSysconfigData,
  })

  const getConfigData = async () => {
    console.log()
  }

  const handleChange = (field: string, value: string) => {
    console.log('编辑', field, ':', value)
    const cloneFormData = JSON.parse(JSON.stringify(formData))
    cloneFormData[field] = value
    setFormData(cloneFormData)
  }
  const handleSubmit = async () => {
    console.log('submit: ', formData)
    //TODO:通过tanstack query的useQuery方法加载数据

    changeMode()
    await getConfigData()
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
          <Title level={3}>OSS Sever</Title>
          <Text
            editable={{
              maxLength: maxLength,
              editing: isEdit,
              text: formData.ossSever,
              triggerType: ['text'],
              onChange: (value) => handleChange('ossSever', value),
            }}
          >
            {formData.ossSever}
          </Text>

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
