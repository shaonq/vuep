<template>
  <div class="u-quill-body">
    <h1>
      vue3.x
      <br />
    </h1>
    <ul style>
      <li style>
        <a href="https://v3.cn.vuejs.org/api/instance-methods.html#watch">模板文档</a>
      </li>
      <li style>
        <a href="https://v3.cn.vuejs.org/api/composition-api.html#setup">API文档</a>
      </li>
    </ul>
    <pre>
import { defineComponent, ref, computed, onDeactivated } from 'vue'
import shaonq from 'shaonq'
export default defineComponent({
  setup() {
    const time = ref(shaonq.date.today('yyyy-MM-dd HH:mm:ss'))
    const timer = setInterval(() => {
      time.value = shaonq.date.today('yyyy-MM-dd HH:mm:ss')
    }, 1000)
    onDeactivated(() => {
      timer && clearInterval(timer)
    })
    return {
      time,
    }
  },
})
</pre
    >
    <blockquote>demo => {{ time }}</blockquote>
    <h1 style>vue-route@4 路由配置</h1>
    <ul style>
      <li style="line-height: 24px">
        <a href="https://router.vuejs.org/zh/guide/migration/index.html">官方文档</a>
      </li>
    </ul>
    <pre><code class="language-javascript">
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes:[
    { path: '/:pathMatch(.*)*', name: 'not-found', component: import( /**NotFound.vue*/ ) },
  ],
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
   </code> </pre>
    <h1 style>pinia 状态管理</h1>
    <ul style>
      <li style="line-height: 24px">
        <a href="https://pinia.web3doc.top/">中文文档</a>
      </li>
    </ul>
    <pre><code class="language-javascript">
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  actions: {    
    increment() {
      <i style="color: #ff4e20">// 支持 async</i>
      this.count++
    },
  },
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2
    },
    // 返回类型必须明确设置
    doublePlusOne(): number {
      return this.counter * 2 + 1
    },
  }  
})

// page.vue
import { useCounterStore } from '@/stores/counter'
export default {
  setup() {
    <i style="color: #ff4e20">// useCounterStore 必须在 function 内部使用</i>
    const counter = useCounterStore()

    counter.count++
    // 带自动补全 ✨
    counter.$patch({ count: counter.count + 1 })
    // 或使用 action 代替
    counter.increment()
  },
}

   </code> </pre>
    <blockquote>demo => {{ count }} <code class="u-btn u-ml" @click="actionClick">counter.increment()</code></blockquote>
    <h1>END</h1>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onDeactivated } from 'vue'
import { defineStore } from 'pinia'
import shaonq from 'shaonq'
const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  actions: {
    increment() {
      this.count++
    },
  },
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2
    },
  },
})

export default defineComponent({
  setup() {
    const counter = useCounterStore()
    const time = ref(shaonq.date.today('yyyy-MM-dd HH:mm:ss'))
    const timer = setInterval(() => {
      time.value = shaonq.date.today('yyyy-MM-dd HH:mm:ss')
    }, 1000)
    onDeactivated(() => {
      timer && clearInterval(timer)
    })
    return {
      time,
      count: computed(() => counter.count),
      actionClick: () => {
        counter.increment()
      },
    }
  },
})
</script>
