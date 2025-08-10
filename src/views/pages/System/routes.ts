import type { RoutePath } from '@/types'
import { h } from 'vue'

const routes: RoutePath = {
  iconName: 'iconName-orders',
  path: '/system',
  name: 'system',
  hidden: false,
  meta: {
    permission: '1203000000',
    title: '系统管理',
  },
  children: [
    {
      path: '/system/users',
      name: 'system-users',
      meta: {
        permission: '1203010000',
        title: '用户管理',
        component: () => import(/* webpackChunkName: "home" */ './SystemDemo.vue'),
      },
    },
    {
      path: '/system/roles',
      name: 'system-roles',
      hidden: true,
      meta: {
        permission: '1203010000',
        title: '角色管理',
        component: () => import(/* webpackChunkName: "home2" */ './SystemDemo.vue'),
      },
    },
    {
      path: '/system/permissions',
      name: 'system-permissions',
      meta: {
        permission: '1203050000',
        title: '权限管理',
        component: () => h('div', '权限管理页面'),
      },
    },
    {
      path: '/system/settings',
      name: 'system-settings',
      meta: {
        permission: '1203020000',
        title: '系统设置',
      },
      children: [
        {
          path: '/system/settings/basic',
          name: 'system-settings-basic',
          meta: {
            permission: '1203020000',
            title: '基础设置',
            component: () => h('div', '基础设置页面'),
          },
        },
        {
          path: '/system/settings/advanced',
          name: 'system-settings-advanced',
          meta: {
            permission: '1203020000',
            title: '高级设置',
            component: () => h('div', '高级设置页面'),
          },
        },
      ],
    },
  ],
}
export default routes
