import type { ReactNode } from 'react'

import { Row } from 'antd'

interface SearchRowProps {
  children?: ReactNode
}

export default function SearchRow({ children }: SearchRowProps) {
  return (
    <Row gutter={16}>
      {children}
    </Row>
  )
}
