import { ref, computed, nextTick, readonly, watch, markRaw, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type { TabItemProps } from '@/types'
import DashboardDemo from '@/views/pages/Dashboard/DashboardDemo.vue'
const DefaultTab: TabItemProps = {
  title: '首页',
  name: 'tab-index',
  isShow: true,
  components: [markRaw(DashboardDemo)],
  query: {},
  params: {},
  loadingNum: 0,
}
const MaxTabsCounts = 10

export const useTabStore = defineStore('tab', () => {
  const tabList = shallowRef<TabItemProps[]>([DefaultTab])
  const tabConst = shallowRef<TabItemProps>(DefaultTab)
  const activeTab = ref<string>('tab-index')
  // 刷新页面时正常添加页签
  const isInitTab = ref<boolean>(true)
  const currentTabInfo = computed<TabItemProps>(
    () => tabList.value.find((tab) => tab.name === activeTab.value) ?? tabConst.value,
  )
  // 监听 tabList 长度变化，限制最大标签数量
  watch(
    () => tabList.value.length,
    (newLength) => {
      if (newLength >= MaxTabsCounts) {
        tabList.value.splice(1, 1)
      }
    },
    { flush: 'sync' },
  )
  // 添加新页签
  const addTab = (tab: TabItemProps) => {
    if (!tabList.value.find((t) => t.name === tab.name)) {
      tabList.value.push(tab)
    }
    setActiveTab(tab.name)
  }
  // 激活当前页签
  const setActiveTab = (name: string) => {
    activeTab.value = name
  }
  const setInitTabStatus = (status: boolean) => {
    isInitTab.value = status
  }

  // 刷新页签
  const refreshTab = (tabInfo: TabItemProps) => {
    if (!tabInfo.isShow || (tabInfo?.loadingNum && tabInfo?.loadingNum > 0)) return
    tabInfo.isShow = false

    nextTick().then(() => {
      tabInfo.isShow = true
    })
  }

  // 替换页签
  const replaceTab = (tabInfo: TabItemProps) => {
    const { name } = tabInfo
    const tabIndex = tabList.value.findIndex((tab) => tab.name === name)
    if (tabIndex > 0) {
      tabList.value.splice(tabIndex, 1, tabInfo)
      refreshTab(tabInfo)
    } else {
      tabList.value.push(tabInfo)
    }
    setActiveTab(tabInfo.name)
  }

  // 重新打开已经存在的页签, 没有就添加
  const reOpenTab = (tabInfo: TabItemProps) => {
    const { name } = tabInfo
    const tempObj = tabList.value.find((v) => v.name === name)
    if (!tempObj) {
      tabList.value.push(tabInfo)
    }
    setActiveTab(tabInfo.name)
  }

  // 关闭非激活的页签
  const closeInActiveTab = (name: string) => {
    const tabIndex = tabList.value.findIndex((v) => v.name === name)
    tabList.value.splice(tabIndex, 1)
  }
  // 关闭激活的页签并激活相邻的页签
  const closeActiveTab = () => {
    const tabIndex = tabList.value.findIndex((v) => v.name === activeTab.value)
    const activeTabInfo = tabList.value[tabIndex + 1] || tabList.value[tabIndex - 1]
    tabList.value.splice(tabIndex, 1)
    setActiveTab(activeTabInfo.name)
  }
  // 关闭所有标签
  const closeAllTab = () => {
    tabList.value.splice(1)
    setActiveTab('tab-index')
  }

  // 关闭其他页签
  const closeOtherTab = () => {
    const temp = { ...currentTabInfo.value }

    if (temp.name === 'tab-index') return
    tabList.value = [tabConst.value, currentTabInfo.value as TabItemProps]
  }
  // 重置标签title
  const resetTabTitle = (title: string) => {
    const temp = tabList.value.find((v) => v.name === activeTab.value)
    if (temp) {
      temp.title = title
    }
  }
  // 返回某一个页签
  const backTab = (tabInfo: TabItemProps) => {
    const tabIndex = tabList.value.findIndex((v) => v.name === activeTab.value)
    tabList.value.splice(tabIndex, 1)

    replaceTab(tabInfo)
  }

  // 设置页签loading
  const setCurrentTabLoading = (name: string, loadingStatus: boolean) => {
    const tab = tabList.value.find((t) => t.name === name)

    // 防止正在请求时,关闭页签,组件查找不到
    if (!tab) return

    let tempNum = tab.loadingNum || 0

    if (loadingStatus) {
      tempNum++
    } else {
      tempNum--
    }
    if (tempNum < 0) tempNum = 0
    tab.loadingNum = tempNum
  }
  return {
    tabList: readonly(tabList),
    activeTab: readonly(activeTab),
    isInitTab: readonly(isInitTab),
    currentTabInfo,
    addTab,
    setActiveTab,
    setCurrentTabLoading,
    backTab,
    closeInActiveTab,
    closeActiveTab,
    closeAllTab,
    closeOtherTab,
    resetTabTitle,
    refreshTab,
    replaceTab,
    reOpenTab,
    setInitTabStatus,
  }
})
