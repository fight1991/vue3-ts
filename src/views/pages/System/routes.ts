import type { RoutePath } from '@/types'
import { h } from 'vue'

const routes: RoutePath = {
  iconName: 'iconName-orders',
  path: '/main/system',
  name: 'main-system',
  hidden: false,
  meta: {
    permission: '',
    title: '系统管理',
  },
  children: [
    {
      path: '/main/system/users',
      name: 'main-system-users',
      meta: {
        permission: '',
        title: '用户管理',
        component: () => h('div', '用户管理页面'),
      },
    },
    {
      path: '/main/system/roles',
      name: 'main-system-roles',
      hidden: true,
      meta: {
        permission: '',
        title: '角色管理',
        component: () => h('div', '角色管理页面'),
      },
    },
    {
      path: '/main/system/permissions',
      name: 'main-system-permissions',
      meta: {
        permission: '',
        title: '权限管理',
        component: () => h('div', '权限管理页面'),
      },
    },
    {
      path: '/main/system/settings',
      name: 'main-system-settings',
      meta: {
        permission: '',
        title: '系统设置',
      },
      children: [
        {
          path: '/main/system/settings/basic',
          name: 'main-system-settings-basic',
          meta: {
            permission: '',
            title: '基础设置',
            component: () => h('div', '基础设置页面'),
          },
        },
        {
          path: '/main/system/settings/advanced',
          name: 'main-system-settings-advanced',
          meta: {
            permission: '',
            title: '高级设置',
            component: () => h('div', '高级设置页面'),
          },
        },
      ],
    },
  ],
}
export default routes
