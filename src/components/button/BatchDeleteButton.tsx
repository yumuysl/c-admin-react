import type { ButtonProps } from 'antd'

import { useTranslation } from 'react-i18next'

import ConfirmButton from './ConfirmButton'

interface BatchDeleteButtonProps {
  noText?: boolean
  loading?: boolean
  disabled?: boolean
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  count: number
  onConfirm: () => void
}

export default function BatchDeleteButton({
  noText = false,
  loading = false,
  disabled = false,
  size = 'middle',
  type = 'default',
  count,
  onConfirm,
}: BatchDeleteButtonProps) {
  const { t } = useTranslation()

  function handleConfirm() {
    onConfirm()
  }

  return (
    <ConfirmButton
      confirmProps={{
        title: t('common.batchDelete'),
        description: t('common.batchDeleteConfirm', { count }),
        placement: 'topRight',
      }}
      buttonProps={{
        danger: true,
        icon: 'icon-park-outline:delete',
        loading,
        disabled,
        size,
        type,
      }}
      onConfirm={handleConfirm}
    >
      {noText ? '' : t('common.batchDelete')}
    </ConfirmButton>
  )
}
