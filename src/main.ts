import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store'
import Components from './components/index'

const app = createApp(App)

import './permission'

app.use(Components)
app.use(store)
app.use(router)

app.mount('#app')
