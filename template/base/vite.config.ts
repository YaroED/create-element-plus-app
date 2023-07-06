import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV, VITE_BASE_URL } = env
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 解决报tree-shake警告问题
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      proxy: {
        // 代理配置
        '/dev-api': {
          // QA环境IP
          // target: 'http://192.168.xx.xx',
          // changeOrigin: true,
          // rewrite: (p) => p.replace(/^\/dev-api/, '/other-api/')
          // QA环境
          target: 'http://192.168.xx.xx:xxxx',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '/xxxx/')
        }
      }
    },
    plugins: createVitePlugins(VITE_APP_ENV, command),
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    }
  }
})
