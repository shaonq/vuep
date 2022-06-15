import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { getPermissionStore, getUserStore } from '@/store'
import router from '@/router'

const permissionStore = getPermissionStore()
const userStore = getUserStore()

NProgress.configure({ showSpinner: false })

const { whiteListRouters } = permissionStore

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const { token } = userStore
  if (token) {
    if (to.path === '/login') {
      userStore.logout()
      permissionStore.restore()
      next()
      return
    }

    ;(document as any).title = `${to.meta?.title || '首页'} - 烟雨江南`

    const { roles } = userStore

    if (roles && roles.length > 0) {
      next()
    } else {
      try {
        await userStore.getUserInfo()

        const { roles } = userStore

        await permissionStore.initRoutes(roles)

        if (router.hasRoute(to.name as string)) {
          next()
        } else {
          next(`/`)
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
