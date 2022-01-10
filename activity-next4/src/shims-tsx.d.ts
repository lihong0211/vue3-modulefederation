import Vue, { VNode } from 'vue'

/* eslint-disable */
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

interface IPopupSetting {
  /**
   * 弹框类型：
   * confirm（确认框）
   * rule（规则文案）
   * awards（奖品列表）
   * detail（奖品信息）
   * custom（自定义插入子组件）
   */
  mode?: string
  // 弹框宽度
  bodyWidth?: number
  // 弹框标题
  title?: string
  // 控制弹框显示
  show?: boolean
  // 弹框文案
  text?: string
  // 确认按钮
  confirm?: IButtonOptions
  // 取消按钮
  cancel?: IButtonOptions
  // 奖品列表
  awards?: IAward[]
  // 奖品信息
  detail?: IAward
  // 子组件数据
  innerData?: object
  close?: ICloseOptions
  // 插入子组件
  component?: object
  componentName?: string
  wrapClassName?: string
}

interface IMapLike {
  [K: string]: any
}

declare module 'vue/types/vue' {
  interface Vue {
    $agilePopup: (t: IPopupSetting & IMapLike) => void
    $activityPage?: Vue
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    install: (Vue: VueConstructor) => void
  }
}
