import type { ButtonProps as AntdButtonProps } from 'antd'
import type { ReactNode, RefObject } from 'react'

import { Button as AntdButton, Space } from 'antd'

import { Icon } from '@/components/icon'

export interface ButtonProps extends AntdButtonProps {
  ref?: RefObject<HTMLButtonElement | null>
  icon?: string
  iconPosition?: 'start' | 'end'
  loading?: boolean
  children?: ReactNode
}

const buttonSpaceSizeMap = {
  small: 4,
  middle: 8,
  large: 12,
}

export default function Button({
  ref,
  icon,
  iconPosition = 'start',
  size = 'middle',
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const iconClass = iconPosition === 'end' ? 'order-last' : ''

  function renderButtonContent() {
    // 没有图标
    if (!icon)
      return children

    // 有图标但没有 children
    if (!children)
      return <Icon icon={icon} />

    // 有图标也有 children
    return (
      <Space size={buttonSpaceSizeMap[size]}>
        <Icon icon={icon} className={iconClass} />
        {children}
      </Space>
    )
  }

  return (
    <AntdButton
      ref={ref}
      size={size}
      loading={loading}
      {...props}
    >
      {renderButtonContent()}
    </AntdButton>
  )
}
