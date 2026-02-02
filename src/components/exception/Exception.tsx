import type { ResultProps } from 'antd'

import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ExceptionProps {
  status: ResultProps['status']
  title: string
  subTitle: string
}

export default function Exception({ status, title, subTitle }: ExceptionProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleBack() {
    navigate('/')
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={(
          <Button type="primary" onClick={handleBack}>
            {t('common.backHome')}
          </Button>
        )}
      />
    </div>
  )
}
