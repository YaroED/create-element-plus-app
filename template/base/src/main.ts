import { createApp } from 'vue'
// 此处为减少打包后体积，只全局引入element-plus样式，不全局引入element-plus组件，组件在页面上按需引入
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
