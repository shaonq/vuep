import { createPinia } from 'pinia'

const store = createPinia()

export { store }

export * from './modules/notification'
export * from './modules/tabs-router'

export default store
