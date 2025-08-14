import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import {
  AccessType,
  BusinessErrorCode,
  type ApiResponse,
  type ServerError,
} from './type'
import { handleBusinessError, handleServerError } from './handle'
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
export const responseResolve = (
  response: AxiosResponse<ApiResponse<unknown>>,
) => {
  // 业务状态码处理
  handleBusinessError(response)
  return response
}

export const responseReject = (error: AxiosError<ServerError>) => {
  handleServerError(error)

  return Promise.reject(error)
}
