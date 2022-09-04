<template>
  <div>
    <Header></Header>
    <div id="graph-root">
      <Drawer
        :id="lastId"
        v-model:showDrawer="showDrawer"
        :title="title"
        :detailList="detailList"
      ></Drawer>
      <ToolBar :undoDisable="undoDisable" :redoDisable="redoDisable"></ToolBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'
import GraphEvent from '@/utils/graphClass'
import IGraphClass from '../../utils/IGraphClass'
import Drawer from './components/drawer.vue'
import Header from '@/components/layout/header.vue'
import ToolBar from './components/toolBar.vue'
import { IG6GraphEvent } from '@antv/g6'

export interface IPageGraph {
  instance: IGraphClass | null
}

export interface IDetail {
  label: string
  value: string | number | boolean
}

let showDrawer = ref(false)
let title = ref('')
let pageGraph: IPageGraph = reactive({ instance: null })
/**
 * 回退栈-禁用
 */
const undoDisable = ref(true)
/**
 * 恢复栈-禁用
 */
const redoDisable = ref(true)
/**
 * 记录最后操作的id
 */
const lastId: Ref<string> = ref('')

watch(showDrawer, (newValue) => {
  if (!newValue && lastId.value) {
    if (pageGraph.instance?.findById(lastId.value)) {
      pageGraph.instance?.clearItemState(lastId.value, 'selected')
    }
  }
})

// 依赖注入
provide('pageGraph', pageGraph)
let detailList: Ref<Array<IDetail>> = ref([])

function initGraph() {
  const myGrpah: IGraphClass = new GraphEvent()
  pageGraph.instance = myGrpah
  const data = {
    nodes: [
      {
        id: '0',
        label: '0'
      },
      {
        id: '1',
        label: '1'
      },
      {
        id: '2',
        label: '2'
      },
      {
        id: '3',
        label: '3'
      },
      {
        id: '4',
        label: '4'
      },
      {
        id: '5',
        label: '5'
      },
      {
        id: '6',
        label: '6'
      },
      {
        id: '7',
        label: '7'
      },
      {
        id: '8',
        label: '8'
      },
      {
        id: '9',
        label: '9'
      },
      {
        id: '10',
        label: '10'
      },
      {
        id: '11',
        label: '11'
      },
      {
        id: '12',
        label: '12'
      },
      {
        id: '13',
        label: '13'
      },
      {
        id: '14',
        label: '14'
      },
      {
        id: '15',
        label: '15'
      },
      {
        id: '16',
        label: '16'
      },
      {
        id: '17',
        label: '17'
      },
      {
        id: '18',
        label: '18'
      },
      {
        id: '19',
        label: '19'
      },
      {
        id: '20',
        label: '20'
      },
      {
        id: '21',
        label: '21'
      },
      {
        id: '22',
        label: '22'
      },
      {
        id: '23',
        label: '23'
      },
      {
        id: '24',
        label: '24'
      },
      {
        id: '25',
        label: '25'
      },
      {
        id: '26',
        label: '26'
      },
      {
        id: '27',
        label: '27'
      },
      {
        id: '28',
        label: '28'
      },
      {
        id: '29',
        label: '29'
      },
      {
        id: '30',
        label: '30'
      },
      {
        id: '31',
        label: '31'
      },
      {
        id: '32',
        label: '32'
      },
      {
        id: '33',
        label: '33'
      }
    ],
    edges: [
      {
        source: '0',
        target: '1'
      },
      {
        source: '0',
        target: '2'
      },
      {
        source: '0',
        target: '3'
      },
      {
        source: '0',
        target: '4'
      },
      {
        source: '0',
        target: '5'
      },
      {
        source: '0',
        target: '7'
      },
      {
        source: '0',
        target: '8'
      },
      {
        source: '0',
        target: '9'
      },
      {
        source: '0',
        target: '10'
      },
      {
        source: '0',
        target: '11'
      },
      {
        source: '0',
        target: '13'
      },
      {
        source: '0',
        target: '14'
      },
      {
        source: '0',
        target: '15'
      },
      {
        source: '0',
        target: '16'
      },
      {
        source: '2',
        target: '3'
      },
      {
        source: '4',
        target: '5'
      },
      {
        source: '4',
        target: '6'
      },
      {
        source: '5',
        target: '6'
      },
      {
        source: '7',
        target: '13'
      },
      {
        source: '8',
        target: '14'
      },
      {
        source: '9',
        target: '10'
      },
      {
        source: '10',
        target: '22'
      },
      {
        source: '10',
        target: '14'
      },
      {
        source: '10',
        target: '12'
      },
      {
        source: '10',
        target: '24'
      },
      {
        source: '10',
        target: '21'
      },
      {
        source: '10',
        target: '20'
      },
      {
        source: '11',
        target: '24'
      },
      {
        source: '11',
        target: '22'
      },
      {
        source: '11',
        target: '14'
      },
      {
        source: '12',
        target: '13'
      },
      {
        source: '16',
        target: '17'
      },
      {
        source: '16',
        target: '18'
      },
      {
        source: '16',
        target: '21'
      },
      {
        source: '16',
        target: '22'
      },
      {
        source: '17',
        target: '18'
      },
      {
        source: '17',
        target: '20'
      },
      {
        source: '18',
        target: '19'
      },
      {
        source: '19',
        target: '20'
      },
      {
        source: '19',
        target: '33'
      },
      {
        source: '19',
        target: '22'
      },
      {
        source: '19',
        target: '23'
      },
      {
        source: '20',
        target: '21'
      },
      {
        source: '21',
        target: '22'
      },
      {
        source: '22',
        target: '24'
      },
      {
        source: '22',
        target: '25'
      },
      {
        source: '22',
        target: '26'
      },
      {
        source: '22',
        target: '23'
      },
      {
        source: '22',
        target: '28'
      },
      {
        source: '22',
        target: '30'
      },
      {
        source: '22',
        target: '31'
      },
      {
        source: '22',
        target: '32'
      },
      {
        source: '22',
        target: '33'
      },
      {
        source: '23',
        target: '28'
      },
      {
        source: '23',
        target: '27'
      },
      {
        source: '23',
        target: '29'
      },
      {
        source: '23',
        target: '30'
      },
      {
        source: '23',
        target: '31'
      },
      {
        source: '23',
        target: '33'
      },
      {
        source: '32',
        target: '33'
      }
    ]
  }
  myGrpah.waterMaker('vue3 graph')
  myGrpah.data(data)
  myGrpah.render()

  window.onresize = function () {
    pageGraph.instance?.refresh()
  }
  pageGraph.instance?.bindEvent('node:click', (node) => {
    showDrawer.value = true
    title.value = '节点信息'
    console.log(node)
    let item = node.item
    lastId.value = item?._cfg.model.id as string
    detailList.value = [
      { label: 'name', value: node.name },
      { label: 'id', value: item?._cfg.model.id },
      { label: 'type', value: item?._cfg?.model.type }
    ]
    pageGraph.instance?.setItemState(lastId.value, 'selected')
  })
  pageGraph.instance.bindEvent('combo:click', (combo) => {
    showDrawer.value = true
    title.value = 'combo信息'
  })

  pageGraph.instance?.bindEvent('stackchange', (evt: IG6GraphEvent) => {
    const { undoStack, redoStack } = evt
    const undoStackLen = (undoStack as Array<any>).length
    const redoStackLen = (redoStack as Array<any>).length
    console.log('stackchange', undoStackLen, redoStackLen)
    // undo不可用
    if (undoStackLen === 1) {
      undoDisable.value = true
    } else {
      undoDisable.value = false
    }

    if (redoStackLen === 0) {
      redoDisable.value = true
    } else {
      redoDisable.value = false
    }
  })
}

onMounted(async () => {
  await initGraph()
})

onUnmounted(() => {
  pageGraph.instance?.destroy()
  window.onresize = null
})
</script>

<style scoped lang="less">
#graph-root {
  width: 100%;
  height: 100%;
}
</style>

<style lang="less">
.mini-map {
  box-sizing: border-box;
  position: fixed;
  right: 20px;
  bottom: 20px;
  border: 2px solid #dcdfe6;
  border-radius: 8px;
}
</style>
