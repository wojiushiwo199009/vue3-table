<template>
  <div class="log">
    <div class="resource-table">
      <basic-table
        ref="logTable"
        :Pagination="pagination"
        @pagingEvent="pagingChange"
        :tableObj
        @sortChange="sortChange"
        @filterChange="filterChange"></basic-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted, h } from 'vue'
import { ElButton } from 'element-plus'
import statusItem from './status-item.vue'
import editName from './edit-name.vue'

const moduleOptions = ref([  { value: 'module_login', text: '登录' },
    { value: 'module_job', text: '作业管理' }]) 
const statusOptions = ref([  { value: 'success', text: '成功' },
    { value: 'fail', text: '失败' }]) 

const pagination = reactive({
  pagingData: [10, 50, 100, 200],
  pageSize: 10,
  total: 100,
  currentPage: 1,
  show: true
})

const pagingChange = (type: string, val: number) => {
  if (type == 'num') {
    pagination.pageSize = val
    filter.size = val
    pagination.currentPage = 1
    filter.page = 1
  } else if (type == 'page') {
    pagination.currentPage = val
    filter.page = val
  }
  getLogPage()
}
const tableData = ref([])

const filterChange = (obj: { [s: string]: unknown } | ArrayLike<unknown>) => {
  console.log(obj,'筛选条件')
  filter.page = 1
  pagination.currentPage = 1
  getLogPage()
}
const btnClick = () => {
  console.log('自定义表头按钮点击事件')
}
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
            class: 'mgl50'
          },
          row.action ? row.status + '（' + row.userAccount + '）' : '-'
        )
      }
    },
    {
      prop: 'name',
      label: '操作人',
      showOverflowToolTip: true,
      render: (row: any) => {
        return h(
          'span',
          row.userAccount ? row.userAccount + '（' + row.userName + '）' : '-'
        )
      }
    },
    {
      prop: 'module',
      label: '操作模块',
      showOverflowToolTip: true,
      filter: true,
      filterKey: 'module',
      selectOptions: moduleOptions.value
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
            onClick: btnClick
          },
          ['自定义表头']
        )
      },
      render: (row: any) => {
        return h('span', row.action + row.target)
      }
    },
    {
      prop: 'operationName',
      showOverflowToolTip: true,
      label: '操作对象',
      render: (row: any) => {
        return h(editName)
      }
    },
    {
      prop: 'status',
      label: '状态',
      filter: true,
      filterKey: 'status',
      selectOptions: statusOptions.value,
      render: (row: any) => {
        return h(statusItem, {
          row: row
        })
      }
    },
    {
      prop: 'startTime',
      label: '操作时间',
      width: 160,
      sortProp: 'startTime'
    }
  ]
  return tableOptions
})
const tableObj = computed(() => {
  const table = {
    data: tableData.value,
    option: tableOptions.value,
    config: {
      defaultSort: { prop: 'startTime', order: 'descending' }
    }
  }
  return table
})
const sortChange = (sort: { asc: string | null; sort: any }) => {
  if (sort.asc == null) {
    filter.sort = ''
  } else {
    filter.sort = `${sort.sort},${sort.asc.toLowerCase()}`
  }
  getLogPage()
}
const getLogPage = () => {
  tableData.value = [
    {
      type: 'file',
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
      target: '',
      targetUuid: '6c219b34-db38-48d4-8dd0-a6e84454eacd',
      targetName: 'gjx',
      status: '成功',
      message: null,
      messageExtra: null,
      ip: '172.27.133.22',
      startTime: '2024-10-29 13:14:33',
      endTime: '2024-10-29 13:14:33'
    },
  ]
}

onMounted(() => {
  getLogPage()
})
</script>
<style>
.mgl50 {
  margin-left: 60px;
}
</style>
<style lang="scss" scoped>
.log {
  padding: 1.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.search-input-container {
  width: calc(100% - 36px - 0.75rem);
}
.action-btn {
  display: flex;
  .lazy-search-wrapper {
    flex: 1;
  }
}
.resource-table {
  flex: 1;
  height: 100%;
}
</style>
