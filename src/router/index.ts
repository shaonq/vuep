import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import developersRouters from './modules/developers'
console.log(developersRouters)

export const asyncRouterList: Array<RouteRecordRaw> = [...developersRouters]
// //** 中文转码 */
// const toUnicode = (string = '', prefix = '') =>
//   string
//     .replace(/\s/g, '')
//     .split('')
//     .map((o) => (/[\u4e00-\u9fa5]/.test(o) ? prefix + o.charCodeAt(0).toString(16) : o))
//     .join('')
// /** 生成此网址演示路由 */
// type vuePath = { [key: string]: any }
// // note component
// const demoPaths: vuePath = import.meta.glob('../views/demo/*/*.vue')
// const demoPathNames: string[] = ['component', 'note']
// const vueRouters = demoPathNames.map((path) => {
//   // 读取对应目录路由
//   const keys = Object.keys(demoPaths).filter((i) => ~i.indexOf(`/views/demo/${path}/`)) // && !~i.indexOf('Index.vue')
//   const list: vuePath[] = keys
//     .map((name: string) => {
//       const _name = name.split('/').slice(-1)[0].slice(0, -4)
//       return {
//         path: toUnicode(_name),
//         name: _name,
//         component: demoPaths[name],
//       }
//     })
//     .reverse()
//   // 根据 Index 分类
//   let component
//   const children = list
//     .filter((i) => {
//       const is = i.path === 'Index'
//       if (is) {
//         component = i.component
//       }
//       return ~is
//     })
//     .map((item, index) => {
//       index || (item.path = '')
//       item.meta = { title: item.name }
//       return item
//     })
//   return {
//     path,
//     name: path,
//     component,
//     children,
//   }
// }) as RouteRecordRaw[]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/developers/note',
  },
  ...asyncRouterList,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
})

export default router
