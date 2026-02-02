import { useTranslation } from 'react-i18next'

import { Exception } from '@/components/exception'

export default function ServerErrorPage() {
  const { t } = useTranslation()

  return (
    <Exception
      status="500"
      title={t('page.serverError.title')}
      subTitle={t('page.serverError.subTitle')}
    />
  )
}
