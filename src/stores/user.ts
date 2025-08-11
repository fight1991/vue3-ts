import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isFirst = ref<boolean>(true) //是否是第一次进入系统
  const token = ref<string>('') //用户token
  const permissions = ref<string[]>([]) //用户权限列表
  const userInfo = reactive({
    name: '',
    avatar: '',
    email: '',
    role: '',
    userId: '',
  })
  const setFirstStatus = (status: boolean) => {
    isFirst.value = status
  }

  const setToken = (newToken: string) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
    sessionStorage.removeItem('token')
  }
  return {
    isFirst,
    token,
    setFirstStatus,
    setToken,
    removeToken,
    permissions,
    userInfo,
  }
})
