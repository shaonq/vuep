import { createRouter, useRoute, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import developersRouters from './modules/developers'

export const asyncRouterList: Array<RouteRecordRaw> = [...developersRouters]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/developers',
  },
  ...asyncRouterList,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
]
export const getActive = (maxLevel = 3): string => {
  const route = useRoute()
  if (!route.path) {
    return ''
  }
  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('')
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
