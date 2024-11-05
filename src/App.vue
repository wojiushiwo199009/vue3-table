<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="多选表格" name="first">
      <checkbox-table></checkbox-table>
    </el-tab-pane>
    <el-tab-pane label="单选表格" name="second">
      <radio-table></radio-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import checkboxTable from './view/checkbox-table.vue'
import radioTable from './view/radio-table.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.demo-tabs > .el-tabs__content > .el-tab-pane {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 800px;
}
</style>
