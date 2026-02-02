import { useTranslation } from 'react-i18next'

import { FormContainer } from '@/components/container'
import { usePageTransfer } from '@/hooks/usePageTransfer'

export default function TransferredDataPage() {
  const { t } = useTranslation()
  const { getTransferredData } = usePageTransfer()

  const data = getTransferredData()

  return (
    <FormContainer title={t('page.pageTransferExample.transferred')} showBack={false}>
      {JSON.stringify(data, null, 2)}
    </FormContainer>
  )
}
