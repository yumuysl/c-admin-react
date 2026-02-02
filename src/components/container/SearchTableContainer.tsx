import type { ReactNode, RefObject } from 'react'

import { Card } from 'antd'

interface SearchTableContainerProps {
  searchCardRef: RefObject<HTMLDivElement>
  tableCardHeight: number
  children?: ReactNode
  searchForm?: ReactNode
}

export default function SearchTableContainer({
  searchCardRef,
  tableCardHeight,
  children,
  searchForm,
}: SearchTableContainerProps) {
  return (
    <div className="m-2 flex flex-col items-stretch gap-2 overflow-hidden lt-sm:overflow-auto">
      {searchForm && (
        <Card
          ref={searchCardRef}
          size="small"
          variant="borderless"
        >
          {searchForm}
        </Card>
      )}

      <Card
        style={{ height: `${tableCardHeight}px` }}
        size="small"
        variant="borderless"
      >
        {children}
      </Card>
    </div>
  )
}
