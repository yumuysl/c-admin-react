import {
  SearchButton,
  ResetButton,
  BatchDeleteButton,
  CreateButton,
  DeleteButton,
  EditButton,
} from '@/components/button'
import { SearchContainer, SearchRow, SearchCol } from '@/components/container'
import { Permission } from '@/components/permission'
import { FILE } from '@/constants/permissions'
import { useTable } from '@/hooks/useTable'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { Tag, Form, Space, Divider, Table, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { SearchTableContainer } from '@/components/container'
import { getFileListApi, deleteFileApi, batchDeleteFileApi } from '@/apis/file'

export default function FileUpload() {
  const { t } = useTranslation()
  const { listContainerProps, tableScrollY } = useSearchTableContainer()

  //TODO:文件上传 - 后端数据库创建
  //TODO:文件上传 - 后端Restful接口设计
  //TODO:文件上传 - 前后端字段协调和功能测试

  const handleDownLoad = (filepath: string) => {
    console.log('打印下载的文件名：', filepath)
  }

  const {
    form,
    tableProps,
    isLoading,
    isDeleting,
    isBatchDeleting,
    handleSearch,
    handleReset,
    handleCreate,
    handleDelete,
    handleBatchDelete,
    selectedCount,
    selectedIsEmpty,
  } = useTable({
    key: 'caseFile', // 表格唯一标识，不要与其他模块重名
    cacheEnabled: true, // 是否启用缓存
    dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
    pagination: true, // 是否开启分页
    selectable: true, // 是否开启选择
    listApiFn: getFileListApi, // 获取列表数据接口
    deleteApiFn: deleteFileApi, // 删除数据接口
    batchDeleteApiFn: batchDeleteFileApi, // 批量删除数据接口
    scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
    formInitialValues: {
      username: null,
      nickName: null,
      email: null,
      phone: null,
    },
    columns: [
      { title: t('page.caseFile.fileName'), dataIndex: 'fileName' },
      { title: t('page.caseFile.filePath'), dataIndex: 'filePath' },
      { title: t('page.caseFile.actor'), dataIndex: 'actor' },
      { title: t('page.caseFile.createTime'), dataIndex: 'createTime' },
      {
        title: t('page.caseFile.isFrozen'),
        dataIndex: 'isFrozen',
        render: (_, record) =>
          record.isFrozen ? (
            <Tag color="red">{t('page.caseFile.frozen')}</Tag>
          ) : (
            <Tag color="green">{t('page.caseFile.unfrozen')}</Tag>
          ),
      },
      {
        title: t('common.actions'),
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
          <>
            <Permission permission={FILE.UPDATE}>
              <EditButton
                type="text"
                size="small"
                noText
                onClick={() => handleDownLoad(record)}
              />
            </Permission>
            <Permission permission={FILE.DELETE}>
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

  /** 搜索表单 */
  const searchForm = (
    <Form form={form} onFinish={handleSearch} autoComplete="off" colon={false}>
      <SearchContainer
        actions={
          <>
            <Space>
              <SearchButton loading={isLoading} />
              <ResetButton onClick={handleReset} />
            </Space>
            <Divider type="vertical" />
            <Permission permission={FILE.DELETE}>
              <BatchDeleteButton
                loading={isBatchDeleting}
                disabled={selectedIsEmpty}
                count={selectedCount}
                onConfirm={handleBatchDelete}
              />
            </Permission>
            <Divider type="vertical" />
            <Permission permission={FILE.CREATE}>
              <CreateButton onClick={() => handleCreate()} />
            </Permission>
          </>
        }
      >
        <SearchRow>
          <SearchCol name="fileName" label={t('page.caseFile.fileName')}>
            <Input />
          </SearchCol>
          <SearchCol name="actor" label={t('page.caseFile.actor')}>
            <Input />
          </SearchCol>
          <SearchCol name="createTime" label={t('page.caseFile.createTime')}>
            <Input />
          </SearchCol>
        </SearchRow>
      </SearchContainer>
    </Form>
  )

  return (
    <SearchTableContainer {...listContainerProps} searchForm={searchForm}>
      <Table {...tableProps} />
    </SearchTableContainer>
  )
}
