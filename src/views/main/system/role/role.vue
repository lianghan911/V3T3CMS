<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      pageName="role"
      :contentTableConfig="roleTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultModalInfo="defaultModalInfo"
      :modalConfig="modalConfig"
      pageName="role"
      :treeDataInfo="treeDataInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        /></div
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import { roleTableConfig } from './config/content.config'
import { searchFormConfig } from './config/seach.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { ElTree } from 'element-plus'

import { usePageModal } from '@/hooks/usePageModal'

import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (tag?: any, item?: any) => {
      // 虽然表格一行中没有完全显示listData中一个对象的数据,但是能拿的到一行数据item,因为请求了
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value) //不用nextTick会是undefiend,因为来不及绑定
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [defaultModalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(editCallback)

    const menus = computed(() => store.state.allMenu)
    const treeDataInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      treeDataInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      roleTableConfig,
      modalConfig,
      handleNewData,
      handleEditData,
      defaultModalInfo,
      pageModalRef,
      handleCheckChange,
      menus,
      treeDataInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
