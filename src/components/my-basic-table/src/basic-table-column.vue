<!-- @ts-ignore -->
<template v-if="columns">
  <el-table-column
    v-if="item.show == undefined ? true : item.show"
    :type="item.prop == 'expand' ? 'expand' : ''"
    :key="item.prop"
    :label="item.label"
    :width="item.width"
    :min-width="item.minWidth"
    :prop="item.prop"
    :fixed="item.fixed == undefined ? false : item.fixed"
    :align="item.align == undefined ? undefined : item.align"
    :column-key="item.filterKey || 'filter'"
    :sort-by="item.sortBy"
    :filters="item.selectOptions"
    :filter-multiple="item.filterMultiple == true ? true : false"
    filter-placement="bottom"
    :class-name="item.className"
    :show-overflow-tooltip="item.showOverflowToolTip"
    :sort-orders="['ascending', 'descending']"
    :sort-method="item.sortMethod"
    :sortable="item.sortMethod ? true : item.sortProp ? 'custom' : false"
     :resizable="resizable">
    <template #header>
      <span v-if="item.headerRender">
        <!-- 日志列表有示例，自定义表头 -->
        <ex-slot :render="item.headerRender" :column="item"></ex-slot
      ></span>
      <span v-else style="display: inline-block; position: relative">
        {{ item.label }}
        <el-tooltip
          :content="Object.keys(item).includes('tipContent') && item.tipContent"
          placement="top"
          v-if="item.tipContent && item.tipContent.length > 0">
          <i class="troila troila-icon-tishi"></i>
        </el-tooltip>
      </span>
    </template>

    <template #default="scope">
      <div v-if="item.statusTip" class="status-tip">
        <span>{{ scope.row[item.prop] }}</span>
        <el-tooltip
          :enterable="false"
          :content="scope.row[item.tooltipContent]"
          placement="right"
          v-if="item.statusTip && scope.row[item.tooltipContent]">
          <i class="troila troila-icon-tishi"></i>
        </el-tooltip>
      </div>
      <div
        v-else-if="item.multipleTip"
        class="multiple-tip default-tool"
        @mouseenter="handleCellMouseEnter">
        <el-tooltip
          placement="top-start"
          :disabled="
            !showTooltip && scope.row[item.multipleTipContent].length <= 1
          ">
          <template #content>
            <div v-for="i in scope.row[item.multipleTipContent]" :key="i">
              {{ i }}
              <br />
            </div>
          </template>

          <span>{{ scope.row[item.prop] }}</span>
        </el-tooltip>
      </div>
      <span v-else-if="item.render">
        <ex-slot
          :render="item.render"
          :row="scope.row"
          :index="scope.$index"
          :column="item"></ex-slot>
      </span>
      <span v-else-if="item.prop == 'expand'">
        <ex-slot
          :render="item.render"
          :row="scope.row"
          :index="scope.$index"
          :column="item"></ex-slot>
      </span>
      <template v-else-if="item.children?.length">
        <!-- 递归调用, .vue文件名 是非index的，可以直接使用文件名调用自己 -->
        <basicTableColumn
          v-for="(i, index) in item.children || []"
          :item="i"
          :key="index">
        </basicTableColumn>
      </template>

      <span
        v-else
        :type="item.type"
        :row="scope.row"
        :prop="item.prop"
        class="status"
        :fun="item.fun"
        @click="handleClick(item, scope.row)">
        <span v-if="scope.row[item.status]" :class="scope.row[item.status]"
          >●</span
        >
        <span
          :class="[
            { 'troila-link': item.fun },
            { 'text-crop': item.showOverflowToolTip },
            { 'text-deleted': scope.row[item.deleted] },
            scope.row[item.className]
          ]"
          v-else-if="
            scope.row[item.prop] ||
            (typeof scope.row[item.prop] == 'number' &&
              scope.row[item.prop] == 0)
          ">
          {{ scope.row[item.prop] }}
        </span>

        <span v-else>-</span>
      </span>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { ref, h, defineComponent } from 'vue'
let exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    columns: {
      type: Array,
      default: null
    }
  },
  render: (data: any) => {
    return h(data.render(data.row), { row: data.row })
  }
}

export default defineComponent({
  name: 'basicTableColumn',
  components: {
    'ex-slot': exSlot
  },
  props: { resizable: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const showTooltip = ref(false)
    const handleCellMouseEnter = (e: MouseEvent) => {
      let cellChild: HTMLElement | any = e.target
      const range = document.createRange()
      range.setStart(cellChild, 0)
      range.setEnd(cellChild, cellChild.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width - 1
      if (
        rangeWidth > cellChild.offsetWidth ||
        cellChild.childNodes[0].scrollWidth > cellChild.offsetWidth ||
        cellChild.scrollWidth > cellChild.offsetWidth
      ) {
        showTooltip.value = true
      } else {
        showTooltip.value = false
      }
    }
    const handleClick = (item: any , rowData: any) => {
      item.fun && item.fun(rowData)
    }
    return {
      showTooltip,
      handleCellMouseEnter,
      handleClick
    }
  }
})
</script>

