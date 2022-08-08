import { defineStore } from 'pinia'
import { NotificationItem } from '@/interface'

const msgData = [{ id: '1', content: '', type: '', status: true, collected: false, date: '', quality: '' }]

type MsgDataType = typeof msgData

export const useNotificationStore = defineStore('notification', {
  state: () => ({ msgData }),
  getters: {
    unreadMsg: (state) => state.msgData.filter((item: NotificationItem) => item.status), // 未读
    readMsg: (state) => state.msgData.filter((item: NotificationItem) => !item.status), // 已读
  },
  actions: {
    setMsgData(data: MsgDataType) {
      this.msgData = data
    },
  },
})
