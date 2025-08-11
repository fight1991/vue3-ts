import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { requestReject, requestResolve, responseReject, responseResolve } from './interceptors'
import type { ApiResponse } from './type'

class HttpClient {
  private static instance: HttpClient
  private axiosInstance: AxiosInstance
  private constructor() {
    // 创建axios实例
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    this.axiosInstance.interceptors.request.use(requestResolve, requestReject)
    this.axiosInstance.interceptors.response.use(responseResolve, responseReject)
  }
  // 获取单例实例
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
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
      const response: ApiResponse<T> = await this.axiosInstance(config)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// 导出单例实例
const httpClient = HttpClient.getInstance()
export default httpClient
