<!--prop='render' 展开列的封装，在日志页面有示例，如果展开数据展示的还是表格，可以不用配置这项，直接在返回数据中 要展开的子数据字段为children就能自动展开  -->

<template>
  <div class="basic-table-con">
    <!-- table表格数据 -->
    <el-table
      :border="table.config.resizable"
      :row-key="table.config.rowKey"
      ref="basicTable"
      class="basic-table"
      :max-height="maxHeight"
      :data="table.data"
      :class="{ 'max-height32': table.data.length == 1 }"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      @filter-change="filterChange"
      @sort-change="sortChange"
      tooltip-effect="dark"
      :height="table.config.height"
      :span-method="table.config.spanMethod"
      :row-class-name="tableRowClassName"
      :show-header="table.config.showHeader"
      @select-all="handlerSelectAll"
      @select="handlerSelect"
      :default-expand-all="table.config.defaultExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :default-sort="table.config.defaultSort"
    >
      <template #empty>
        <div>
          <span v-if="!$slots.empty">暂无数据</span>
          <slot v-if="$slots.empty" name="empty"></slot>
        </div>
      </template>
      <el-table-column
        :resizable="table.config.resizable"
        v-if="table.config.hasSelection"
        :reserve-selection="table.config.reserveSelection"
        type="selection"
        :selectable="selectable"
        width="56"
        key="hasSelection"
      ></el-table-column>
      <el-table-column v-if="table.config.hasRadio" width="30" key="hasRadio">
        <template #default="scope">
          <el-radio
            class="table-item-radio"
            :label="scope.row[table.config.rowKey]"
            :disabled="scope.row.selectable"
            v-model="radioValue"
            @change="getCurrentRow(scope.row)"
          ></el-radio>
        </template>
      </el-table-column>
      <basicTableColumn
        v-for="(item, index) in tableObj.option || []"
        :item="item"
        :resizable="table.config.resizable"
        :key="index"
      ></basicTableColumn>

      <el-table-column
        v-if="table.operation.show"
        :fixed="
          table.operation.fixed == undefined ? false : table.operation.fixed
        "
        :label="table.operation.label"
        :width="table.operation.width"
        :min-width="table.operation.minWidth"
        :resizable="table.config.resizable"
      >
        <template #default="scope">
          <el-button
            v-for="(i, idx) in scope.row.operation"
            :key="idx"
            link
            :disabled="i.disabled"
            :class="i.btnClassName ? i.btnClassName : ''"
            size="small"
            @click="i.fun(i, scope.row)"
          >
            <el-tooltip
              :content="i.tooltipContent"
              placement="top-start"
              :disabled="i.tooltipState == 1 ? false : true"
            >
              <i v-if="table.operation.showIcon" :class="i.className"></i>
              <span v-else :class="i.className">{{ i.value }}</span>
            </el-tooltip>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-con" v-if="Pagination && Pagination.show">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Pagination.currentPage"
        :page-sizes="Pagination.pagingData"
        :total="Pagination.total"
        v-model:page-size="pageSize"
        :layout="
          Pagination.total > 10
            ? 'slot,->, sizes, prev, pager, next, jumper'
            : 'slot'
        "
      >
        <span class="el-pagination-total-num">
          共{{ Pagination.total }}条数据
        </span></el-pagination
      >
    </div>
  </div>
</template>

<script lang="ts">
import BasicTableColumn from './basic-table-column.vue'
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
export default defineComponent({
  name: 'basicTable',
  components: {
    BasicTableColumn,
  },
  props: {
    currentMenu: {
      type: String,
      default: '',
    },
    tableObj: {
      type: Object,
      default: () => null,
    },
    Pagination: {
      type: Object,
      default: () => {
        return {
          pageSize: 9999,
          currentPage: 1,
        }
      },
      required: false,
    },
    tableType: [String],
    radio: {
      //单选框初始默认值
      type: String,
      default: '',
    },
    fun: {
      type: Function,
      required: false,
    },
  },
  setup(props, context) {
    const radioValue = ref('')
    const showTooltip = ref(false)
    const basicTable = ref()
    const maxHeight = ref('200px')
    watch(
      () => props.radio,
      val => {
        if (val) {
          radioValue.value = val
        } else {
          radioValue.value = ''
        }
      },
      { deep: true },
    )
    const getCurrentRow = (row: any) => {
      context.emit('getCurrentRow', row)
    }
    const pageSize = computed(() => {
      const pageSize = props.Pagination.pageSize
        ? props.Pagination.pageSize
        : (props.Pagination &&
            props.Pagination.pagingData &&
            props.Pagination.pagingData[0]) ||
          10
      return pageSize
    })
    const table = computed(() => {
      const tableObj = props.tableObj
      const config = tableObj.config || {}
      const operation = tableObj.operation || {}

      const table = {
        data: tableObj.data,
        option: tableObj.option,
        config: {
          height: config.height || null,
          showHeader: config.showHeader != false,
          columnType: config.columnType || props.tableType, // selection expand radio
          spanMethod: config.spanMethod || null,
          defaultSort: config.defaultSort || {},
          hasRadio: config.hasRadio, //是否显示单选框
          defaultExpandAll: config.defaultExpandAll || false, //树形结构是否默认展开所有行
          rowKey: config.rowKey || null, //为表格数据的唯一值，例如id、uuid
          reserveSelection: config.reserveSelection, // 仅对 type=selection 的列有效
          hasSelection: config.hasSelection, // 是否再多显示一个多选框
          resizable: config.resizable || false, //列是否可拖拽
        },
        operation: {
          label: operation.label || '操作',
          width: operation.width || '120',
          fixed: operation.fixed || false,
          show: operation.show || false,
          minWidth: operation.minWidth || '',
          showIcon: operation.showIcon || false,
        },
      }
      return table
    })

    const rowClick = (row: {}) => {
      context.emit('rowClick', row)
    }
    const goLink = () => {
      context.emit('goLink')
    }
    const handlerSelectAll = (selection: any[]) => {
      context.emit('handlerSelect', selection)

      if (selection.length < 1) {
        basicTable.value!.clearSelection()
      }
    }
    const handlerSelect = (selection: any) => {
      context.emit('handlerSelect', selection)
    }
    const selectable = (row: { selectable?: any }) => {
      if (Object.keys(row).includes('selectable') && !row.selectable) {
        return false
      } else {
        return true
      }
    }
    const tableRowClassName = (row: { row: { expired: any } }) => {
      if (row.row.expired) {
        return 'warning-row'
      }
      return ''
    }
    const handleSelectionChange = (val: any) => {
      context.emit('handleSelectionChange', val)
    }
    const filterChange = (value: any) => {
      context.emit('filterChange', value)
    }
    const handleSizeChange = (val: any) => {
      context.emit('pagingEvent', 'num', val)
    }
    const handleCurrentChange = (val: any) => {
      context.emit('pagingEvent', 'page', val)
    }
    const sortChange = (col: any) => {
      if (col.column && col.column.sortable == 'custom') {
        const sort = {
          sort: col.prop,
          asc:
            col.order == 'ascending'
              ? 'ASC'
              : col.order == 'descending'
                ? 'DESC'
                : null,
        }
        context.emit('sortChange', sort)
      }
    }

    onMounted(() => {
      const pageHeight =
        document.getElementsByClassName('page-con').length > 0
          ? document.getElementsByClassName('page-con')[0].clientHeight
          : 0
      const tableConHeight =
        document.getElementsByClassName('basic-table-con')[0].clientHeight

      maxHeight.value = tableConHeight - pageHeight - 16 + 'px'
    })

    return {
      maxHeight,
      table,
      basicTable,
      pageSize,
      showTooltip,
      rowClick,
      goLink,
      handlerSelectAll,
      handlerSelect,
      selectable,
      tableRowClassName,
      handleSelectionChange,
      filterChange,
      handleSizeChange,
      handleCurrentChange,
      sortChange,
      getCurrentRow,
      radioValue,
    }
  },
})
</script>

<style lang="css" scoped>
.basic-table-con {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  background: #fff;
  justify-content: space-between;
  padding-bottom: 1.25rem;
}
.page-con {
  width: 100%;
  background: #fff;
  text-align: right;
  padding-top: 1rem;
}
</style>
