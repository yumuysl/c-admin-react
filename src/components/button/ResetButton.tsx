import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

export default function ResetButton(props: ButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:undo" {...props}>
      {t('common.reset')}
    </Button>
  )
}
