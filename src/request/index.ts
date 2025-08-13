import { useTabStore } from '@/stores/tab'
import httpClient from './httpClient'
import type { RequestOptions } from './type'
import { useLoadingStore } from '@/stores/loading'
import type { AxiosRequestConfig } from 'axios'

const tabStore = useTabStore()
const loadingStore = useLoadingStore()
const resolveFetch = async <T, D>(params: RequestOptions<T>, reqConfig: AxiosRequestConfig) => {
  const tabName = tabStore.currentTabInfo.name
  const { tabLoading, globalLoading } = params
  const loadingStatus = globalLoading || loadingStore.isGlobalLoading

  if (tabLoading) {
    loadingStore.setLoadingStatus('open', tabName, loadingStatus)
  }
  try {
    const response = await httpClient.request<D>(reqConfig)

    return response
  } catch (error) {
    throw error
  } finally {
    if (tabLoading) {
      loadingStore.setLoadingStatus('close', tabName, loadingStatus)
    }
  }
}
// GET请求
export const get = <T = unknown, D = unknown>(params: RequestOptions<T>) => {
  return resolveFetch<T, D>(params, {
    method: 'GET',
    url: params.url,
    params: params,
  })
}
// POST请求
export const post = <T, D>(params: RequestOptions<T>) => {
  return resolveFetch<T, D>(params, {
    method: 'POST',
    url: params.url,
    data: params,
  })
}

interface Req {
  name: string
}
interface Res {
  res: string
}
const test = (params: Req): Promise<Res> => {
  return get({ url: '/test', data: params, tabLoading: false, globalLoading: false })
}

test({ name: 'example' }).then((res) => {
  console.log(res.res)
})
