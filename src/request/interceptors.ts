import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { AccessType, ResponseCodeEnum, type ApiResponse, type ErrorResponseData } from './type'
import { handleServerError } from './handle'
import { useAttrs } from 'vue'
import { useUserStore } from '@/stores/user'
import { getLanguage, getTimeOffsetInfo } from '@/utils'

// 请求拦截器
export const requestResolve = (config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()

  config.headers['Authorization'] = userStore.token

  return config
}
export const requestReject = (error: unknown) => {
  console.error('请求错误:', error)
  return Promise.reject(error)
}

// 响应拦截器
export const responseResolve = (response: AxiosResponse<ApiResponse<unknown>>) => {
  const { data } = response

  // 业务状态码处理
  if (data.code === ResponseCodeEnum.SUCCESS) {
    return response
  }
  // 其他业务报错处理
  return response
}

export const responseReject = (error: AxiosError<ErrorResponseData>) => {
  console.error('响应错误:', error)

  handleServerError(error)

  return Promise.reject(error)
}
