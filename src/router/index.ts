import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TabView from '@/layout/TabView.vue'
import MainView from '@/layout/MainView.vue'
import mainRoutes from './entry'
import { h } from 'vue'
console.log(mainRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tab/view',
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
      path: '/tab/view',
      name: 'tab-view',
      component: MainView,
      children: [...mainRoutes] as RouteRecordRaw[],
    },
  ],
})

export default router
