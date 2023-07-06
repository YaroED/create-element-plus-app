import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000,
  method: 'POST'
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    console.log('🚀 ~ file: request.ts:14 ~ config.data:', config.data)
    return config
  },
  (error) => {
    // 请求错误的统一处理
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  /**
   * 通过判断状态码统一处理响应，根据情况修改
   * 同时也可以通过HTTP状态码判断请求结果
   */
  (response) => {
    const {
      data: { code, data, msg = '未知错误-2' }
    } = response
    console.log('🚀 ~ file: request.ts:35 ~ data:', data)
    // TODO：非正常业务逻辑报错
    if (code !== '0000') {
      ElMessage.error(msg)
      return Promise.reject(msg)
    }
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
