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
        <div class="layout-side" ref="el">
          <div class="u-card">
            <div class="u-card__hd"><span style="font-size: 15px">文章列表</span></div>
            <div class="u-card__bd" style="padding: 8px 0">
              <router-link custom v-slot="{ href, navigate, route, isExactActive }" v-for="(item, index) in list" :key="index" :to="item.path">
                <a draggable="false" class="u-dialog--dropdown-item" :class="{ 'is-active': isExactActive }" :href="href" @click="navigate"> {{ route.name }} </a>
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
import shaonq from 'shaonq'
const name = 'docs'
export default defineComponent({
  name,
  setup() {
    const route = useRoute()
    const list = Object.assign([], route.matched)
      .filter((i) => i.name == name)?.[0]
      .children?.filter((i) => i.path !== 'Index')
      .map((item) => {
        if (!~item.path.indexOf(`/${name}/`)) item.path = `/${name}/${item.path}`
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
