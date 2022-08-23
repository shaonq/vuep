<template>
  <div>
    <div class="u-quill-body">
      <h2>nprogress</h2>
      <pre>
desc:
网页顶部进度条加载的插件

install: 
yarn add nprogress

js: <a class="u-btn u-btn--blue u-btn--small" @click="runJs('demo1')">runJs</a>
<code id="demo1">
  async function runJs() {
  if (!window.NProgress){
    await shaonq.loadJs('https://unpkg.com/nprogress@0.2.0/nprogress.js')
    await shaonq.loadCss('https://unpkg.com/nprogress@0.2.0/nprogress.css')
  }  
  if (window.NProgress){
    NProgress.start();
    setTimeout(function(){  NProgress.done();},2000)
  }
}
runJs()
</code>

github:
https://github.com/rstacruz/nprogress
      </pre>
      <h2>watermark-dom</h2>
      <pre>
desc:
网页水印插件

install:
yarn add watermark-dom

js: <a class="u-btn u-btn--blue u-btn--small" @click="runJs('demo2')">runJs</a>
<code id="demo2">
async function runJs() {
  if (!window.watermark){
    await shaonq.loadJs('https://unpkg.com/watermark-dom@2.2.0/index.js')
  }  
  if (window.watermark){
     watermark.load({
        watermark_alpha: 0.6,
        watermark_angle: 24,
        watermark_font: 'Vedana',
        watermark_fontsize: '24',
        watermark_txt: '示例:YANYUJIANGNAN',
        watermark_width: 300,
        watermark_height: 240,
      })
     setTimeout(function(){ watermark.remove()},2000)
  }
}
runJs()
</code>
github:
https://github.com/saucxs/watermark-dom
      </pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import shaonq from 'shaonq'

import { onMounted, onUnmounted } from 'vue'

import useWatermark from './base/useWatermark.js'

const { setWatermark, clearWatermark } = useWatermark()
onMounted(() => {
  setWatermark('YANYUJIANGNAN')
})

const runJs = (id) => {
  try {
    new Function(document.getElementById(id)?.innerHTML)()
  } catch (error) {
    shaonq.toast('runJs Error')
  }
}

onUnmounted(() => {
  clearWatermark()
})
</script>
