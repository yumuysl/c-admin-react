import { Divider, Form, Input, Modal, Space, Table } from 'antd'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import type { BasePageParams } from '@/types/base'

import {
  BatchDeleteButton,
  CreateButton,
  DeleteButton,
  EditButton,
  ResetButton,
  SearchButton,
} from '@/components/button'
import {
  SearchCol,
  SearchContainer,
  SearchRow,
  SearchTableContainer,
} from '@/components/container'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

import { userList } from '../mockData'

export default function DataTableExample() {
  const { t } = useTranslation()
  const formRef = useRef(null)

  // Mock API函数
  function getListApi({ page, pageSize }: BasePageParams) {
    return Promise.resolve({
      list: userList.slice((page - 1) * pageSize, page * pageSize),
      total: userList.length,
    })
  }

  // 获取容器配置
  const {
    listContainerProps,
    tableScrollY,
  } = useSearchTableContainer()

  // 使用表格Hook
  const {
    form,
    tableProps,
    isLoading,
    selectedIsEmpty,
    selectedCount,
    handleReset,
  } = useTable({
    key: 'data-table-example',
    pagination: true,
    listApiFn: getListApi,
    scrollY: tableScrollY,
    selectable: true,
    formInitialValues: {
      param1: null,
      param2: null,
      param3: null,
      param4: null,
      param5: null,
      param6: null,
    },
    columns: [
      { title: t('page.dataTableExample.name'), dataIndex: 'name' },
      { title: t('page.dataTableExample.age'), dataIndex: 'age' },
      { title: 'Column 1', dataIndex: 'address' },
      { title: 'Column 2', dataIndex: 'address' },
      { title: 'Column 3', dataIndex: 'address' },
      {
        title: t('page.dataTableExample.action'),
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: () => (
          <>
            <EditButton type="text" size="small" noText onClick={handleNotice} />
            <DeleteButton type="text" size="small" noText onConfirm={handleNotice} />
          </>
        ),
      },
    ],
  })

  // 通知弹窗
  function handleNotice() {
    Modal.info({
      title: t('page.dataTableExample.noticeTitle'),
      content: t('page.dataTableExample.noticeContent'),
    })
  }

  // 搜索表单
  const searchForm = (
    <Form
      ref={formRef}
      form={form}
      colon={false}
      autoComplete="off"
      onFinish={handleNotice}
    >
      <SearchContainer
        actions={(
          <>
            <Space>
              <SearchButton loading={isLoading} />
              <ResetButton onClick={handleReset} />
            </Space>
            <Divider type="vertical" />
            <BatchDeleteButton
              disabled={selectedIsEmpty}
              count={selectedCount}
              onConfirm={handleNotice}
            />
            <Divider type="vertical" />
            <CreateButton onClick={handleNotice} />
          </>
        )}
        extra={(
          <SearchRow>
            <SearchCol name="param5" label={t('page.dataTableExample.param', { count: 5 })}>
              <Input />
            </SearchCol>
            <SearchCol name="param6" label={t('page.dataTableExample.param', { count: 6 })}>
              <Input />
            </SearchCol>
          </SearchRow>
        )}
      >
        <SearchRow>
          <SearchCol name="param1" label={t('page.dataTableExample.param', { count: 1 })}>
            <Input />
          </SearchCol>
          <SearchCol name="param2" label={t('page.dataTableExample.param', { count: 2 })}>
            <Input />
          </SearchCol>
          <SearchCol name="param3" label={t('page.dataTableExample.param', { count: 3 })}>
            <Input />
          </SearchCol>
          <SearchCol name="param4" label={t('page.dataTableExample.param', { count: 4 })}>
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
