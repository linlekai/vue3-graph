<template>
  <ElTooltip :offset="offset" :hide-after="0" effect="dark" :content="content" placement="top">
    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from 'element-plus'
import { defineProps } from 'vue'

const props = defineProps({
  content: String,
  offset: {
    default: 20
  }
})
</script>

<style scoped lang="less"></style>
