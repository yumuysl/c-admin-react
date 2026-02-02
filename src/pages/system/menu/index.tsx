import { Divider, Form, Table, Tag } from 'antd'
import { useTranslation } from 'react-i18next'

import { deleteMenuApi, getMenuTreeApi } from '@/apis/menu'
import { Button, CreateButton, DeleteButton, EditButton, RefreshButton } from '@/components/button'
import { SearchContainer, SearchTableContainer } from '@/components/container'
import { Icon } from '@/components/icon'
import { Permission } from '@/components/permission'
import { MENU_TYPE } from '@/constants/menu'
import { MENU } from '@/constants/permissions'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

export default function MenuList() {
  const { t } = useTranslation()

  const {
    listContainerProps,
    tableScrollY,
  } = useSearchTableContainer()

  const {
    tableProps,
    isLoading,
    isDeleting,
    handleReset,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useTable({
    key: 'menu', // 表格唯一标识，不要与其他模块重名
    cacheEnabled: true, // 是否启用缓存
    dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
    pagination: false, // 是否开启分页
    listApiFn: getMenuTreeApi, // 获取列表数据接口
    deleteApiFn: deleteMenuApi, // 删除数据接口
    scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
    columns: [
      { title: t('page.systemMenu.title'), dataIndex: 'title' },
      {
        title: t('page.systemMenu.type'),
        dataIndex: 'type',
        render: (type: MENU_TYPE) => {
          if (type === MENU_TYPE.DIRECTORY) {
            return <Tag>{t('page.systemMenu.directory')}</Tag>
          }
          else if (type === MENU_TYPE.MENU) {
            return <Tag color="blue">{t('page.systemMenu.menu')}</Tag>
          }
          else {
            return <Tag color="cyan">{t('page.systemMenu.feature')}</Tag>
          }
        },
      },
      {
        title: t('page.systemMenu.icon'),
        dataIndex: 'icon',
        render: (icon: string) => icon ? <Icon icon={icon} /> : null,
      },
      { title: t('page.systemMenu.path'), dataIndex: 'path' },
      { title: t('page.systemMenu.code'), dataIndex: 'code' },
      { title: t('page.systemMenu.sort'), dataIndex: 'sort' },
      {
        title: t('page.systemMenu.isShow'),
        dataIndex: 'isShow',
        render: (isShow: boolean) => (
          isShow
            ? <Tag color="success">{t('page.systemMenu.show')}</Tag>
            : <Tag color="error">{t('page.systemMenu.hidden')}</Tag>
        ),
      },
      {
        title: t('common.actions'),
        key: 'actions',
        fixed: 'right',
        width: 150,
        render: (_, record) => (
          <>
            <Permission permission={MENU.CREATE}>
              {record.type !== MENU_TYPE.FEATURE && (
                <Button
                  icon="icon-park-outline:tree-diagram"
                  type="text"
                  size="small"
                  onClick={() => handleCreate(record)}
                />
              )}
            </Permission>
            <Permission permission={MENU.UPDATE}>
              <EditButton
                type="text"
                size="small"
                noText
                onClick={() => handleEdit(record, record)}
              />
            </Permission>
            <Permission permission={MENU.DELETE}>
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
            <Permission permission={MENU.CREATE}>
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
