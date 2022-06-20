<template>
  <div>
    <div class="u-card">
      <!-- 折线图1 -->
      <div class="u-card__hd">
        <cite class="u-card__title">折线图1</cite>
      </div>
      <div class="u-card__bd">
        <u-chart style="height: 200px" :options="line1" />
      </div>
      <!-- 折线图2 -->
      <div class="u-card__hd">
        <cite class="u-card__title">折线图2</cite>
      </div>
      <div class="u-card__bd" style="background: #21285f">
        <u-chart style="height: 200px" :options="line2" />
      </div>
      <div class="u-card__bd" style="background: #21285f">
        <div id="Qvq" style="height: 500px; position: fixed; bottom: 0; right: 0; left: 0; pointer-events: none; opacity: 0.2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import shaonq from 'shaonq'
import ParticleWave from './base/ParticleWave'
import { defineComponent, ref, reactive, onMounted, onDeactivated } from 'vue'
export default defineComponent({
  setup() {
    let timer
    const line1 = reactive({
      tooltip: { show: true },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            /** array */
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [{ type: 'value' }],
      series: [
        {
          name: '条形图1',
          type: 'line',
          data: [
            /** array */
          ],
          areaStyle: { show: true },
          itemStyle: {
            borderRadius: [0, 5, 5, 0],
            // areaStyle.show = true , graphic.LinearGradient 前四个参数位，右下左上，渐变色网站 https://uigradients.com
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              ['#feac5e', ' #c779d0'].map((color, index) => ({ color, offset: index }))
            ),
          },
        },
      ],
    })
    const line2 = reactive({
      tooltip: { show: true },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: [
            /** array */
          ],
          splitLine: { show: false },
          axisTick: { alignWithLabel: true },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: { lineStyle: { color: 'rgba(250,250,250,0.08)' } },
        },
      ],
      series: [
        {
          name: '折线图2',
          type: 'line',
          data: [
            /** array */
          ],
          itemStyle: {
            color: '#feac5e',
          },
        },
        {
          name: '柱状图2',
          type: 'bar',
          data: [
            /** array */
          ],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: '#c779d0',
          },
        },
      ],
    })
    function createRandom(len = 1, max = 1e4, min = 0) {
      return Array(len)
        .toString()
        .split(',')
        .map(() => (Math.random() * (max - min)) | 0)
    }
    const len20list = ref([])
    function dataInit() {
      if (!len20list.value.length) {
        len20list.value = createRandom(20, 2e4, 1e4)
      }
      len20list.value = len20list.value.slice(1).concat(createRandom(1, 2e4, 1e4))
      line1.xAxis[0].data = len20list
      line1.series[0].data = len20list
      const len10list = len20list.value.slice(0, 10)
      line2.xAxis[0].data = len10list
      line2.series[0].data = len10list
      line2.series[1].data = len20list.value.slice(10)
      timer = setTimeout(dataInit, 5e3)
    }
    onMounted(() => {
      dataInit()
      // 小圆点尺寸
      const pointSize = 8
      const pw = new ParticleWave(document.getElementById('Qvq'), {
        uniforms: {
          size: { type: 'float', value: pointSize },
          field: { type: 'vec3', value: [0, 0, 0] },
          speed: { type: 'float', value: 7 },
        },
        onResize(w, h, dpi) {
          const position = []
          const color = []
          const width = 400 * (w / h)
          const depth = 500
          const height = 7
          const distance = 9
          for (let x = 0; x < width; x += distance) {
            for (let z = 0; z < depth; z += distance) {
              position.push(-width / 2 + x, -30, -depth / 2 + z)
              color.push(0, 0, 0, 1)
            }
          }
          if (this.uniforms) {
            this.uniforms.field = [width, height, depth]
            this.uniforms.size = (h / 400) * pointSize * dpi
          }
          if (this.buffers) {
            this.buffers.position = position
            this.buffers.color = color
          }
        },
      })
    })
    onDeactivated(() => {
      timer && clearTimeout(timer)
    })

    return {
      len20list: [],
      line1,
      line2,
    }
  },
})
</script>
