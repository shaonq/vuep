## Vue3 Typescript

> Vue2 与 Vue3 区别: Vue2 使用`Options API`而 Vue3 使用的`Composition API`

生命周期钩子变化:

```js
Vue2 ~~~~~~~~~~~ vue3
beforeCreate  -> setup()
created       -> setup()
beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
```

## 路由

```bash
# 安装路由
yarn add vue-router@4
```

在 `src` 文件下新增 `router` 文件夹 => `router.ts` 文件,内容如下:

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'), // 注意这里要带上 文件后缀.vue
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

修改入口文件 `mian.ts` :

> vue-router: `https://next.router.vuejs.org/zh/guide/`

`http.ts` : 用于`axios`封装

```js
//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http

```

`api` : 项目中接口做统一管理，按照模块来划分

在 `api` 文件下新增 `login` 文件夹,用于存放登录模块的请求接口,login 文件夹下分别新增 `login.ts` `types.ts` :

`login.ts`:

```js
import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login(params) {
    return http.post('/login', params)
  },
}
export default loginApi
```

`types.ts`:

```ts
export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
}
```

## 状态管理 pinia

```bash
# 安装
yarn add pinia@next
```

main.ts 中增加

```js
# 引入
import { createPinia } from "pinia"
# 创建根存储库并将其传递给应用程序
app.use(createPinia())
```

在 `src` 文件夹下新增 `store` 文件夹,接在在 store 中新增 `main.ts`

### 创建 `store`, mian.ts :

```js
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mian',
  state: () => ({
    name: '超级管理员',
  }),
})
```

组建中获取 store :

```js
<template>
  <div>{{mainStore.name}}</div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/mian"

const mainStore = useMainStore()

</script>
```

### getters 用法介绍

> Pinia 中的 getter 与 Vuex 中的 getter 、组件中的计算属性具有相同的功能

`store` => `mian.ts`

```js
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mian',
  state: () => ({
    name: '超级管理员',
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length,
  },
})
```

组件中使用:

```js
<template>
  <div>用户名:{{ mainStore.name }}<br />长度:{{ mainStore.nameLength }}</div>
  <hr/>
  <button @click="updateName">修改store中的name</button>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/mian'

const mainStore = useMainStore()

const updateName = ()=>{
  // $patch 修改 store 中的数据
  mainStore.$patch({
    name: '名称被修改了,nameLength也随之改变了'
  })
}
</script>
```

### actions

> 这里与 `Vuex` 有极大的不同，`Pinia` 仅提供了一种方法来定义如何更改状态的规则，放弃 `mutations` 只依靠 `Actions`，这是一项重大的改变。

`Pinia` 让 `Actions` 更加的灵活：

- 可以通过组件或其他 `action` 调用
- 可以从其他 `store` 的 `action` 中调用
- 直接在 `store` 实例上调用
- 支持`同步`或`异步`
- 有任意数量的参数
- 可以包含有关如何更改状态的逻辑（也就是 vuex 的 mutations 的作用）
- 可以 `$patch` 方法直接更改状态属性

```ts
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mian',
  state: () => ({
    name: '超级管理员',
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data
    },
  },
})
```

## vite 常用插件

> 可以查看官方文档：https://vitejs.cn/plugins/
- `@vitejs/plugin-vue` 提供 `Vue 3` 单文件组件支持
- `@vitejs/plugin-vue-jsx` 提供 Vue 3 `JSX` 支持（通过 专用的 Babel 转换插件）
- `@vitejs/plugin-legacy` 为打包后的文件提供传统浏览器`兼容性`支持
- `unplugin-vue-components` 组件的按需自动导入
- `vite-plugin-compression` 使用 gzip 或者 brotli 来压缩资源
- .....