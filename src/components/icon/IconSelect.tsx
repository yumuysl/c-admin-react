import { listIcons } from '@iconify/react'
import { Select, Space } from 'antd'
import { useMemo } from 'react'

import { Icon } from '@/components/icon'

const { Option } = Select

interface IconSelectProps {
  value?: string | null
  onChange?: (value: string | null) => void
}

export default function IconSelect({ value, onChange }: IconSelectProps) {
  const loadedIcons = listIcons()

  const options = useMemo(() => {
    return loadedIcons.map(icon => ({
      label: icon,
      value: icon,
    }))
  }, [loadedIcons])

  function handleChange(icon: string | null) {
    if (icon === undefined) {
      onChange?.(null)
    }
    else {
      onChange?.(icon)
    }
  }

  return (
    <Select
      value={value}
      onChange={handleChange}
      allowClear
      showSearch
      optionFilterProp="children"
    >
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          <Space>
            <Icon icon={option.value} />
            {option.label}
          </Space>
        </Option>
      ))}
    </Select>
  )
}
