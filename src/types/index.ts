import type { Component } from 'vue'
import type { LocationQueryRaw, RouteParamsRawGeneric } from 'vue-router'

export interface Meta {
  permission?: string
  title: string
  component?: Component
}
export interface RoutePath {
  iconName?: string
  path: string
  name: string
  hidden?: boolean
  meta?: Meta
  component?: Component
  children?: RoutePath[]
}
export interface TabItemProps {
  title: string
  name: string
  isShow: boolean
  components: Component[]
  query?: LocationQueryRaw
  params?: RouteParamsRawGeneric
  loadingNum?: number
}
