import G6, { IGraph, ITEM_TYPE, ModelConfig, G6Event, IG6GraphEvent, ICombo, Item } from '@antv/g6'
import IGraphClass from './IGraphClass'
import { clone, isString } from '@antv/util'
import { merge } from 'lodash'

class GraphEvent implements IGraphClass {
  _graph: IGraph
  constructor() {
    // const { width, height } = screen
    const body = document.querySelector('body')
    const width = body?.offsetWidth
    const height = body?.offsetHeight as number

    const graph = new G6.Graph({
      container: 'graph-root',
      width: width, // Number，必须，图的宽度
      height: height - 63, // Number，必须，图的高度
      fitCenter: true,
      modes: {
        default: ['drag-combo', 'drag-node', 'zoom-canvas', 'drag-canvas']
      },
      layout: {
        type: 'radial',
        unitRadius: 200,
        preventOverlap: true,
        strictRadial: false
      },
      enabledStack: true,
      animate: true,
      defaultNode: {
        size: 50
      },
      defaultEdge: {
        style: {
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#e2e2e2'
          }
        }
      },
      plugins: [] // 插件
    })
    this._graph = graph
    this.extendPlugins()
  }
  /**
   * 设置插件
   */
  private extendPlugins() {
    const grid = new G6.Grid()
    const minimap = new G6.Minimap({
      className: 'mini-map',
      size: [120, 120]
    })
    // 基准线
    const snapLine = new G6.SnapLine()
    const toolTip = new G6.Tooltip({
      getContent(node) {
        return `
         <div class="tooltip">
          <ul>
            <li>id: ${node?.item?._cfg?.id}</li>
          </ul>
         </div>
        `
      }
    })

    this._graph.addPlugin(grid)
    this._graph.addPlugin(minimap)
    this._graph.addPlugin(snapLine)
    this._graph.addPlugin(toolTip)
  }
  data(data: object) {
    this._graph.data(data)
  }
  render() {
    this._graph.render()
  }
  destroy() {
    this._graph.destroy()
  }
  refresh() {
    this._graph.refresh()
  }
  paint() {
    this._graph.paint()
  }
  undo() {
    const graph: IGraph = this._graph
    const undoStack = graph.getUndoStack()
    if (!undoStack || undoStack.length === 1) {
      return
    }

    const currentData = undoStack.pop()
    if (currentData) {
      const { action } = currentData
      graph.pushStack(action, clone(currentData.data), 'redo')
      let data = currentData.data.before

      if (action === 'add') {
        data = currentData.data.after
      }

      if (!data) return

      switch (action) {
        case 'visible': {
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              const item = graph.findById(model.id)
              if (model.visible) {
                graph.showItem(item, false)
              } else {
                graph.hideItem(item, false)
              }
            })
          })
          break
        }
        case 'render':
        case 'update':
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              const item = graph.findById(model.id)
              delete model.id
              graph.updateItem(item, model, false)
              if (item.getType() === 'combo') graph.updateCombo(item as ICombo)
            })
          })
          break
        case 'changedata':
          graph.changeData(data, false)
          break
        case 'delete': {
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              const itemType = model.itemType
              delete model.itemType
              graph.addItem(itemType, model, false)
            })
          })
          break
        }
        case 'add':
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              graph.removeItem(model.id, false)
            })
          })
          break
        case 'updateComboTree':
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              graph.updateComboTree(model.id, model.parentId, false)
            })
          })
          break
        case 'layout':
          graph.updateLayout(data, undefined, undefined, false)
          break
        default:
      }
    }
  }
  redo() {
    const graph: IGraph = this._graph
    const redoStack = graph.getRedoStack()

    if (!redoStack || redoStack.length === 0) {
      return
    }

    const currentData = redoStack.pop()
    if (currentData) {
      const { action } = currentData
      let data = currentData.data.after
      graph.pushStack(action, clone(currentData.data))
      if (action === 'delete') {
        data = currentData.data.before
      }

      if (!data) return

      switch (action) {
        case 'visible': {
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              const item = graph.findById(model.id)
              if (model.visible) {
                graph.showItem(item, false)
              } else {
                graph.hideItem(item, false)
              }
            })
          })
          break
        }
        case 'render':
        case 'update':
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              const item = graph.findById(model.id)
              delete model.id
              graph.updateItem(item, model, false)
              if (item.getType() === 'combo') graph.updateCombo(item as ICombo)
            })
          })
          break
        case 'changedata':
          graph.changeData(data, false)
          break
        case 'delete':
          if (data.edges) {
            data.edges.forEach((model) => {
              graph.removeItem(model.id, false)
            })
          }
          if (data.nodes) {
            data.nodes.forEach((model) => {
              graph.removeItem(model.id, false)
            })
          }
          if (data.combos) {
            data.combos.forEach((model) => {
              graph.removeItem(model.id, false)
            })
          }
          break
        case 'add': {
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              const itemType = model.itemType
              delete model.itemType
              graph.addItem(itemType, model, false)
            })
          })
          break
        }
        case 'updateComboTree':
          Object.keys(data).forEach((key) => {
            const array = data[key]
            if (!array) return
            array.forEach((model) => {
              graph.updateComboTree(model.id, model.parentId, false)
            })
          })
          break
        case 'layout':
          graph.updateLayout(data, undefined, undefined, false)
          break
        default:
      }
    }
  }
  addItem(type: ITEM_TYPE, model: ModelConfig, stack?: boolean | undefined) {
    this._graph.addItem(type, model, true)
  }
  removeItem(item: string | Item) {
    this._graph.removeItem(item, true)
  }
  findById(id: string) {
    return this._graph.findById(id)
  }

  pushStack(action: string, data: any, stackType: 'redo' | 'undo' | undefined) {
    this._graph.pushStack(action, data, stackType)
  }
  bindEvent(eventName: G6Event, handler: (e: IG6GraphEvent) => any) {
    this._graph.on(eventName, handler)
  }
  waterMaker(text: string) {
    this._graph.setTextWaterMarker([text], {})
  }
  fitCenter() {
    this._graph.fitCenter()
  }
  zoom(ratio: number) {
    this._graph.zoom(ratio)
  }
  downloadFullImage(name: string) {
    this._graph.downloadFullImage(name, 'image/png', {
      backgroundColor: '#fff'
    })
  }
  setItemState(id: string, state: string) {
    this._graph.setItemState(id, state, true)
  }
  clearItemState(id: string, state: string) {
    this._graph.clearItemStates(id, state)
  }
}

export default GraphEvent
