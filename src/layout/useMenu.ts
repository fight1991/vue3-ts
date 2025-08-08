import type { RoutePath } from '@/types'
import { h, ref, type Component } from 'vue'
import mainRoutesPaths from '@/router/entry'
import type { ItemType } from 'ant-design-vue/es/menu'
import { MailOutlined } from '@ant-design/icons-vue'
export interface MenuItemProps {
  key: string
  icon: Component
  label: string
  children?: MenuItemProps[]
}

// 递归生成菜单数据，返回树形结构
const generateMenu = (routes: RoutePath[]): MenuItemProps[] => {
  return routes.map((route) => {
    const menuItem: MenuItemProps = {
      key: route.path,
      label: route.meta?.title || route.name || route.path,
      // 图标先暂时这么写
      icon: () => h(MailOutlined),
    }

    // 如果有子路由，递归生成子菜单
    if (route.children && route.children.length > 0) {
      menuItem.children = generateMenu(route.children)
    }

    return menuItem
  })
}

export const useMenuDataFromRoute = <T>() => {
  const menuData = ref<T[]>([])

  // 生成菜单数据
  menuData.value = generateMenu(mainRoutesPaths) as T[]

  return menuData
}
