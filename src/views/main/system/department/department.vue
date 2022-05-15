<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      pageName="department"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultModalInfo="defaultModalInfo"
      pageName="department"
      :modalConfig="superModalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [defaultModalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal()

    const store = useStore()
    const superModalConfigRef = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      )
      parentIdItem!.options = store.state.allDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    return {
      searchFormConfig,
      contentTableConfig,
      superModalConfigRef,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      defaultModalInfo,
      pageModalRef,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
