/* eslint-disable */
// 声明为模块，导出所有的vue文件，最终导出的是一个组件实例
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.json'
// declare let $store: any
