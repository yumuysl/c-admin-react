import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

export default function BackButton(props: ButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:left" {...props}>
      {t('common.back')}
    </Button>
  )
}
