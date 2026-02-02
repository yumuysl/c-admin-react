import { listIcons } from '@iconify/react'
import { App } from 'antd'
import { useTranslation } from 'react-i18next'

import { BaseContainer } from '@/components/container'
import { Icon } from '@/components/icon'
import { copyToClipboard } from '@/utils/string'

export default function IconExample() {
  const { t } = useTranslation()

  const { message } = App.useApp()

  // 获取图标列表
  const loadedIcons = listIcons()

  // 处理图标点击
  async function handleClickIcon(icon: string) {
    const success = await copyToClipboard(icon)
    if (success) {
      message.success('复制成功')
    }
    else {
      message.error('复制失败')
    }
  }

  return (
    <BaseContainer title={t('page.iconExample.title')}>
      <div className="grid grid-cols-2 gap-4 2xl:grid-cols-18 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-4 xl:grid-cols-14">
        {loadedIcons.map(icon => (
          <div
            key={icon}
            className="aspect-square flex flex-col cursor-pointer items-center justify-center gap-4 border border-gray-200 rounded-md border-solid p-2 hover:bg-gray-100"
            onClick={() => handleClickIcon(icon)}
          >
            <Icon className="text-2xl" icon={icon} />
          </div>
        ))}
      </div>
    </BaseContainer>
  )
}
