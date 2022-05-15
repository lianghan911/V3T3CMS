import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'
// 引入封装的组件出口文件
import { globalRegister } from '@/global/index'

import { loadDatatoVuex } from './store'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
/*
  刷新找不到页面问题:
  app.use(router)->install(){}->获取当前path ->router.routes ->notFound

  loadDatatoVuex()->注册动态路由routes路由守卫(这时才回调to())
 */
// 防止刷新store里的数据为空
loadDatatoVuex()
app.use(router)
app.mount('#app')
// createApp(App).use(store).use(router).mount('#app')

/* interface DataType {
  data: any
  returnCode: string
  success: boolean
} */
/* 返回的是Promise这里才能拿到响应的数据，
由于then后还是promise，then相当于Promise函数类执行
，Promise里面传的类型也是响应数据的类型，因为类声明
了泛型 */
/* lhRequest
  .get<DataType>({
    url: '/home/multidata',
    method: 'GET',
    isShowLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  }) */

/* lhRequest.request({
  url: '/home/multidata',
  method: 'GET',
  // 单独请求对config的拦截处理
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    responseInterceptor: (res) => {
      return res
    }
  }
}) */
