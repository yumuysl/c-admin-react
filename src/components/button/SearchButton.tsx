import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

export default function SearchButton(props: ButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:search" htmlType="submit" {...props}>
      {t('common.search')}
    </Button>
  )
}
