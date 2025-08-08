import { ref, computed, nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { TabItemProps } from '@/types'
const defaultTab: TabItemProps = {
  title: '首页',
  name: 'tab-index',
  isShow: true,
  components: [],
  query: {},
  params: {},
  loadingNum: 0,
}

export const useTabStore = defineStore('tab', () => {
  const tabList = ref<TabItemProps[]>([])
  const tabConst = ref<TabItemProps>(defaultTab)
  const activeTab = ref<string>('tab-index')

  const currentTabInfo = computed(() => tabList.value.find((tab) => tab.name === activeTab.value))

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

  // 刷新页签
  const refreshTab = (tabInfo: TabItemProps) => {
    if (!tabInfo.isShow || (tabInfo?.loadingNum && tabInfo?.loadingNum > 0)) return
    tabInfo.isShow = false

    nextTick(() => {
      tabInfo.isShow = true
    })
    const tab = tabList.value.find((t) => t.name === tabInfo.name)
    if (tab) {
      tab.loadingNum = (tab.loadingNum || 0) + 1
    }
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

  // 重新打开已经存在的页签
  const reOpenTab = (tabInfo: TabItemProps) => {
    const { name } = tabInfo
    const tempObj = tabList.value.find((v) => v.name === name)
    if (!tempObj) {
      tabList.value.push(tabInfo)
    }
  }

  // 关闭非激活的页签
  const closeInActiveTab = (tabInfo: TabItemProps) => {
    const tabIndex = tabList.value.findIndex((v) => v.name === tabInfo.name)
    tabList.value.splice(tabIndex, 1)
  }
  // 关闭激活的页签并激活相邻的页签
  const closeActiveTab = (tabInfo: TabItemProps) => {
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
  const closeOtherTab = (tabInfo: TabItemProps) => {
    const temp = { ...currentTabInfo.value }
    tabList.value.splice(1)
    if (temp.name === 'tab-index') return
    tabList.value.push(tabConst.value)
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

  // 添加页签
  const appendTab = (tabInfo: TabItemProps) => {
    reOpenTab(tabInfo)
    setActiveTab(tabInfo.name)
  }
  // 设置页签loading
  const setCurrentTabLoading = (name: string, loadingStatus: boolean) => {
    const tab = tabList.value.find((t) => t.name === name)
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
    tabList,
    activeTab,
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
  }
})
