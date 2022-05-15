import { App } from 'vue'

import { formatUtcTime } from '@/utils/date-format'

export default function (app: App) {
  // 给app的全局注册一个函数方便全局使用
  app.config.globalProperties.$filters = {
    foo() {
      console.log('app', app)
    },
    formatTime(value: string, format?: string) {
      return formatUtcTime(value, format)
    }
  }
}
