import { useTabs } from '@/hooks/tabs'
import { useLoadingStore } from '@/stores/loading'
import { useTabStore } from '@/stores/tab'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const beforeEach = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // 是否是开启全局loading
  const loadingStore = useLoadingStore()
  // 进入后台管理页面(以/main开头的路径)，关闭全局loading
  loadingStore.toggleGlobalLoading(!to.path.startsWith('/main'))

  // 登录页直接放行
  if (to.path === '/login') {
    const userStore = useUserStore()
    userStore.removeToken()
    userStore.setFirstStatus(true)
    next()
    return
  }

  // 第一次进入系统需要获取权限状态和用户信息(刷新地址栏)
  const userStore = useUserStore()
  if (userStore.isFirst) {
    // 将token保存在内存中
    userStore.setToken(sessionStorage.getItem('token') || '')

    // 用户信息/权限查询
    // let sin = await initUserInfo()
    // if (sin) {}
    userStore.setFirstStatus(false)
  }

  // 不需权限,直接放行,/error-xx等
  if (to.meta.requiresAuth === false) {
    next()
    return
  }

  // 路由跳转鉴别权限
  if (!!to.meta.permission && !userStore.permissions.includes(to.meta.permission as string)) {
    if (userStore.userInfo.userId) {
      message.error('无权访问此页面,请联系管理员!')
      next('/error/nopermission')
    }
    return
  }
  next()
}

export const afterEach = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const tabStore = useTabStore()
  const tab = useTabs()
  if (to.meta.component) {
    if (tabStore.isInitTab) {
      tab.push({
        name: to.name as string,
        query: to.query,
        params: to.params,
      })
    }

    tabStore.setInitTabStatus(false)
  }
  document.title = `Seeker - ${to.meta.title ?? to.name}`
}
