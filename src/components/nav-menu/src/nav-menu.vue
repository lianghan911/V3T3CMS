<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <!-- 折叠的话文字不显示 -->
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      active-text-color="#000"
      background-color="#0c2135"
      text-color="#fff"
      class="el-menu-vertical"
      :default-active="defaultValue"
      :collapse="collapse"
      :collapse-transition="true"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 等于1为二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                @click="handleMenuItemClick(subitem)"
                :index="subitem.id + ''"
              >
                <el-icon v-if="subitem.icon">
                  <component :is="subitem.icon"></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon">
              <component :is="item.icon"> </component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
// vuex - typescript  => pinia
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    // 后端返回数据icon的处理和userMenus的动态变化响应
    const userMenus = computed(() => store.state.loginModule.userMenus)

    userMenus.value.forEach((item: any) => {
      item.icon = item.icon.split('-').slice(2).join('')
      if (item.icon === 'chatlineround') {
        // element-plus的icon怎么写这里就怎么写
        item.icon = 'ChatLineRound'
      }
    })

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = pathMapToMenu(userMenus.value, currentPath)
    // elementplus的defaultValue必须是字符串
    const defaultValue = ref(menu.id + '')

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      handleMenuItemClick,
      defaultValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  //去掉折叠的白线
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    font-weight: 600;
    color: #000 !important;
    background-color: #ffc21a !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
