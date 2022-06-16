import axios from 'axios'
import { ResDataType } from '@/interface'

const CODE = {
  // 登录过期
  LOGIN_TIMEOUT: 1000,
  // 请求成功
  REQUEST_SUCCESS: 0,
}

const instance = axios.create({
  baseURL: '/',
  timeout: 1000,
  withCredentials: true,
})

instance.interceptors.request.use((config) => config)

instance.defaults.timeout = 1e4

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { data } = response
      if (data.code === CODE.REQUEST_SUCCESS) {
        return data
      }
    }
    return response
  },
  async (err) => {
    const { config } = err

    if (!config || !config.retry) {
      return Promise.reject(err)
    }

    config.retryCount = config.retryCount || 0

    if (config.retryCount >= config.retry) {
      return Promise.reject(err)
    }

    config.retryCount += 1

    const backOff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, config.retryDelay || 1)
    })

    await backOff
    return instance(config)
  }
)

/** 添加拦截 */
interface Http {
  get<T>(url: string, params?: {}): Promise<ResDataType>
  post<T>(url: string, params?: {}): Promise<ResDataType>
  upload<T>(url: string, params: {}): Promise<ResDataType>
}
export const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
}
// upload
export default instance
