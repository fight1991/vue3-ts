import type { RoutePath } from '@/types'
import { defineAsyncComponent, h } from 'vue'
import { RouterView } from 'vue-router'

const BusinessList = defineAsyncComponent(
  () => import(/* webpackChunkName: "business-list" */ './List.vue'),
)
const BusinessEdit = defineAsyncComponent(
  () => import(/* webpackChunkName: "business-edit" */ './Edit.vue'),
)
const routes: RoutePath = {
  iconName: 'iconName-business',
  path: '/main/business',
  name: 'main-business',
  hidden: false,
  meta: {
    permission: '',
    title: '业务管理',
  },
  children: [
    {
      path: '/main/business/customers',
      name: 'main-business-customers',
      meta: {
        permission: '',
        title: '客户管理',
        component: BusinessList,
      },
    },
    {
      path: '/main/business/customers/op',
      name: 'main-business-customers-op',
      meta: {
        permission: '',
        title: '客户操作',
        component: BusinessEdit,
      },
    },

    {
      path: '/main/business/orders',
      name: 'main-business-orders',
      meta: {
        permission: '',
        title: '订单管理',
        component: () => h('div', '订单管理页面'),
      },
    },
    {
      path: '/main/business/products',
      name: 'main-business-products',
      meta: {
        permission: '',
        title: '产品管理',
      },
      children: [
        {
          path: '/main/business/products/list',
          name: 'main-business-products-list',
          meta: {
            permission: '',
            title: '产品列表',
            component: () => h('div', '产品列表页面'),
          },
        },
        {
          path: '/main/business/products/categories',
          name: 'main-business-products-categories',
          meta: {
            permission: '',
            title: '产品分类',
            component: () => h('div', '产品分类页面'),
          },
        },
        {
          path: '/main/business/products/inventory',
          name: 'main-business-products-inventory',
          meta: {
            permission: '',
            title: '库存管理',
            component: () => h('div', '库存管理页面'),
          },
        },
      ],
    },
    {
      path: '/main/business/finance',
      name: 'main-business-finance',
      meta: {
        permission: '',
        title: '财务管理',
      },
      children: [
        {
          path: '/main/business/finance/revenue',
          name: 'main-business-finance-revenue',
          meta: {
            permission: '',
            title: '收入统计',
            component: () => h('div', '收入统计页面'),
          },
        },
        {
          path: '/main/business/finance/expenses',
          name: 'main-business-finance-expenses',
          meta: {
            permission: '',
            title: '支出管理',
            component: () => h('div', '支出管理页面'),
          },
        },
      ],
    },
  ],
}

export default routes
