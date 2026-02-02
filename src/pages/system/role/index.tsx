import { Divider, Form, Input, Space, Table } from 'antd'
import { useTranslation } from 'react-i18next'

import { batchDeleteRoleApi, deleteRoleApi, getRoleListApi } from '@/apis/role'
import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableContainer } from '@/components/container'
import { Permission } from '@/components/permission'
import { ROLE } from '@/constants/permissions'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

export default function UserList() {
  const { t } = useTranslation()

  const {
    listContainerProps,
    tableScrollY,
  } = useSearchTableContainer()

  const {
    form,
    tableProps,
    isLoading,
    isDeleting,
    isBatchDeleting,
    handleSearch,
    handleReset,
    handleCreate,
    handleEdit,
    handleDelete,
    handleBatchDelete,
    selectedCount,
    selectedIsEmpty,
  } = useTable({
    key: 'role', // 表格唯一标识，不要与其他模块重名
    cacheEnabled: true, // 是否启用缓存
    dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
    pagination: true, // 是否开启分页
    selectable: true, // 是否开启选择
    listApiFn: getRoleListApi, // 获取列表数据接口
    deleteApiFn: deleteRoleApi, // 删除数据接口
    batchDeleteApiFn: batchDeleteRoleApi, // 批量删除数据接口
    scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
    formInitialValues: {
      name: null,
      code: null,
    },
    columns: [
      { title: t('page.systemRole.name'), dataIndex: 'name' },
      { title: t('page.systemRole.code'), dataIndex: 'code' },
      {
        title: t('common.actions'),
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
          <>
            <Permission permission={ROLE.UPDATE}>
              <EditButton type="text" size="small" noText onClick={() => handleEdit(record)} />
            </Permission>
            <Permission permission={ROLE.DELETE}>
              <DeleteButton
                type="text"
                size="small"
                noText
                loading={isDeleting}
                onConfirm={() => handleDelete(record.id)}
              />
            </Permission>
          </>
        ),
      },
    ],
  })

  // 搜索表单
  const searchForm = (
    <Form
      form={form}
      onFinish={handleSearch}
      autoComplete="off"
      colon={false}
    >
      <SearchContainer
        actions={(
          <>
            <Space>
              <SearchButton loading={isLoading} />
              <ResetButton onClick={handleReset} />
            </Space>
            <Divider type="vertical" />
            <Permission permission={ROLE.DELETE}>
              <BatchDeleteButton
                loading={isBatchDeleting}
                disabled={selectedIsEmpty}
                count={selectedCount}
                onConfirm={handleBatchDelete}
              />
            </Permission>
            <Divider type="vertical" />
            <Permission permission={ROLE.CREATE}>
              <CreateButton onClick={() => handleCreate()} />
            </Permission>
          </>
        )}
      >
        <SearchRow>
          <SearchCol name="name" label={t('page.systemRole.name')}>
            <Input />
          </SearchCol>
          <SearchCol name="code" label={t('page.systemRole.code')}>
            <Input />
          </SearchCol>
        </SearchRow>
      </SearchContainer>
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
