import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'

import { getAllRoleApi } from '@/apis/role'

interface RoleSelectProps {
  value?: number[]
  onChange?: (value: number[]) => void
}

export default function RoleSelect({ value, onChange }: RoleSelectProps) {
  const { data } = useQuery({
    queryKey: ['roleAll'],
    queryFn: () => getAllRoleApi(),
  })

  const options = data?.map(item => ({
    label: item.name,
    value: item.id,
  })) || []

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      mode="multiple"
      allowClear
    />
  )
}
