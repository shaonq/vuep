import { RouteRecordName } from 'vue-router'

/** res code */
export interface ResDataType {
  code: number
  data: any
  msg?: any
}

/** router object */
export interface MenuRoute {
  path: string
  title?: string
  icon?: string | { render: () => void }
  redirect?: string
  children: MenuRoute[]
  meta: any
}

export type ClassName = { [className: string]: any } | ClassName[] | string

/** comm obj  */
export type CommonObjType = {
  [key: string]: string | number
}

/** comm notification */
export interface NotificationItem {
  id: string
  content: string
  type: string
  status: boolean
  collected: boolean
  date: string
  quality: string
}

/** router obj */
export interface TRouterInfo {
  path: string
  routeIdx?: number
  title?: string
  name?: RouteRecordName
  isAlive?: boolean
  isHome?: boolean
}

export interface TTabRouterType {
  isRefreshing: boolean
  tabRouterList: Array<TRouterInfo>
}
