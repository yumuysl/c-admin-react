import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'

import { getApiPermissionApi } from '@/apis/api'

interface ApiPermissionSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

export default function ApiPermissionSelect({ value = [], onChange }: ApiPermissionSelectProps) {
  const { data } = useQuery({
    queryKey: ['apiPermission'],
    queryFn: () => getApiPermissionApi(),
  })

  const options = data?.map(item => ({
    label: item.title,
    value: item.code,
  })) || []

  return (
    <div>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        mode="multiple"
        allowClear
      />
    </div>
  )
}
