/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent, ShallowRef } from 'vue'
  const component: DefineComponent<{}, {}, any> & ShallowRef
  export default component
}
// 国际化声明
declare module 'element-plus/lib/packages/locale/lang/zh-cn'
declare module 'element-plus/lib/packages/locale/lang/en'
