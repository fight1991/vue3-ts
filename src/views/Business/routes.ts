import type { RoutePath } from '@/types'
import { h } from 'vue'

const routes: RoutePath = {
  iconName: 'iconName-business',
  path: '/business',
  name: 'business',
  hidden: false,
  meta: {
    permission: '1204000000',
    title: '业务管理',
  },
  children: [
    {
      path: '/business/customers',
      name: 'business-customers',
      meta: {
        permission: '1204010000',
        title: '客户管理',
        component: () => h('div', '客户管理页面'),
      },
    },
    {
      path: '/business/orders',
      name: 'business-orders',
      meta: {
        permission: '1204020000',
        title: '订单管理',
        component: () => h('div', '订单管理页面'),
      },
    },
    {
      path: '/business/products',
      name: 'business-products',
      meta: {
        permission: '1204030000',
        title: '产品管理',
      },
      children: [
        {
          path: '/business/products/list',
          name: 'business-products-list',
          meta: {
            permission: '1204030100',
            title: '产品列表',
            component: () => h('div', '产品列表页面'),
          },
        },
        {
          path: '/business/products/categories',
          name: 'business-products-categories',
          meta: {
            permission: '1204030200',
            title: '产品分类',
            component: () => h('div', '产品分类页面'),
          },
        },
        {
          path: '/business/products/inventory',
          name: 'business-products-inventory',
          meta: {
            permission: '1204030300',
            title: '库存管理',
            component: () => h('div', '库存管理页面'),
          },
        },
      ],
    },
    {
      path: '/business/finance',
      name: 'business-finance',
      meta: {
        permission: '1204040000',
        title: '财务管理',
      },
      children: [
        {
          path: '/business/finance/revenue',
          name: 'business-finance-revenue',
          meta: {
            permission: '1204040100',
            title: '收入统计',
            component: () => h('div', '收入统计页面'),
          },
        },
        {
          path: '/business/finance/expenses',
          name: 'business-finance-expenses',
          meta: {
            permission: '1204040200',
            title: '支出管理',
            component: () => h('div', '支出管理页面'),
          },
        },
      ],
    },
  ],
}

export default routes
