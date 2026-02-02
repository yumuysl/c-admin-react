import { useTranslation } from 'react-i18next'

import { BaseContainer } from '@/components/container'
import { CountTo } from '@/components/count-to'

export default function CountToExample() {
  const { t } = useTranslation()

  return (
    <BaseContainer title={t('page.countToExample.title')}>
      <h2>{t('page.countToExample.basicUsage')}</h2>
      <CountTo
        startValue={0}
        endValue={1000}
        duration={3000}
      />

      <h2 className="mt-4">
        {t('page.countToExample.prefixSuffix')}
      </h2>
      <CountTo
        startValue={0}
        endValue={2000}
        duration={3000}
        prefix="¥"
        suffix="元"
      />

      <h2 className="mt-4">
        {t('page.countToExample.decimals')}
      </h2>
      <CountTo
        startValue={0}
        endValue={2000}
        duration={3000}
        prefix="¥"
        suffix="元"
        decimals={2}
      />
    </BaseContainer>
  )
}
