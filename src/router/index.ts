import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/views/main/main.vue')
    // children: [{ path: '', redirect: '/main/analysis/overview' }]
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () =>
      import(
        /* webpackChunkName: "notFound" */ '@/views/not-found/not-found.vue'
      )
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// vue-router版本问题切换到4.0.10
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // console.log(router.getRoutes())
  // console.log(to)

  // 路由/main的默认导向,单词！单词！单词！
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
