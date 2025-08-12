import type { RoutePath } from '@/types'
import { RouterView } from 'vue-router'
// 读取views/pages目录下的路由文件
const modules = import.meta.glob('../views/pages/**/routes.ts', {
  eager: true,
  import: 'default',
})
const routesPaths = Object.keys(modules)
  .map((key) => {
    const routes = modules[key] || {}
    const routesList = Array.isArray(routes) ? routes : [routes]
    return routesList
  })
  .flat()

// 给routesPaths递归统一添加 component
const addComponentRecursively = (routes: RoutePath[]): RoutePath[] => {
  return routes.map((route) => {
    const newRoute = { ...route }
    if (!newRoute.component) {
      newRoute.component = RouterView
    }
    if (!newRoute.name) {
      newRoute.name = newRoute.path.replace(/\//g, '-').slice(1)
    }
    // 如果路由有子路由
    if (newRoute.children && newRoute.children.length > 0) {
      // 递归处理子路由
      newRoute.children = addComponentRecursively(newRoute.children)
    }

    return newRoute
  })
}
const mainRoutesPaths = addComponentRecursively(routesPaths)

export default mainRoutesPaths
