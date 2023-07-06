/**
 * 1.自动导入'vue', 'vue-router', 'vuex'
 * 2.按需导入要使用的ElementPlus组件
 */
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function createAutoImport() {
  return AutoImport({
    imports: ['vue', 'vue-router', 'vuex'],
    resolvers: [ElementPlusResolver()],
    dts: false
  })
}

export function createComponents() {
  return Components({
    resolvers: [ElementPlusResolver()]
  })
}
