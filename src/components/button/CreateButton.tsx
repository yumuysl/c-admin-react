import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

interface CreateButtonProps extends ButtonProps {
  noText?: boolean
}

export default function CreateButton({ noText = false, ...props }: CreateButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:add-one" {...props}>
      {noText ? '' : t('common.create')}
    </Button>
  )
}
