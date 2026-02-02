import { Divider, Form, Table, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { deleteApiApi, getApiTreeApi } from '@/apis/api'
import { Button, CreateButton, DeleteButton, EditButton, RefreshButton } from '@/components/button'
import { SearchContainer, SearchTableContainer } from '@/components/container'
import { Permission } from '@/components/permission'
import { API_TYPE } from '@/constants/api'
import { API } from '@/constants/permissions'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

export default function ApiList() {
  const { t } = useTranslation()

  // 使用搜索表格容器
  const {
    listContainerProps,
    tableScrollY,
  } = useSearchTableContainer()

  // 使用表格Hook
  const {
    tableProps,
    isLoading,
    isDeleting,
    handleReset,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useTable({
    key: 'api', // 表格唯一标识，不要与其他模块重名
    cacheEnabled: true, // 是否启用缓存
    dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10分钟
    pagination: false, // 是否开启分页
    listApiFn: getApiTreeApi, // 获取列表数据接口
    deleteApiFn: deleteApiApi, // 删除数据接口
    scrollY: tableScrollY, // 表格高度，从useSearchTableContainer获取
    columns: [
      { title: t('page.systemApi.title'), dataIndex: 'title' },
      {
        title: t('page.systemApi.type'),
        dataIndex: 'type',
        render: (type: API_TYPE) => {
          if (type === API_TYPE.DIRECTORY) {
            return <Tag>{t('page.systemApi.directory')}</Tag>
          }
          else {
            return <Tag color="blue">{t('page.systemApi.api')}</Tag>
          }
        },
      },
      {
        title: t('page.systemApi.method'),
        dataIndex: 'method',
        render: (method: string) =>
          method ? <Tag color="green">{method}</Tag> : null,
      },
      { title: t('page.systemApi.path'), dataIndex: 'path' },
      { title: t('page.systemApi.code'), dataIndex: 'code' },
      { title: t('page.systemApi.sort'), dataIndex: 'sort' },
      {
        title: t('common.actions'),
        key: 'actions',
        fixed: 'right',
        width: 150,
        render: (_, record: any) => (
          <>
            <Permission permission={API.CREATE}>
              {record.type === API_TYPE.DIRECTORY && (
                <Button
                  icon="icon-park-outline:tree-diagram"
                  type="text"
                  size="small"
                  onClick={() => handleCreate(record)}
                />
              )}
            </Permission>
            <Permission permission={API.UPDATE}>
              <EditButton
                type="text"
                size="small"
                noText
                onClick={() => handleEdit(record, record)}
              />
            </Permission>
            <Permission permission={API.DELETE}>
              {(!record.children || record.children.length === 0) && (
                <DeleteButton
                  type="text"
                  size="small"
                  noText
                  loading={isDeleting}
                  onConfirm={() => handleDelete(record.id)}
                />
              )}
            </Permission>
          </>
        ),
      },
    ],
  })

  // 搜索表单
  const searchForm = (
    <Form colon={false}>
      <SearchContainer
        actions={(
          <>
            <RefreshButton loading={isLoading} onClick={handleReset} />
            <Divider type="vertical" />
            <Permission permission={API.CREATE}>
              <CreateButton onClick={() => handleCreate({ id: null })} />
            </Permission>
          </>
        )}
      />
    </Form>
  )

  return (
    <SearchTableContainer
      {...listContainerProps}
      searchForm={searchForm}
    >
      <Table {...tableProps} />
    </SearchTableContainer>
  )
}
