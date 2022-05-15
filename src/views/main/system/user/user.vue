<template>
  <div class="user">
    <!-- 封装的组件使用单标签,非封装的组件使用双标签 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />

    <page-content
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="userTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />

    <page-modal
      ref="pageModalRef"
      :modalConfig="superModalConfig"
      pageName="users"
      :defaultModalInfo="defaultModalInfo"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  reactive,
  getCurrentInstance
} from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { userTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    /* 全局的globalProperties有$fiters(自定义的),$router
    ,$route,$store.$一般代表全局 */
    // const instance = getCurrentInstance()
    // instance?.appContext.config.globalProperties.$filters.foo()

    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 1.密码框显示的隐藏不属于公共的逻辑所以可以写到单独页面
    const passwordIsShow = (tag?: string) => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      tag === 'new'
        ? (passwordItem!.isHidden = false)
        : (passwordItem!.isHidden = true)
    }
    // 调用hook获取公共变量和函数
    const [defaultModalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(passwordIsShow)

    //2.动态添加部门和角色列表选项
    /* 只有类似template或computed或watch才会加到vuex的响应式系统里,
    会及时获到state最新的数据.当获取不到最新的值时,解决:放在computed里,
    当有最新值时,再调用里的getter方法 */
    const store = useStore()
    const superModalConfig = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentItem!.options = store.state.allDepartment.map((item) => ({
        title: item.name,
        value: item.id
      }))
      roleItem!.options = store.state.allRole.map((item) => ({
        title: item.name,
        value: item.id
      }))
      return modalConfig
    })

    return {
      searchFormConfig,
      userTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      superModalConfig,
      defaultModalInfo,
      pageModalRef,
      handleNewData,
      handleEditData
    }
  }
})
</script>
