import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

export default function SaveButton(props: ButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:disk" htmlType="submit" {...props}>
      {t('common.save')}
    </Button>
  )
}
