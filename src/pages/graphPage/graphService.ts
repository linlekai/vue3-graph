import { inject } from 'vue'
import IGraphClass from '../../utils/IGraphClass'
import { G6Event, IG6GraphEvent, Item, ITEM_TYPE, ModelConfig } from '@antv/g6'

interface IPageGraph {
  instance: IGraphClass | null
}

export default {
  setup() {
    const pageGraph: IPageGraph = inject('pageGraph', { instance: null })
    return {
      addItem: (itemType: ITEM_TYPE, model: ModelConfig) => {
        pageGraph.instance?.addItem(itemType, model)
      },
      removeItem: (item: string | Item) => {
        pageGraph.instance?.removeItem(item)
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
