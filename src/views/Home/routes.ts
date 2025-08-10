import type { RoutePath } from '@/types'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const routes: RoutePath = {
  iconName: 'iconName-orders',
  path: '/dashboard',
  name: 'dashboard',
  hidden: false,
  meta: {
    permission: '1203000000',
    title: '工作台',
  },
  children: [
    {
      path: '/dashboard/overview',
      name: 'dashboard-overview',
      meta: {
        permission: '1203010000',
        title: '数据概览',
        component: () => import(/* webpackChunkName: "home" */ './HomeDemo.vue'),
      },
    },
    {
      path: '/dashboard/analysis',
      name: 'dashboard-analysis',
      hidden: true,
      meta: {
        permission: '1203010000',
        title: '数据分析',
        component: () => import(/* webpackChunkName: "home2" */ './HomeDemo.vue'),
      },
    },
    {
      path: '/dashboard/reports',
      name: 'dashboard-reports',
      meta: {
        permission: '1203050000',
        title: '报表中心',
        component: () => h('div', '报表中心页面'),
      },
    },
    {
      path: '/dashboard/workspace',
      name: 'dashboard-workspace',
      meta: {
        permission: '1203020000',
        title: '工作空间',
      },
      children: [
        {
          path: '/dashboard/workspace/projects',
          name: 'dashboard-workspace-projects',
          meta: {
            permission: '1203020000',
            title: '项目管理',
            component: () => h('div', '项目管理页面'),
          },
        },
        {
          path: '/dashboard/workspace/tasks',
          name: 'dashboard-workspace-tasks',
          meta: {
            permission: '1203020000',
            title: '任务列表',
            component: () => h('div', '任务列表页面'),
          },
        },
      ],
    },
  ],
}
export default routes
