import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store'

const app = createApp(App)

import './permission'

/**
 * unplugin-vue-components auto push
 * import Components from './components/index'
 * app.use(Components)
 * 这里是因为我的组件里面的scss我全局使用
 */
import Components from './components/index'
app.use(Components)

app.use(store)
app.use(router)

app.mount('#app')
