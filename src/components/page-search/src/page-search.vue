<template>
  <div class="page-search">
    <lh-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </lh-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LhForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: {
    LhForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 优化: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref({ ...formOriginData })

    // 用户点击重置
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      /* 组件间双向绑定,如果改变modelValue地址值,formData.value = formOriginData
      则form组件不会得到最新的modelValue的值,因为ref对象...。
      解决:可以直接给小组件绑定跳过子组件:
        model-value='modeleValue[`${item.field}`],
        @update:modelValue=handleValueChange($event,item.field)。
        const handlevalueChange = (value: any,field: string) =>{
          emit( 'update:modelValue',{ ...props.modelValue,[field]:value })
        }
      如果是一个参数$event可以不写,两个参数必须写$event,$event就是新值*/
      // formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: #000;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
