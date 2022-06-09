<template>
  <div class="layout-body">
    <div class="layout-warp">
      <div class="u-flex u-flex--start">
        <div class="u-flex__item is-clamp">
          <div class="u-card" ref="body">
            <router-view></router-view>
          </div>
        </div>
        <!-- 侧边栏目 -->
        <div class="layout-side" ref="el">
          <div class="u-card">
            <div class="u-card__bd" style="padding: 8px 0">
              <router-link class="u-dialog--dropdown-item" v-for="(item, index) in list" :key="index" :to="item.path" v-text="item.name" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const name = 'developer'
export default defineComponent({
  name,
  setup() {
    const route = useRoute()
    const list = route.matched
      .filter((i) => i.name == name)?.[0]
      .children?.filter((i) => i.path !== 'Index')
      .map((item) => {
        return (item.path = `/${name}/${item.path}`), item
      })
    console.log(list)
    return { list }
  },
})
</script>
<style scoped>
.u-dialog--dropdown-item {
  display: block;
  font-size: 14px;
  line-height: 36px;
}
</style>
