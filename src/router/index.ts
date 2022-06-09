import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
  const list: vuePath[] = keys.map((name: string) => {
    let _name = name.split('/').slice(-1)[0].slice(0, -4)
    return {
      path: toUnicode(_name),
      name: _name,
      component: vuePaths[name],
    }
  })
  // 根据 Index 分类
  let component
  const children = list.filter((i) => {
    let is = i.path === 'Index'
    if (is) component = i.component
    return ~is
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
    component: () => import('@/views/Layout.vue'),
    children: [...vueRouters, { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/404.vue') }],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
