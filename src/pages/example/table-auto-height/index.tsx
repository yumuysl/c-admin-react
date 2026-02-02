import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

import { SearchTableContainer } from '@/components/container'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

import { userList } from '../mockData'

export default function TableAutoHeightExample() {
  const { t } = useTranslation()

  function getListApi() {
    return Promise.resolve(userList)
  }

  const {
    listContainerProps,
    tableScrollY,
  } = useSearchTableContainer()

  const {
    tableProps,
  } = useTable({
    key: 'table-height-example',
    pagination: false,
    listApiFn: getListApi,
    scrollY: tableScrollY,
    columns: [
      { title: t('page.tableAutoHeightExample.name'), dataIndex: 'name' },
      { title: t('page.tableAutoHeightExample.age'), dataIndex: 'age' },
      { title: 'Column 1', dataIndex: 'address' },
      { title: 'Column 2', dataIndex: 'address' },
      { title: 'Column 3', dataIndex: 'address' },
    ],
  })

  return (
    <SearchTableContainer {...listContainerProps}>
      <Table {...tableProps} />
    </SearchTableContainer>
  )
}
