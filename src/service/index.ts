// service的统一出口
import LHRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const lhRequest = new LHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log(config)
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('config', config)
      return config
    },
    requestInterceptorError: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorError: (err) => {
      return err
    }
  }
})
export default lhRequest
