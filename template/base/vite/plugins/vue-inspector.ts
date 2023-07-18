// import Inspector from 'vite-plugin-vue-inspector'
// "vite-plugin-vue-inspector": "3.4.2",

import { ViteCodeInspectorPlugin } from 'vite-code-inspector-plugin'

export default function createVueInspector() {
  // 该库配置了host，且挂了代理，会导致打开502
  // return Inspector()
  // 默认组合键 mac: Options + Shift键盘, window: Alt + Shift
  return ViteCodeInspectorPlugin({
    // showSwitch: true
  })
}
