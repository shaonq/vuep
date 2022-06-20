import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//** 中文转码 */
const toUnicode = (string = '', prefix = '') =>
  string
    .replace(/\s/g, '')
    .split('')
    .map((o) => (/[\u4e00-\u9fa5]/.test(o) ? prefix + o.charCodeAt(0).toString(16) : o))
    .join('')
/** 生成此网址演示路由 */
type vuePath = { [key: string]: any }
const vuePaths: vuePath = import.meta.glob('../views/*/*.vue')
const vuePathNames: string[] = ['developer', 'docs']
const vueRouters = vuePathNames.map((path) => {
  // 读取对应目录路由
  const keys = Object.keys(vuePaths).filter((i) => ~i.indexOf(`/views/${path}/`)) // && !~i.indexOf('Index.vue')
  const list: vuePath[] = keys
    .map((name: string) => {
      const _name = name.split('/').slice(-1)[0].slice(0, -4)
      return {
        path: toUnicode(_name),
        name: _name,
        component: vuePaths[name],
      }
    })
    .reverse()
  // 根据 Index 分类
  let component
  const children = list
    .filter((i) => {
      const is = i.path === 'Index'
      if (is) {
        component = i.component
      }
      return ~is
    })
    .map((item, index) => {
      index || (item.path = '')
      item.meta = { title: item.name }
      return item
    })
  return {
    path,
    name: path,
    component,
    children,
  }
}) as RouteRecordRaw[]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/docs',
    component: () => import('@/views/Layout.vue'),
    children: [
      ...vueRouters,
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
      },
      { path: '/:pathMatch(.*)*', name: '404', meta: { title: 404 }, component: () => import('@/views/404.vue') },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
})

const asyncRouterList: RouteRecordRaw[] = []
export { asyncRouterList }

export default router
