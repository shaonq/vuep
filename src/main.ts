import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
const app = createApp(App)

// add component
import Components from './components/index'
app.use(Components)

app.use(router)

app.use(createPinia())

import { useIndexStore } from './store/index'
router.beforeEach((to, from, next) => {
  // Must be used within the function!
  const indexStore = useIndexStore()
  if (indexStore.token) next()
  else
    next('/login')
    // update title
  ;(document as any).title = `${to.meta?.title || '首页'} - 烟雨江南`
})

app.mount('#app')
