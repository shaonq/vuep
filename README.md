## Vue3 Typescript

生命周期钩子变化:

```js
Vue2 ~~~~~~~~~~~ vue3
beforeCreate  -> setup()
created       -> setup()
...
mounted       -> onMounted
deactivated   -> onDeactivated
```

## 路由

```bash
# 安装路由
yarn add vue-router@4
```

在 `src` 文件下新增 `router` 文件夹 => `router.ts` 文件,内容如下:

```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: { title: 404 },
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```

## vite 常用插件

- `@vitejs/plugin-vue` 提供 `Vue 3` 单文件组件支持
- `@vitejs/plugin-vue-jsx` 提供 Vue 3 `JSX` 支持（通过 专用的 Babel 转换插件）
- `@vitejs/plugin-legacy` 为除 IE 之外的浏览器提供`兼容性`支持
- `vite-plugin-mock` `Mock`支持
- `vite-plugin-compression` 开启 gzip 压缩
- `unplugin-vue-components` (Ant Design Vue 、 Element Plus、TDesign 等组件自动按需引用 )
- `vite-plugin-vue-setup-extend` 提供 template setup 语法糖
- .....
