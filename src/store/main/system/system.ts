import { Module } from 'vuex'
import { rootState } from '@/store/types'
import { systemState } from './types'

import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<systemState, rootState> = {
  namespaced: true,
  state() {
    return {
      userCount: 0,
      userList: [],
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentTotalCount: 0,
      departmentList: [],
      storyTotalCount: 0,
      storyList: [],
      categoryTotalCount: 0,
      categoryList: []
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    changeDepartmentTotalCount(state, totalCount: number) {
      state.departmentTotalCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeCategoryTotalCount(state, totalCount: number) {
      state.categoryTotalCount = totalCount
    },
    changeCategoryList(state, roleList: any) {
      state.categoryList = roleList
    },
    changeStoryTotalCount(state, totalCount: number) {
      state.storyTotalCount = totalCount
    },
    changeStoryList(state, storyList: any) {
      state.storyList = storyList
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // return (state as any)[`${pageName}List`]
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
          case 'department':
            return state.departmentList
          case 'story':
            return state.storyList
          case 'category':
            return state.categoryList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
          case 'department':
            return state.departmentTotalCount
          case 'story':
            return state.storyTotalCount
          case 'category':
            return state.categoryTotalCount
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
        case 'department':
          pageUrl = '/department/list'
          break
        case 'story':
          pageUrl = '/story/list'
          break
        case 'category':
          pageUrl = '/category/list'
          break
      }

      // 2.对页面发送请求,当请求到401时,还是unauzorization时可能是你的请求字段和后端不对
      const tabelData = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = tabelData.data
      switch (pageName) {
        case 'users':
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleCount`, totalCount)
          break
        case 'goods':
          commit(`changeGoodsList`, list)
          commit(`changeGoodsCount`, totalCount)
          break
        case 'menu':
          commit(`changeMenuList`, list)
          commit(`changeMenuCount`, totalCount)
          break
        case 'department':
          commit(`changeDepartmentList`, list)
          commit(`changeDepartmentTotalCount`, totalCount)
          break
        case 'story':
          commit(`changeStoryList`, list)
          commit(`changeStoryTotalCount`, totalCount)
          break
        case 'category':
          commit(`changeCategoryList`, list)
          commit(`changeCategoryTotalCount`, totalCount)
          break
      }
    },

    // 4.删除/编辑/新建操作
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.拼接路径
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.调用删除网络请求
      await deletePageData(pageUrl)
      // 3.重新获取最新数据,这里如果有请求的查询条件可以放vuex中，这里简单处理
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
