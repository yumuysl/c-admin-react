import { useTranslation } from 'react-i18next'

import type { ButtonProps } from './Button'

import Button from './Button'

interface UploadButtonProps extends ButtonProps {
  noText?: boolean
}

export default function UploadButton({
  noText = false,
  ...props
}: UploadButtonProps) {
  const { t } = useTranslation()

  return (
    <Button icon="icon-park-outline:upload" {...props}>
      {noText ? '' : t('common.upload')}
    </Button>
  )
}
