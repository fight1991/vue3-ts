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
        permission: '',
        title: '数据概览',
        component: () => h('div', '数据概览页面'),
      },
    },
    {
      path: '/main/dashboard/analysis',
      name: 'main-dashboard-analysis',
      hidden: true,
      meta: {
        permission: '',
        title: '数据分析',
        component: () => h('div', '数据分析页面'),
      },
    },
    {
      path: '/main/dashboard/reports',
      name: 'main-dashboard-reports',
      meta: {
        permission: '',
        title: '报表中心',
        component: () => h('div', '报表中心页面'),
      },
    },
    {
      path: '/main/dashboard/workspace',
      name: 'main-dashboard-workspace',
      meta: {
        permission: '',
        title: '工作空间',
      },
      children: [
        {
          path: '/main/dashboard/workspace/projects',
          name: 'main-dashboard-workspace-projects',
          meta: {
            permission: '',
            title: '项目管理',
            component: () => h('div', '项目管理页面'),
          },
        },
        {
          path: '/main/dashboard/workspace/tasks',
          name: 'main-dashboard-workspace-tasks',
          meta: {
            permission: '',
            title: '任务列表',
            component: () => h('div', '任务列表页面'),
          },
        },
      ],
    },
  ],
}
export default routes
