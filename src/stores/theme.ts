import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export interface ThemeConfig {
  key: string
  name: string
  primaryColor: string
}

const themeOptions: ThemeConfig[] = [
  {
    key: 'default',
    name: '默认蓝色',
    primaryColor: '#1890ff',
  },
  {
    key: 'green',
    name: '清新绿色',
    primaryColor: '#52c41a',
  },
  {
    key: 'purple',
    name: '优雅紫色',
    primaryColor: '#722ed1',
  },
  {
    key: 'orange',
    name: '活力橙色',
    primaryColor: '#fa8c16',
  },
  {
    key: 'dark',
    name: '深色主题',
    primaryColor: '#177ddc',
  },
]

export const useThemeStore = defineStore('theme', () => {
  // State

  const themeToken = reactive({
    colorPrimary: themeOptions[0].primaryColor,
    borderRadius: 2,
  })
  const themeOptionsList = computed(() => themeOptions)
  const setThemeColor = (theme: string) => {
    themeToken.colorPrimary = theme
  }
  return {
    themeToken,
    setThemeColor,
    themeOptionsList,
  }
})
