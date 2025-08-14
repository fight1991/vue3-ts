import { useTabStore } from '@/stores/tab'
import httpClient from './httpClient'
import {
  BusinessErrorCode,
  type ApiResponse,
  type Pagination,
  type RequestOptions,
  type Result,
  type WithPage,
} from './type'
import { useLoadingStore } from '@/stores/loading'
import type { AxiosRequestConfig } from 'axios'

const tabStore = useTabStore()
const loadingStore = useLoadingStore()
const resolveFetch = async <T, R>(
  params: RequestOptions<T>,
  reqConfig: AxiosRequestConfig,
) => {
  const tabName = tabStore.currentTabInfo.name
  const { tabLoading = true, globalLoading } = params
  const loadingStatus = globalLoading || loadingStore.isGlobalLoading

  if (tabLoading) {
    loadingStore.setLoadingStatus('open', tabName, loadingStatus)
  }
  try {
    const response = await httpClient.request<ApiResponse<R>>(reqConfig)
    if (response.code === BusinessErrorCode.SUCCESS) {
      return { data: response.data, page: response.page } as Result<R>
    }
    return { other: response } as Result<R>
  } catch (error) {
    console.error('请求异常:', error)
    return { error: error as unknown } as Result<R>
  } finally {
    if (tabLoading) {
      loadingStore.setLoadingStatus('close', tabName, loadingStatus)
    }
  }
}

// GET请求
export const httpGet = <T = unknown, R = unknown>(
  params: RequestOptions<T>,
) => {
  return resolveFetch<T, R>(params, {
    method: 'GET',
    url: params.url,
    params: params.data,
  })
}
// POST请求
export const httpPost = <T, R = unknown>(params: RequestOptions<T>) => {
  return resolveFetch<T, R>(params, {
    method: 'POST',
    url: params.url,
    data: params.data,
  })
}

const test = () => {
  httpPost({
    url: '/test',
    data: {
      key: 'value',
    },
  }).catch((err) => {
    console.error(err)
  })
}
