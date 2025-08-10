import type { RoutePath } from '@/types'
import { h, ref, type Component, shallowRef } from 'vue'
import mainRoutesPaths from '@/router/entry'
import type { ItemType } from 'ant-design-vue/es/menu'
import { MailOutlined } from '@ant-design/icons-vue'

export interface MenuItemProps {
  key: string
  icon: Component
  label: string
  children?: MenuItemProps[]
}

// 缓存菜单数据
let cachedMenuData: MenuItemProps[] | null = null

// 递归生成菜单数据，过滤掉为hidden为true的情况, 返回树形结构
const generateMenu = (routes: RoutePath[]): MenuItemProps[] => {
  return routes
    .filter((route) => !route.hidden)
    .map((route) => {
      const menuItem: MenuItemProps = {
        key: route.name,
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

// 递归查找路径对应的所有父级菜单 key
const findParentKeys = (
  menuItems: MenuItemProps[],
  targetPath: string,
  parentKeys: string[] = [],
): string[] => {
  for (const item of menuItems) {
    const currentKeys = [...parentKeys, item.key]

    // 如果当前项匹配目标路径，返回父级keys（不包含当前项）
    if (item.key === targetPath) {
      return parentKeys
    }

    // 如果有子菜单，递归查找
    if (item.children && item.children.length > 0) {
      const result = findParentKeys(item.children, targetPath, currentKeys)
      if (result.length > 0) {
        return result
      }
    }
  }

  return []
}

// 根据当前路由路径获取需要展开的菜单 keys
export const getOpenKeysFromPath = (menuItems: MenuItemProps[], currentPath: string): string[] => {
  return findParentKeys(menuItems, currentPath)
}

export const useMenuDataFromRoute = <T>() => {
  // 使用 shallowRef 优化性能，避免深度响应
  const menuData = shallowRef<T[]>([])

  // 使用缓存机制，避免重复生成菜单数据
  if (!cachedMenuData) {
    cachedMenuData = generateMenu(mainRoutesPaths)
  }

  menuData.value = cachedMenuData as T[]

  return {
    menuData,
    getOpenKeysFromPath: (currentPathName: string) =>
      getOpenKeysFromPath(cachedMenuData || [], currentPathName),
  }
}
