import { useTranslation } from 'react-i18next'

import { Exception } from '@/components/exception'

export default function ForbiddenPage() {
  const { t } = useTranslation()

  return (
    <Exception
      status="403"
      title={t('page.forbidden.title')}
      subTitle={t('page.forbidden.subTitle')}
    />
  )
}
