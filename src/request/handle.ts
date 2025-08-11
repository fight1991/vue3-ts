import type { AxiosError, AxiosResponse } from 'axios'
import type { ApiResponse, ErrorResponseData } from './type'

// 服务错误处理
export const handleServerError = (error: AxiosError<ErrorResponseData>) => {
  console.error('请求错误:', error)
  let errorMessage = '网络错误'

  if (error.response) {
    const { status, data } = error.response

    switch (status) {
      case 401:
        errorMessage = '未授权，请重新登录'
        // 处理登录逻辑，例如跳转到登录页面
        break
      case 403:
        errorMessage = '拒绝访问'
        break
      case 404:
        errorMessage = '请求地址出错'
        break
      case 408:
        errorMessage = '请求超时'
        break
      case 500:
        errorMessage = '服务器内部错误'
        break
      case 502:
        errorMessage = '网关错误'
        break
      case 503:
        errorMessage = '服务不可用'
        break
      case 504:
        errorMessage = '网关超时'
        break
      default:
        errorMessage = data?.message || `连接错误${status}`
    }
  } else if (error.request) {
    errorMessage = '网络连接异常'
  } else if (error.code === 'ECONNABORTED') {
    errorMessage = '请求超时'
  } else if (error.code === 'ERR_NETWORK') {
    errorMessage = '网络连接失败'
  } else {
    errorMessage = error.message || '请求失败'
  }
  console.log(errorMessage)
}

export const handleUnauthorized = (): void => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
