import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'

import type { MENU_TYPE } from '@/constants/menu'

import { getMenuPermissionApi } from '@/apis/menu'

interface MenuPermissionSelectProps {
  type: MENU_TYPE.MENU | MENU_TYPE.FEATURE
  value?: string[]
  onChange?: (value: string[]) => void
}

export default function MenuPermissionSelect({ type, value = [], onChange }: MenuPermissionSelectProps) {
  const { data } = useQuery({
    queryKey: ['menuPermission', type],
    queryFn: () => getMenuPermissionApi(type),
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
