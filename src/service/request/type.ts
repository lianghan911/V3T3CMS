import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LHRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorError?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorError?: (error: any) => any
}

/* 增加了接口的扩展性,给LHRequestConfig加上泛型因为如果
LHRequestInterceptors<T = AxiosResponse>不再是默认的泛型
时，可以给其指定对应类型。而LHRequestInterceptors<T = AxiosResponse>泛型也设置默认值，为了使这个接口变得更加
独立，当被其他地方用时 */
export interface LHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LHRequestInterceptors<T>
  isShowLoading?: boolean
}
