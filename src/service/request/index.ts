import axios, { AxiosInstance } from 'axios'
import { LHRequestInterceptors, LHRequestConfig } from './type'
import { ElLoading } from 'element-plus'
// 这TMD上哪找,找的多了自然就会找了，利用自动导入
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

// 默认显示加载
const DEAFULT_LOADING = true

// 请求的数据资源可能在不同的服务器上，baseurl就不一样了。用类的方式封装，就可以传递不同的baseurl，扩展性极强
export default class LHRequest {
  instance: AxiosInstance
  interceptors?: LHRequestInterceptors
  isShowLoading: boolean
  lodingInstance?: LoadingInstance

  constructor(config: LHRequestConfig) {
    this.instance = axios.create(config)

    // 保存基本信息
    this.isShowLoading = config.isShowLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 1.从config中取出的拦截器是对应单个实例的拦截器,给单个实例添加回调函数(拦截器)就有拦截器，没添加实例就没有
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorError
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorError
    )

    // 2.给所有的实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowLoading) {
          this.lodingInstance = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.lodingInstance?.close()
        const data = res.data
        return data
      },
      (err) => {
        // 将loading移除
        this.lodingInstance?.close()
        return err
      }
    )
  }

  /* 下一行代码中间的T(默认是AxiosResponse)的类型和左右T类型
  可不一样. */
  request<T = any>(config: LHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3.单个请求拦截对请求config的处理,相当于就是把对应的函数执行修改config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示loading
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading
      }
      /*因为在全局拦截器里把res拦截处理为res.data，res.data
      才是我们想要的数据，res里有些属性是axios自己加的，res.data
      才是我们想要的。但res.data不再是AxiosResponse类型，下边的
      res就会爆红，因为他想要AxiosResponse类型。request里的T得类
      型才是下边res的类型，所以我们设置泛型给这个T传递AxiosResponse
      类型就可以了，纠起原因是我们改变了类型(res=>res.data)  */
      // 3.单个响应拦截对数据的处理,也是执行函数修改响应数据
      this.instance
        .request<any, T, any>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将isShowLoading设置true, 这样不会影响下一个请求
          this.isShowLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.isShowLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }
  /* 第二个T还是和左右T不一样的，特别注意 */
  get<T = any>(config: LHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: LHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: LHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
