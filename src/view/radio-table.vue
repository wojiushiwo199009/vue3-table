<template>
  <my-basic-table
    ref="logTable"
    :Pagination="Pagination"
    @getCurrentRow="getCurrentRow"
    @pagingEvent="pagingChange"
    :tableObj
    :radio="handlerSelectList.uuid"
    @sortChange="sortChange"
    @filterChange="filterChange"
  ></my-basic-table>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, h } from 'vue'
import { ElButton } from 'element-plus'
import statusItem from './status-item.vue'
import editName from './edit-name.vue'
const handlerSelectList = ref({ uuid: '' })
const moduleOptions = ref([
  { value: 'module_login', text: '登录' },
  { value: 'module_job', text: '作业管理' },
])
const statusOptions = ref([
  { value: 'success', text: '成功' },
  { value: 'fail', text: '失败' },
])
const tableData = ref([
  {
    type: 'file',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    uuid: '0d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'folder',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '1d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'file',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '2d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'folder',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '3d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'file',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '4d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'file',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '5d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'folder',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '6d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
  {
    type: 'file',
    createtime: '2024-10-29 13:14:33',
    createpin: '',
    updatetime: null,
    updatepin: '',
    yn: 1,
    uuid: '7d995990-f629-4072-b237-93dc01115d97',
    userAccount: 'gjx',
    userName: 'gjx1',
    module: '登录',
    action: '登录',
    chinese: 2,
    else: 3,
    target: '',
    targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
    targetName: 'gjx',
    status: '成功',
    message: null,
    messageExtra: null,
    ip: '172.27.133.22',
    startTime: '2024-10-29 13:14:33',
    endTime: '2024-10-29 13:14:33',
  },
])
const Pagination = reactive({
  pagingData: [10, 50, 100, 200],
  pageSize: 10,
  total: 100,
  currentPage: 1,
  show: true,
})
const tableOptions = computed(() => {
  const tableOptions = [
    // 表格展开示例
    {
      prop: 'expand',
      label: '',
      render: (row: any) => {
        return h(
          'span',
          {
            class: 'mgl60',
          },
          row.action ? row.status + '（' + row.userAccount + '）' : '-',
        )
      },
    },
    {
      prop: 'name',
      label: '操作人',
      showOverflowToolTip: true,
      render: (row: any) => {
        return h(
          'span',
          row.userAccount ? row.userAccount + '（' + row.userName + '）' : '-',
        )
      },
    },
    {
      prop: 'math',
      label: '作业量',
      align: 'center',
      showOverflowToolTip: true,
    },
    {
      prop: 'module',
      label: '操作模块',
      showOverflowToolTip: true,
      width: 140,
      filter: true,
      filterKey: 'module',
      selectOptions: moduleOptions.value,
    },
    {
      prop: 'actionTxt',
      showOverflowToolTip: true,
      width: 140,
      label: '执行动作', // 自定义渲染表头示例
      headerRender: (row: any) => {
        return h(
          ElButton,
          {
            onClick: btnClick,
          },
          ['自定义表头'],
        )
      },
      render: (row: any) => {
        return h('span', row.action + row.target)
      },
    },
    {
      prop: 'operationName',
      width: 200,
      label: '操作对象',
      render: (row: any) => {
        return h(editName, {
          onClickName: (type: string, data: unknown) => {
            clickName(type, data)
          },
        } as any)
      },
    },
    {
      prop: 'status',
      label: '状态',
      filter: true,
      filterKey: 'status',
      selectOptions: statusOptions.value,
      render: (row: any) => {
        return h(statusItem, {
          row: row,
        })
      },
    },
    {
      prop: 'startTime',
      label: '操作时间',
      width: 160,
      sortProp: 'startTime',
    },
  ]
  return tableOptions
})
const tableObj = computed(() => {
  const table = {
    data: tableData.value,
    option: tableOptions.value,
    config: {
      hasRadio: true,
      rowKey: 'uuid', //每条数据的唯一值
      defaultSort: { prop: 'startTime', order: 'descending' },
    },
  }
  return table
})
const clickName = (type, row) => {
  console.log('点击名称', type, row)
}
const pagingChange = (type: string, val: number) => {
  console.log(type, val, '分页')
}
const filterChange = (obj: any) => {
  console.log(obj, '筛选条件')
}
const btnClick = () => {
  console.log('自定义表头按钮点击事件')
}
const getCurrentRow = (row: any) => {
  console.log(row)
}
const sortChange = (obj: any) => {
  console.log(obj, '排序条件')
}
</script>
<style lang="scss">
#app {
  height: 100vh;
}
.mgl60 {
  margin-left: 60px;
}
</style>
