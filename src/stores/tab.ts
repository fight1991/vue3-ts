import { ref, computed, nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { TabItemProps } from '@/types'
const defaultTab = {
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
  }

  // 打开存在页签的
  const reOpenTab = (tabInfo: TabItemProps) => {
    const { name } = tabInfo
    const tempObj = tabList.value.find((v) => v.name === name)
    if (!tempObj) {
      tabList.value.push(tabInfo)
    }
  }

  return { tabList, activeTab, currentTabInfo, addTab, setActiveTab }
})
