import type { ButtonProps } from 'antd'

import { useTranslation } from 'react-i18next'

import ConfirmButton from './ConfirmButton'

interface DeleteButtonProps {
  noText?: boolean
  loading?: boolean
  size?: ButtonProps['size']
  type?: ButtonProps['type']
  onConfirm?: () => void
}

export default function DeleteButton({
  noText = false,
  loading = false,
  size = 'middle',
  type = 'default',
  onConfirm,
}: DeleteButtonProps) {
  const { t } = useTranslation()

  function handleConfirm() {
    onConfirm?.()
  }

  return (
    <ConfirmButton
      confirmProps={{
        title: t('common.delete'),
        description: t('common.deleteConfirm'),
        placement: 'topRight',
      }}
      buttonProps={{
        danger: true,
        icon: 'icon-park-outline:delete',
        loading,
        size,
        type,
      }}
      onConfirm={handleConfirm}
    >
      {noText ? '' : t('common.delete')}
    </ConfirmButton>
  )
}
