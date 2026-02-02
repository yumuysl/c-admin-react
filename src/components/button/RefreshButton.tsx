import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

export default function RefreshButton(props: ButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:refresh" {...props}>
      {t('common.refresh')}
    </Button>
  )
}
