import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', () => {
  const tabList = ref([])

  return { tabList }
})
