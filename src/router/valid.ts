import { useTabs } from '@/hooks/tabs'
import { useTabStore } from '@/stores/tab'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const beforeEach = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
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
