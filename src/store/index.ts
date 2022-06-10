import { defineStore } from 'pinia'

export const useIndexStore = defineStore({
  id: 'main',
  state: () => ({
    name: 'pinia',
    token: 'SYS_TOKEN',
  }),
  getters: {},
  actions: {},
})
