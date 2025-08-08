import type { RoutePath } from '@/types'
import { h } from 'vue'

const routes: RoutePath = {
  iconName: 'iconName-orders',
  path: '/a2',
  name: 'a2',
  hidden: false,
  meta: {
    permission: '1203000000',
    title: '一级菜单',
  },
  children: [
    {
      path: '/a2/b1',
      name: 'a2-b1',
      meta: {
        permission: '1203010000',
        title: '二级菜单-1',
        component: () => import(/* webpackChunkName: "home" */ './SystemDemo.vue'),
      },
    },
    {
      path: '/a2/b2',
      name: 'a2-b2',
      hidden: true,
      meta: {
        permission: '1203010000',
        title: '二级菜单-2',
        component: () => import(/* webpackChunkName: "home2" */ './SystemDemo.vue'),
      },
    },
    {
      path: '/a2/b3',
      name: 'a2-b3',
      meta: {
        permission: '1203050000',
        title: '二级菜单-3',
        component: () => h('div', '企业信息录入'),
      },
    },
    {
      path: '/a2/b4',
      name: 'a2-b4',
      meta: {
        permission: '1203020000',
        title: '二级菜单-4',
      },
      children: [
        {
          path: '/a2/b4/c1',
          name: 'a2-b4-c1',
          meta: {
            permission: '1203020000',
            title: '三级级菜单',
            component: () => h('div', '三级页面'),
          },
        },
        {
          path: '/a2/b4/c2',
          name: 'a2-b4-c2',
          meta: {
            permission: '1203020000',
            title: '三级级菜单',
            component: () => h('div', '三级页面'),
          },
        },
      ],
    },
  ],
}
export default routes
