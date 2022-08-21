<template>
  <div class="tool-bar">
    <div class="tool-item">
      <TopTip content="新增节点">
        <ElIcon :size="30" @click="handler.addItem">
          <Plus />
        </ElIcon>
      </TopTip>
    </div>
    <div class="tool-item">
      <TopTip content="新增combo">
        <ElIcon :size="30" @click="handler.addCombo">
          <CirclePlus />
        </ElIcon>
      </TopTip>
    </div>

    <div class="tool-item">
      <TopTip content="居中视图">
        <ElIcon :size="30" @click="handler.fitCenter">
          <FullScreen />
        </ElIcon>
      </TopTip>
    </div>
    <div class="tool-item">
      <TopTip content="放大">
        <ElIcon :size="30" @click="handler.zoom(1.2)">
          <ZoomIn />
        </ElIcon>
      </TopTip>
    </div>
    <div class="tool-item">
      <TopTip content="缩小">
        <ElIcon :size="30" @click="handler.zoom(0.8)">
          <ZoomOut />
        </ElIcon>
      </TopTip>
    </div>
    <div class="tool-item">
      <TopTip content="撤销">
        <ElIcon :size="30" :class="{ disabled: undoDisable }" @click="handler.undo">
          <RefreshLeft />
        </ElIcon>
      </TopTip>
    </div>
    <div class="tool-item">
      <TopTip content="恢复">
        <ElIcon :size="30" :class="{ disabled: redoDisable }" @click="handler.redo">
          <RefreshRight />
        </ElIcon>
      </TopTip>
    </div>
    <div class="tool-item">
      <TopTip content="下载画布">
        <ElIcon :size="30" @click="handler.downloadImage">
          <Download />
        </ElIcon>
      </TopTip>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Edit,
  Plus,
  FullScreen,
  Delete,
  View,
  ZoomIn,
  ZoomOut,
  Download,
  RefreshLeft,
  RefreshRight,
  CirclePlus
} from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import TopTip from './topTip.vue'
import Service from '../graphService'
import { onMounted, reactive } from 'vue'
import { IG6GraphEvent } from '@antv/g6'
import { ref } from 'vue'
import { createUniqueId } from '@/utils/index'
import { Random } from 'mockjs'
const eventSetup = Service.setup()
const props = defineProps(['undoDisable', 'redoDisable'])

const handler = {
  addItem: () => {
    let model = {
      id: String(Random.natural()),
      label: Random.cname(),
      address: Random.email(),
      x: Random.integer(0, 1920),
      y: Random.integer(0, 880),
      style: {
        fill: Random.hex()
      }
    }
    eventSetup.addItem('node', model)
  },
  addCombo: () => {
    let model = {
      id: String(Random.natural()),
      parentId: null,
      label: 'combo-' + Random.cname(),
      type: 'circle',
      x: Random.integer(0, 1920),
      y: Random.integer(0, 880),
      style: {
        fill: Random.hex()
      }
    }
    eventSetup.addItem('combo', model)
  },
  fitCenter: eventSetup.fitCenter,
  zoom: eventSetup.zoom,
  downloadImage: eventSetup.downloadImage,
  undo: () => {
    if (!props.undoDisable) {
      eventSetup.undo()
    }
  },
  redo: () => {
    if (!props.redoDisable) {
      eventSetup.redo()
    }
  }
}
</script>

<style scoped lang="less">
.tool-bar {
  min-width: 100px;
  //   height: 50px;
  padding: 10px;
  border-radius: 10px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #333;
  opacity: 0.7;
  display: flex;
  align-content: center;
  .tool-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    &:hover {
      background-color: #eee;
      border-radius: 5px;
    }
    &:first-child {
      margin: 0 5px 0 0;
    }
    &:last-child {
      margin: 0 0 0 5px;
    }
  }
}
.disabled {
  cursor: no-drop;
}
</style>
