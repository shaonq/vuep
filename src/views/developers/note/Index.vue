<template>
  <div class="layout-body">
    <div class="layout-warp">
      <div class="u-flex u-flex--start">
        <div class="u-flex__item is-clamp">
          <div class="u-card">
            <router-view></router-view>
          </div>
        </div>
        <!-- 侧边栏目 -->
        <div ref="el" class="layout-side">
          <div class="u-card">
            <div class="u-card__hd"><span style="font-size: 15px">文章列表</span></div>
            <div class="u-card__bd" style="padding: 8px 0">
              <router-link v-for="(item, index) in list" v-slot="{ href, navigate, isExactActive }" :key="index" custom :to="item.path">
                <a draggable="false" class="u-dialog--dropdown-item" :class="{ 'is-active': isExactActive }" :href="href" @click="navigate"> {{ item.name }} </a>
              </router-link>
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
const name = 'note'
export default defineComponent({
  name,
  setup() {
    const route = useRoute()
    const list = Object.assign([], route.matched)
      .filter((i) => {
        return i.name === name
      })?.[0]
      .children?.filter((i) => i.path !== 'Index')
      .map((item) => {
        if (!~item.path.indexOf(`/developers/${name}/`)) {
          item.path = `/developers/${name}/${item.path}`
        }
        return item
      })
    return { list }
  },
})
</script>
<style scoped>
.u-dialog--dropdown-item {
  display: block;
  font-size: 14px;
  line-height: 34px;
  transition: 300ms;
}
</style>
