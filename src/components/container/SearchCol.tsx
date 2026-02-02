import type { FormItemProps } from 'antd'
import type { ReactNode } from 'react'

import { Col, Form } from 'antd'

interface SearchColProps extends FormItemProps {
  children?: ReactNode
}

export default function SearchCol(props: SearchColProps) {
  const { children, ...formItemProps } = props

  return (
    <Col md={12} lg={8} xl={6} xxl={4}>
      <Form.Item {...formItemProps}>
        {children}
      </Form.Item>
    </Col>
  )
}
