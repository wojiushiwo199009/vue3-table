<template>
  <div class="table-name-wrapper">
    <el-icon>
      <FolderOpened v-if="row.type == 'folder'" />
      <Shop v-else />
    </el-icon>
    <div class="edit-show-box">
      <template v-if="isEdit">
        <el-input
          v-model="inputShowName"
          placeholder="请输入"
          size="small"
          maxlength="255"
        />
        <!-- 扩展名 -->
        <span v-if="row.type == 'file'">{{ extendName }}</span>
        <!-- 按钮 -->
        <el-icon @click="confirm"><Check /></el-icon>
        <el-icon><Close @click="cancel" /></el-icon>
      </template>
      <span v-else class="show-name-box">
        <!-- v-hide为自定义指令，在directives文件夹里面 -->
        <span v-hide @click="goPath">{{ showName }}{{ extendName }}</span>
        <el-icon @click="edit"><EditPen /></el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  row: {
    userName: string
    type: 'file' | 'folder'
  }
}>()
const $emit = defineEmits(['clickName'])
const isEdit = ref(false)
const inputShowName = ref('') // input内绑定名称
const showName = ref('') // 表格内显示名称
const extendName = ref('') // 扩展名
function goPath() {
  $emit('clickName', props.row.type, props.row)
}
function edit() {
  isEdit.value = true
  inputShowName.value = showName.value
}
function confirm() {
  isEdit.value = false
  showName.value = inputShowName.value
  ElMessage({
    message: '编辑成功',
    type: 'success',
  })
}
function cancel() {
  isEdit.value = false
}
function init() {
  showName.value = props.row.userName
}
init()
</script>

<style scoped lang="scss">
.table-name-wrapper {
  display: flex;
  align-items: center;
  .icon-wenjianjia1 {
    color: #ffca28;
  }
  .icon-yingyong {
    color: #1496db;
  }
  .edit-show-box {
    margin-left: 8px;
    display: flex;
    align-items: center;
    flex: 1;
    width: calc(100% - 8px - 1rem);
    .el-icon {
      font-size: 16px;
      cursor: pointer;
      margin-left: 8px;
    }
    .show-name-box {
      display: flex;
      align-items: center;
      width: 100%;
      > span {
        color: #206bfa;
        cursor: pointer;
      }
      .el-icon {
        color: #206bfa;
      }
    }
  }
}
</style>
