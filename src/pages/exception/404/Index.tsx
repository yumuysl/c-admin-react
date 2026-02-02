import { useTranslation } from 'react-i18next'

import { Exception } from '@/components/exception'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Exception
      status="404"
      title={t('page.notFound.title')}
      subTitle={t('page.notFound.subTitle')}
    />
  )
}
