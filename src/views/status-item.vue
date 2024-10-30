<template>
  <div class="">
    <span class="status">
      <span
        class="status-circle"
        :class="
          row.status == '成功'
            ? 'success'
            : row.status == '失败'
              ? 'fail'
              : 'color-create-update-delete'
        ">
        <!-- ● -->
      </span>
      <span
        class="fs14"
        :class="
          row.status == '成功'
            ? 'success'
            : row.status == '失败'
              ? 'fail'
              : 'color-create-update-delete'
        ">
        {{
          row.status == '成功'
            ? '成功'
            : row.status == '失败'
              ? '失败'
              : '操作中'
        }}
      </span>
      <el-popover
        v-if="row.status == '失败'"
        placement="top"
        popper-class="ope-status-pop"
        title="【失败原因】"
        width="200"
        trigger="hover">
        <template #reference>
          <img class="icon-img" src="../assets/images/warning.png" alt="" />
        </template>
        <template #default>
          <div class="ope-status-pop-content">
            {{ row.message }}
          </div>
        </template>
      </el-popover>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps({ row: Object as any })
</script>

<style lang="scss" scoped>
.status {
  // 成功
  .success {
    color: #333;
    font-size: 1rem;
    &::before {
      background: #50b89c;
    }
  }
  // 其他
  .color-create-update-delete {
    font-size: 1rem;
    color: #333;
    &::before {
      background: #206bfa;
    }
  }
  // 失败
  .fail {
    color: #333;
    font-size: 1rem;
    &::before {
      background: #ec7c7c;
    }
  }
  .status-circle {
    &::before {
      content: '';
      display: inline-block;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      position: relative;
      top: -0.125rem;
      margin-right: 0.25rem;
      white-space: nowrap;
    }
  }
  .fs14 {
    font-size: 0.875rem !important;
  }
  .icon-img {
    width: 0.875rem;
    height: 0.875rem;
    position: relative;
    top: 0.125rem;
    margin-left: 0.125rem;
  }
}
</style>

<style lang="scss">
.ope-status-pop {
  font-weight: 400;
  font-size: 0.875rem;
  color: #333;
  letter-spacing: 0;
  text-align: justify;
  line-height: 1.375rem;
  .ope-status-pop-content {
    max-height: 300px;
    overflow-y: auto;
  }
  .el-popover__title {
    font-weight: 600;
    font-size: 1rem;
    color: #333;
  }
}
.ope-status-pop .el-popper__arrow {
}
</style>
