import { App, Button, Input, Space } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseContainer } from '@/components/container'
import { copyToClipboard } from '@/utils/string'

export default function ClipboardExample() {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const { message } = App.useApp()
  async function handleCopy() {
    if (!text) {
      return
    }

    const success = await copyToClipboard(text)
    if (success) {
      message.success(t('page.clipboardExample.copied'))
    }
    else {
      message.error(t('page.clipboardExample.copyFailed'))
    }
  }

  return (
    <BaseContainer title={t('page.clipboardExample.title')}>
      <Space.Compact>
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button type="primary" onClick={handleCopy}>
          {t('page.clipboardExample.copyToClipboard')}
        </Button>
      </Space.Compact>
    </BaseContainer>
  )
}
