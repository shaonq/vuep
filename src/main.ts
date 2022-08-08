import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store'

const app = createApp(App)

import 'shaonq/scss'
import shaonq from 'shaonq'
;(window as any).shaonq = shaonq
import '@/components/componentQuill/index.scss'

async function bootstrap() {
  app.use(store)
  app.use(router)

  app.mount('#app')
}

bootstrap()
