import { inject } from 'vue'
import IGraphClass from '../../utils/IGraphClass'
import { createUniqueId } from '@/utils/index'
import { G6Event, IG6GraphEvent } from '@antv/g6'

interface IPageGraph {
  instance: IGraphClass | null
}

export default {
  setup() {
    const pageGraph: IPageGraph = inject('pageGraph', { instance: null })
    return {
      addItem: () => {
        pageGraph.instance?.addItem('node', {
          id: createUniqueId(),
          label: 'add-999',
          address: 'aaaaaa',
          x: 300,
          y: 300,
          style: {
            fill: 'red'
          }
        })
      },
      fitCenter: () => {
        pageGraph.instance?.fitCenter()
      },
      zoom: (ratio: number) => {
        pageGraph.instance?.zoom(ratio)
      },
      downloadImage: () => {
        pageGraph.instance?.downloadFullImage('graph_image')
      },
      undo: () => {
        pageGraph.instance?.undo()
      },
      redo: () => {
        pageGraph.instance?.redo()
      },
      bindEvent: (eventName: G6Event, handler: (e: IG6GraphEvent) => any) => {
        pageGraph.instance?.bindEvent(eventName, handler)
      }
    }
  }
}
