import type { AxiosError, AxiosResponse } from 'axios'
import { BusinessErrorCode, type ApiResponse, type ServerError } from './type'
import { message, message as messageApi } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

class ShowMessageOnce {
  private messagesList: string[] = []
  constructor() {}
  showMsg = (msg: string) => {
    const msgIndex = this.messagesList.indexOf(msg)
    if (msgIndex >= 0) return
    this.messagesList.push(msg)
    message.error({
      content: msg,
      duration: 2,
      onClose: () => {
        this.messagesList.splice(msgIndex, 1)
      },
    })
  }
}
const messageOnceInstance = new ShowMessageOnce()
// http状态码错误处理
export const handleServerError = (error: AxiosError<ServerError>) => {
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
  messageOnceInstance.showMsg(errorMessage)
}
// 处理http200时的业务错误
export const handleBusinessError = (
  response: AxiosResponse<ApiResponse<unknown>>,
) => {
  const { code, message } = response.data
  if (code !== BusinessErrorCode.SUCCESS) {
    // token不合法的报错
    if (code === BusinessErrorCode.UNAUTHORIZED) {
      messageOnceInstance.showMsg(message || '登录状态已过期，请重新登录')
      // message只提示一次

      const route = useRoute()
      const router = useRouter()

      const targetUrl =
        route.fullPath || location.pathname + location.search || ''

      router.replace({
        path: '/login',
        query: { targetUrl },
      })
    } else {
      // 其他业务报错
      messageOnceInstance.showMsg(message)
    }
  }
}
