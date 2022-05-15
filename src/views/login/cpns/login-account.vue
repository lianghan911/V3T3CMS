<template>
  <div class="login-account">
    <!-- :model="account"为了获取最新的account -->
    <el-form :model="account" ref="accountFormRef" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // ref里边的泛型(ref里边的泛型是any(any很不安全,因为跳过了TS的编译))决定着value的类型，因为如果value是null，null类型没有.validate
    // 不传<InstanceType<typeof ElForm>>用默认any虽然也可以,但是如果validate写错了或者其他原因没有了这个validate属性，编译就不会提示报错，就会有安全隐患
    // <InstanceType<typeof ElForm>>中一定要传递类的实例
    const accountFormRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      accountFormRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.登录验证accoutLoginAction
          store.dispatch('loginModule/accountLoginAction', {
            ...account
          })
        }
      })
    }
    return {
      account,
      accountFormRef,
      rules,
      loginAction
    }
  }
})
</script>
