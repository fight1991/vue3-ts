import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MainView from '@/views/layout/MainView.vue'
import mainRoutes from './entry'
import { h } from 'vue'
import { afterEach, beforeEach } from './valid'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main/index',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => h('div', 'not found'), // 暂时这么写
      meta: {
        title: 'page-404',
        requiresAuth: false,
      },
    },
    {
      path: '/main/index',
      name: 'main-index',
      component: MainView,
      children: [...mainRoutes] as RouteRecordRaw[],
    },
  ],
})
router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router
