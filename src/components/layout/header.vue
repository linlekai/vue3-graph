<template>
  <ElMenu
    :default-active="activeIndex"
    class="header"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <!-- <ElMenuItem index="0">sss</ElMenuItem> -->
    <div class="logo">
      <img class="logo-img" :src="Logo" alt="" />
      <span class="logo-info">Vue Graph</span>
    </div>
    <div class="flex-grow" />
    <ElMenuItem index="1">User Name</ElMenuItem>
  </ElMenu>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus'
import Logo from '@/assets/vue.svg'
import { ref } from 'vue'

const activeIndex = ref('0')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="less">
.header {
  height: 60px;
}
.flex-grow {
  flex-grow: 1;
}
.logo {
  padding: 0 20px;
  display: flex;
  align-self: center;
  align-items: center;
  .logo-img {
    width: 40px;
    height: 40px;
  }
  .logo-info {
    margin-left: 5px;
    color: var(--el-menu-text-color);
  }
}
</style>
