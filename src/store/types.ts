import { loginState } from './login/types'
import { systemState } from './main/system/types'
import { dashboardState } from './main/analysis/types'

export interface rootState {
  name: string
  age: number
  allDepartment: any[]
  allRole: any[]
  allMenu: any[]
}

// 模块的名字和这里设置的类型限制无关
export interface rootStoreMoudle {
  loginModule: loginState
  systemModule: systemState
  dashboardModule: dashboardState
}
// 对useStore函数进行重载用
export type storeType = rootState & rootStoreMoudle
