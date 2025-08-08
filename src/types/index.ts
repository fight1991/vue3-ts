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
  children?: RoutePath[]
}
