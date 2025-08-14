import type { AxiosError } from 'axios'

export enum BusinessErrorCode {
  SUCCESS = '0000', // 成功
  BUSINESS_ERROR = '0001', // 业务异常
  UNAUTHORIZED = '0002', // 用户认证失败（token无效）
  MISSING_PARAMETER = '0003', // 必要的请求参数缺失
  FORBIDDEN = '0004', // 权限认证失败
  REQUEST_TOO_LARGE = '0007', // 请求体过大
  REQUEST_HEADER_TOO_LARGE = '0008', // 请求头过大
  REQUEST_TOO_FREQUENT = '0009', // 请求频率过快
  SERVER_ERROR = '9999', // 服务端系统异常
}

// 定义错误响应数据类型
export interface ServerError {
  message?: string
  code?: number
  errors?: string[]
}

export interface UploadOptions {
  file: File
  onProgress?: (percent: number) => void
  data?: Record<string, unknown>
}

export enum AccessType {
  WEB = 'web', // Web端
  MINIAPP = 'applet', // 小程序
  APP = 'app', // App
  OTHER = 'other', // 其他
}

export interface Pagination {
  pageIndex: number
  pageSize: number
}

export interface RequestOptions<T> {
  url: string
  data: T
  tabLoading?: boolean
  globalLoading?: boolean
}
export interface WithPage<T> {
  data: T
  page: Pagination
}

// API ResponseData
export interface ApiResponse<R> {
  code: BusinessErrorCode
  data: R
  page?: Pagination
  message: string
  messageCode: string
}

export interface Result<R> {
  data?: R
  page?: Pagination
  other?: ApiResponse<R>
  error?: AxiosError
}
