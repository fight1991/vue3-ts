import type { Component } from 'vue'

export interface Meta {
  permission?: string
  title?: string
  component?: Component
}
export interface RoutePath {
  iconName?: string
  path: string
  name?: string
  hidden?: boolean
  meta?: Meta
  component?: Component
  children?: RoutePath[]
}
export interface TabItemProps<T = Record<string, unknown>, Y = Record<string, unknown>> {
  title: string
  name: string
  isShow: boolean
  components: Component[]
  query?: T
  params?: Y
  loadingNum?: number
}
