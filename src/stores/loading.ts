import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTabStore } from './tab'

export const useLoadingStore = defineStore('loading', () => {
  const isGlobalLoading = ref<boolean>(false) //是否进入后台管理页面, 是的话设置适当的loading范围
  const loadingNum = ref<number>(0)
  const isLoading = computed(() => loadingNum.value > 0)
  const toggleGlobalLoading = (status: boolean) => {
    isGlobalLoading.value = status
  }
  const setLoadingCounter = (mode: 'increase' | 'decrease') => {
    if (mode === 'increase') {
      loadingNum.value += 1
    } else {
      let num = loadingNum.value - 1
      if (num < 0) {
        num = 0
      }
      loadingNum.value = num
    }
  }

  // 开启/关闭loading
  const setLoadingStatus = (mode: 'open' | 'close', tabId: string, globalLoading: boolean) => {
    // 页签组件的loading
    if (globalLoading) {
      // 全局loading
      toggleGlobalLoading(mode === 'open')
    } else {
      const tabStore = useTabStore()

      if (tabStore.activeTab !== 'tab-index') {
        tabStore.setCurrentTabLoading(tabId, mode === 'open')
      }
    }
  }

  return {
    isGlobalLoading,
    toggleGlobalLoading,
    loadingNum,
    setLoadingCounter,
    isLoading,
    setLoadingStatus,
  }
})
