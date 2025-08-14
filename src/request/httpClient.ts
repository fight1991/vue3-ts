import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { requestReject, requestResolve, responseReject, responseResolve } from './interceptors'
import { AccessType, type ApiResponse } from './type'
import { getLanguage, getTimeOffsetInfo } from '@/utils'
interface HttpClientConfig {
  baseURL: string
  proxyHead: string
  timeout: number
}

class HttpClient {
  private static instance: HttpClient
  private axiosInstance: AxiosInstance

  private constructor(config: HttpClientConfig) {
    // 创建axios实例
    // 接口地址拼接/api, 开发环境中设置代理时用
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.NODE_ENV === 'development' ? config.proxyHead : config.baseURL,
      timeout: config.timeout || 15000,
      headers: {
        AccessType: AccessType.WEB,
        ClientTimeZone: getTimeOffsetInfo(),
        Language: getLanguage(),
      },
    })
    this.axiosInstance.interceptors.request.use(requestResolve, requestReject)
    this.axiosInstance.interceptors.response.use(responseResolve, responseReject)
  }
  // 获取单例实例
  public static getInstance(config: HttpClientConfig): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config)
    }
    return HttpClient.instance
  }

  // 获取axios实例
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }
  // 取消请求的方法
  public createCancelToken() {
    return axios.CancelToken.source()
  }

  // 通用请求方法
  public async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance(config)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// 导出单例实例
const httpClient = HttpClient.getInstance({
  baseURL: import.meta.env.VITE_API_URL || '',
  proxyHead: '/api',
  timeout: 15000,
})
export default httpClient
