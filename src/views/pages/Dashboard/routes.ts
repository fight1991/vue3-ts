import type { RoutePath } from '@/types'
import { defineAsyncComponent, h } from 'vue'
import { RouterView } from 'vue-router'

const DashboardDemo = defineAsyncComponent(
  () => import(/* webpackChunkName: "dashboard" */ './DashboardDemo.vue'),
)

const routes: RoutePath = {
  path: '/main/index',
  hidden: true,
  name: 'tab-index',
  meta: {
    permission: '',
    title: '首页',
    component: DashboardDemo,
  },
}
export default routes
