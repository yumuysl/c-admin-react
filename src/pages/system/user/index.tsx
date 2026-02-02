import { Divider, Form, Input, Space, Table, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { batchDeleteUserApi, deleteUserApi, getUserListApi } from '@/apis/user'
import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableContainer } from '@/components/container'
import { Permission } from '@/components/permission'
import { USER } from '@/constants/permissions'
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
    key: 'user', // 表格唯一标识，不要与其他模块重名
    cacheEnabled: true, // 是否启用缓存
    dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
    pagination: true, // 是否开启分页
    selectable: true, // 是否开启选择
    listApiFn: getUserListApi, // 获取列表数据接口
    deleteApiFn: deleteUserApi, // 删除数据接口
    batchDeleteApiFn: batchDeleteUserApi, // 批量删除数据接口
    scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
    formInitialValues: {
      username: null,
      nickName: null,
      email: null,
      phone: null,
    },
    columns: [
      { title: t('page.systemUser.username'), dataIndex: 'username' },
      { title: t('page.systemUser.nickName'), dataIndex: 'nickName' },
      { title: t('page.systemUser.email'), dataIndex: 'email' },
      { title: t('page.systemUser.phone'), dataIndex: 'phone' },
      {
        title: t('page.systemUser.isFrozen'),
        dataIndex: 'isFrozen',
        render: (_, record) => record.isFrozen ? <Tag color="red">{t('page.systemUser.frozen')}</Tag> : <Tag color="green">{t('page.systemUser.unfrozen')}</Tag>,
      },
      {
        title: t('common.actions'),
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
          <>
            <Permission permission={USER.UPDATE}>
              <EditButton type="text" size="small" noText onClick={() => handleEdit(record)} />
            </Permission>
            <Permission permission={USER.DELETE}>
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
            <Permission permission={USER.DELETE}>
              <BatchDeleteButton
                loading={isBatchDeleting}
                disabled={selectedIsEmpty}
                count={selectedCount}
                onConfirm={handleBatchDelete}
              />
            </Permission>
            <Divider type="vertical" />
            <Permission permission={USER.CREATE}>
              <CreateButton onClick={() => handleCreate()} />
            </Permission>
          </>
        )}
      >
        <SearchRow>
          <SearchCol name="username" label={t('page.systemUser.username')}>
            <Input />
          </SearchCol>
          <SearchCol name="nickName" label={t('page.systemUser.nickName')}>
            <Input />
          </SearchCol>
          <SearchCol name="email" label={t('page.systemUser.email')}>
            <Input />
          </SearchCol>
          <SearchCol name="phone" label={t('page.systemUser.phone')}>
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
