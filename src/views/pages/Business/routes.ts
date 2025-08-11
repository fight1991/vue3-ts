import type { RoutePath } from '@/types'
import { h } from 'vue'

const routes: RoutePath = {
  iconName: 'iconName-business',
  path: '/main/business',
  name: 'main-business',
  hidden: false,
  meta: {
    permission: '1204000000',
    title: '业务管理',
  },
  children: [
    {
      path: '/main/business/customers',
      name: 'main-business-customers',
      meta: {
        permission: '1204010000',
        title: '客户管理',
        component: () => h('div', '客户管理页面'),
      },
    },
    {
      path: '/main/business/orders',
      name: 'main-business-orders',
      meta: {
        permission: '1204020000',
        title: '订单管理',
        component: () => h('div', '订单管理页面'),
      },
    },
    {
      path: '/main/business/products',
      name: 'main-business-products',
      meta: {
        permission: '1204030000',
        title: '产品管理',
      },
      children: [
        {
          path: '/main/business/products/list',
          name: 'main-business-products-list',
          meta: {
            permission: '1204030100',
            title: '产品列表',
            component: () => h('div', '产品列表页面'),
          },
        },
        {
          path: '/main/business/products/categories',
          name: 'main-business-products-categories',
          meta: {
            permission: '1204030200',
            title: '产品分类',
            component: () => h('div', '产品分类页面'),
          },
        },
        {
          path: '/main/business/products/inventory',
          name: 'main-business-products-inventory',
          meta: {
            permission: '1204030300',
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
        permission: '1204040000',
        title: '财务管理',
      },
      children: [
        {
          path: '/main/business/finance/revenue',
          name: 'main-business-finance-revenue',
          meta: {
            permission: '1204040100',
            title: '收入统计',
            component: () => h('div', '收入统计页面'),
          },
        },
        {
          path: '/main/business/finance/expenses',
          name: 'main-business-finance-expenses',
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
