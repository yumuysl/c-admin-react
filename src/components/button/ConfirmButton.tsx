import type { PopconfirmProps } from 'antd'

import { Popconfirm } from 'antd'
import React from 'react'

import type { ButtonProps } from './Button'

import Button from './Button'

export interface ConfirmButtonProps {
  confirmProps?: PopconfirmProps
  buttonProps?: ButtonProps
  onConfirm?: () => void
  children?: React.ReactNode
}

export default function ConfirmButton({
  confirmProps = {
    title: '',
  },
  buttonProps = {},
  onConfirm,
  children,
}: ConfirmButtonProps) {
  function handleConfirm() {
    onConfirm?.()
  }

  return (
    <Popconfirm {...confirmProps} onConfirm={handleConfirm}>
      <Button {...buttonProps}>
        {children}
      </Button>
    </Popconfirm>
  )
}
