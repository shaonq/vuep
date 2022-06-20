<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, nextTick, onMounted, watch, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import shaonq from 'shaonq'
import { usePermissionStore } from '@/store'
// import MenuContent from './components/MenuContent'

export default defineComponent({
  components: {
    // MenuContent,
  },
  setup() {
    const permissionStore = usePermissionStore()
    const route = useRoute()
    const { routers: menuRouters } = storeToRefs(permissionStore)
    const sideMenu = computed(() => {
      let newMenuRouters = menuRouters.value
      newMenuRouters.forEach((menu) => {
        if (route.path.indexOf(menu.path) === 0) {
          newMenuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }))
        }
      })
      return newMenuRouters
    })

    console.log(shaonq.clone(sideMenu.value))

    return {
      sideMenu,
    }
  },
})
</script>
