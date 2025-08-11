import type { RoutePath } from '@/types'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const routes: RoutePath = {
  iconName: 'iconName-orders',
  path: '/main/dashboard',
  name: 'main-dashboard',
  hidden: false,
  meta: {
    permission: '1203000000',
    title: '工作台',
  },
  children: [
    {
      path: '/main/dashboard/overview',
      name: 'main-dashboard-overview',
      meta: {
        permission: '1203010000',
        title: '数据概览',
        component: () => import(/* webpackChunkName: "home" */ './DataDemo.vue'),
      },
    },
    {
      path: '/main/dashboard/analysis',
      name: 'main-dashboard-analysis',
      hidden: true,
      meta: {
        permission: '1203010000',
        title: '数据分析',
        component: () => import(/* webpackChunkName: "home2" */ './DataDemo.vue'),
      },
    },
    {
      path: '/main/dashboard/reports',
      name: 'main-dashboard-reports',
      meta: {
        permission: '1203050000',
        title: '报表中心',
        component: () => h('div', '报表中心页面'),
      },
    },
    {
      path: '/main/dashboard/workspace',
      name: 'main-dashboard-workspace',
      meta: {
        permission: '1203020000',
        title: '工作空间',
      },
      children: [
        {
          path: '/main/dashboard/workspace/projects',
          name: 'main-dashboard-workspace-projects',
          meta: {
            permission: '1203020000',
            title: '项目管理',
            component: () => h('div', '项目管理页面'),
          },
        },
        {
          path: '/main/dashboard/workspace/tasks',
          name: 'main-dashboard-workspace-tasks',
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
