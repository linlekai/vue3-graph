<template>
  <ElDrawer
    v-model="showDrawer"
    direction="ltr"
    @close="closeEvent"
    :title="title"
    :with-header="true"
  >
    <ElDescriptions :column="1" size="large" border>
      <ElDescriptionsItem label="tag">
        <ElTag>普通节点</ElTag>
      </ElDescriptionsItem>

      <template v-for="(item, index) in detailList">
        <ElDescriptionsItem :label="item.label">{{ item.value }}</ElDescriptionsItem>
      </template>
    </ElDescriptions>
    <div class="button-group">
      <ElButtonGroup>
        <ElButton type="primary" size="default" @click="handler.copyToClipboard">
          <ElIcon>
            <CopyDocument />
          </ElIcon>
          <span>复制 id</span>
        </ElButton>
        <ElButton type="danger" size="default" @click="handler.removeNode">
          <ElIcon>
            <Delete />
          </ElIcon>
          <span>删除</span>
        </ElButton>
      </ElButtonGroup>
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, reactive, onMounted, watchEffect, inject } from 'vue'
import {
  ElDrawer,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElButtonGroup,
  ElButton,
  ElIcon,
  ElMessage
} from 'element-plus'
import { CopyDocument, Delete } from '@element-plus/icons-vue'
import type { IPageGraph } from '../index.vue'
import copy from 'copy-to-clipboard'
import type { IDetail } from '../index.vue'
import Service from '../graphService'

interface IProps {
  title: string
  showDrawer: boolean
  detailList: Array<IDetail>
  id: string
}
// const props = defineProps({
//   showDrawer: Boolean,
//   title: String,
//   detailList: Array
// })
const props = defineProps<IProps>()
const $emit = defineEmits(['update:showDrawer'])
const eventSetup = Service.setup()

const handler = {
  removeNode: () => {
    $emit('update:showDrawer', false)
    eventSetup.removeItem(props.id)
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
  },
  /**
   * 复制内容到剪贴板
   */
  copyToClipboard() {
    copy(props.id)
    ElMessage({
      message: '已复制',
      type: 'success'
    })
  }
}
function closeEvent() {
  $emit('update:showDrawer', false)
}
</script>

<style scoped lang="less">
.button-group {
  margin: 20px 0;
}
</style>
