import { createStore, Store, useStore as useVuexStore } from 'vuex'

import systemModule from './main/system/system'
import loginModule from './login/login'
import dashboardModule from './main/analysis/dashboard'

import { rootState, storeType } from './types'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<rootState>({
  state() {
    return {
      name: 'lh',
      age: 17,
      allDepartment: [],
      allRole: [],
      allMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.allDepartment = list
    },
    changeEntireRole(state, list) {
      state.allRole = list
    },
    changeEntireMenu(state, list) {
      state.allMenu = list
    }
  },
  actions: {
    /* 这些数据放到根里的原因是以后其他页面可能也要用,不仅仅是回显要用 */
    async getInitialDataAction({ commit }) {
      //1.请求部门和角色
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      // ES6新语法起别名加:在键名相同时
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})
// 注意:加上命名空间时调用actions里的方法的路径是=>store里的键名/actions里的方法
export function loadDatatoVuex() {
  store.dispatch('loginModule/loadLocalLogin')
  // 如果发送请求之前没有token,是请求不到的,所以要确保token存在,下一行代码应该放在token已经存在的代码后
  // store.dispatch('getInitialDataAction')
}
// 对useStore函数进行重载,为了用store中的模块里的state更方便更严谨(有提示),useStore只能在composition的API能用
export function useStore(): Store<storeType> {
  return useVuexStore()
}
export default store
