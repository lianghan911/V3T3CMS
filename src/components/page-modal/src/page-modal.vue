<template>
  <div class="page-modal">
    <!-- 最好加上destroy-on-close,避免不销毁时不能获取最新的配置 -->
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      draggable
      destroy-on-close
    >
      <lh-form v-bind="modalConfig" v-model="formData"></lh-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import LhForm from '@/base-ui/form'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    LhForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    defaultModalInfo: {
      type: Object,
      default: () => ({})
    },
    treeDataInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultModalInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 0 NaN '' null undefined
      if (Object.keys(props.defaultModalInfo).length) {
        // 编辑
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.treeDataInfo },
          id: props.defaultModalInfo.id
        })
      } else {
        // 新建
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.treeDataInfo }
        })
      }
    }

    return { dialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style scoped></style>
