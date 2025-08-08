import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TabView from '@/layout/TabView.vue'
import MainView from '@/layout/MainView.vue'
import mainRoutes from './entry'
console.log(mainRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tab-view',
      name: 'tab-view',
      component: MainView,
      children: [...mainRoutes],
    },
  ],
})

export default router
