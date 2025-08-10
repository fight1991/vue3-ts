import type { RoutePath } from '@/types'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const routes: RoutePath = {
  path: '/tab/index',
  hidden: true,
  name: 'tab-index',
  meta: {
    permission: '',
    title: '首页',
    component: () => h('div', '我是首页'),
  },
}
export default routes
