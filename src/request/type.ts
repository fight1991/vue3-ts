export interface RequestOptions<T> {
  url: string
  data: T
  tabLoading: boolean
  globalLoading: boolean
}
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  success: boolean
}

export interface PaginationResponse<T> {
  page: number
  size: number
  total: number
  list: Array<T>
}

export interface PaginationRequest {
  page: number
  size: number
}
export interface UploadOptions {
  file: File
  onProgress?: (percent: number) => void
  data?: Record<string, unknown>
}
export enum ResponseCodeEnum {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
// 定义错误响应数据类型
export interface ErrorResponseData {
  message?: string
  code?: number
  errors?: string[]
}
