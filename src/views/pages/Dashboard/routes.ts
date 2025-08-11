import type { RoutePath } from '@/types'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const routes: RoutePath = {
  path: '/main/index',
  hidden: true,
  name: 'tab-index',
  meta: {
    permission: '',
    title: '首页',
    component: () => import('./DashboardDemo.vue'),
  },
}
export default routes
