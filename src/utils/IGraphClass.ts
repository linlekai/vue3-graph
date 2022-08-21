import G6, { IGraph, ITEM_TYPE, ModelConfig, G6Event, IG6GraphEvent } from '@antv/g6'

interface IGraphClass {
  _graph: IGraph
  data: (data: object) => void
  render: () => void
  refresh: () => void
  /**
   * 销毁画布
   */
  destroy: () => void
  /**
   * 仅画布重新绘制
   */
  paint: () => void
  /**
   * 新增元素（节点和边）
   */
  addItem: (type: ITEM_TYPE, model: ModelConfig, stack?: boolean | undefined) => void
  bindEvent: (eventName: G6Event, handler: (e: IG6GraphEvent) => any) => void
  /**
   * 加水印
   */
  waterMaker: (text: string) => void
  /**
   * 居中视图
   */
  fitCenter: () => void
  /**
   * 放大/缩小视图
   */
  zoom: (ratio: number) => void
  /**
   * 下载图片
   */
  downloadFullImage: (name: string) => void
  /**
   * 撤回
   */
  undo: () => void
  redo: () => void
  /**
   * 修改状态
   */
  setItemState: (id: string, state: string) => void
  /**
   * 清除状态
   */
  clearItemState: (id: string, state: string) => void
}

export default IGraphClass
