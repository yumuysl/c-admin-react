import { useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import { isNil } from 'es-toolkit'
import { useTranslation } from 'react-i18next'

import { getFlatApiApi } from '@/apis/api'

interface ParentNameProps {
  value: number | null
}

export default function ParentName({ value }: ParentNameProps) {
  const { t } = useTranslation()

  // 获取扁平化的菜单数据
  const { data: flatMenu } = useQuery({
    queryKey: ['flatMenu'],
    queryFn: getFlatApiApi,
  })

  const parentName = isNil(value)
    ? t('page.systemApi.topApi')
    : flatMenu?.find(api => api.id === value)?.title

  return <Input value={parentName} disabled />
}
