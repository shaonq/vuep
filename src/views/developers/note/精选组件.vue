<template>
  <div>
    <div class="u-quill-body">
      <h2>nprogress</h2>
      <pre>
desc:
一个进度条加载的插件

install:        
yarn install nprogress

js:
NProgress.configure({ trickle: false });
NProgress.start();
NProgress.done();

github:
https://github.com/rstacruz/nprogress
      </pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import shaonq from 'shaonq'
import { onMounted, onUnmounted } from 'vue'

import useWatermark from './base/useWatermark.js'

// async function loadWaterMark() {
//   await shaonq.loadJs('https://www.mwcxs.top/static/testTool/watermark.js')
//   if (window.watermark)
//     window.watermark.load({
//       watermark_alpha: 0.15,
//       watermark_angle: 20,
//       watermark_color: '#000',
//       watermark_cols: 5,
//       watermark_rows: 5,
//       watermark_font: 'Vedana',
//       watermark_fontsize: '15',
//       watermark_txt: '测试水印，1021002301，测试水印，100101010111101',
//       watermark_x: 0,
//       watermark_y: 0,
//       watermark_width: 300,
//       watermark_height: 240,
//       watermark_x_space: 300,
//       watermark_y_space: 240,
//     })
// }
const { setWatermark, clearWatermark } = useWatermark()
onMounted(() => {
  // loadWaterMark()

  setWatermark('YANYUJIANGNAN')
})
onUnmounted(() => {
  clearWatermark()
})
</script>
