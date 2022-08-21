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
        <ElButton type="primary" size="small">Default</ElButton>
        <ElButton type="primary" size="small">Default</ElButton>
        <ElButton type="primary" size="small">Default</ElButton>
        <ElButton type="primary" size="small">Default</ElButton>
        <ElButton type="primary" size="small">Default</ElButton>
        <ElButton type="primary" size="small">Default</ElButton>
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
  ElButton
} from 'element-plus'
import type { IPageGraph } from '../index.vue'

type IDetail = Record<string, any>

interface IProps {
  title: string
  showDrawer: boolean
  detailList: Array<IDetail>
}
// const props = defineProps({
//   showDrawer: Boolean,
//   title: String,
//   detailList: Array
// })
const props = defineProps<IProps>()
const $emit = defineEmits(['update:showDrawer'])
const pageGraph: IPageGraph = inject('pageGraph', { instance: null })

function closeEvent() {
  $emit('update:showDrawer', false)
}
</script>

<style scoped lang="less">
.button-group {
  margin: 20px 0;
}
</style>
