import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

interface EditButtonProps extends ButtonProps {
  noText?: boolean
}

export default function EditButton({ noText = false, ...props }: EditButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:edit" {...props}>
      {noText ? '' : t('common.edit')}
    </Button>
  )
}
