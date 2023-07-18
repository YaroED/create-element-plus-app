import vue from '@vitejs/plugin-vue'
import { createAutoImport, createComponents } from './auto-import'
import createVueInspector from './vue-inspector'
// import createMockServe from './mock-serve'

export default function createVitePlugins(viteEnv?: string, command?: string) {
  // TODO 开发环境才启用Mock
  // const isMock = viteEnv === 'development'
  const vitePlugins = [vue(), createAutoImport(), createComponents(), createVueInspector()]
  // vitePlugins.push(createMockServe(isMock, command))
  return vitePlugins
}
