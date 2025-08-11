import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ResponseCodeEnum, type ApiResponse, type ErrorResponseData } from './type'
import { handleServerError } from './handle'

// 请求拦截器
export const requestResolve = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 添加时间戳防止缓存
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: Date.now(),
    }
  }
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
