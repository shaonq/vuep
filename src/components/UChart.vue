<template>
  <div ref="dom" style="height: 100%"></div>
</template>

<script>
// echarts 5.0
import * as echarts from 'echarts'
const theme = {
  // 颜色
  color: ['#1890FF', '#36CBCB', '#4ECB73', '#FBD437', '#F2637B', '#975FE5'],
  backgroundColor: 'rgba(252,252,252,0)',
  textStyle: {},
  // 区域
  grid: { top: '4%', left: '2%', right: '2%', bottom: '2%', containLabel: true },
  // 标题
  title: {
    textStyle: {
      color: '#666666',
    },
    subtextStyle: {
      color: '#999999',
    },
  },
  line: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      normal: {
        width: '3',
      },
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: true,
  },
  radar: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      normal: {
        width: '3',
      },
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc',
    },
    barMaxWidth: '50%',
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  candlestick: {
    itemStyle: {
      color: '#e6a0d2',
      color0: 'transparent',
      borderColor: '#e6a0d2',
      borderColor0: '#1890FF',
      borderWidth: '2',
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
    lineStyle: {
      normal: {
        width: '1',
        color: '#cccccc',
      },
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
    color: ['#1890FF', '#36CBCB', '#4ECB73', '#FBD437', '#F2637B', '#975FE5'],
    label: {
      color: '#ffffff',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#eeeeee',
      borderColor: '#aaaaaa',
      borderWidth: 0.5,
    },
    label: {
      color: '#ffffff',
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#eeeeee',
      borderColor: '#aaaaaa',
      borderWidth: 0.5,
    },
    label: {
      color: '#ffffff',
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    // 竖：分割线颜色
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    // 横：分割线
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
  },
  legend: {
    textStyle: {
      color: '#999999',
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#ffffff',
        width: 1,
      },
      crossStyle: {
        color: '#ffffff',
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#4ECB73',
      width: 1,
    },
    itemStyle: {
      color: '#4ECB73',
      borderWidth: 1,
    },
    controlStyle: {
      color: '#4ECB73',
      borderColor: '#4ECB73',
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: '#1890FF',
      borderColor: 'rgba(63,177,227,0.15)',
    },
    label: {
      color: '#4ECB73',
    },
  },
  visualMap: {
    color: ['#1890FF', '#afe8ff'],
  },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(222,222,222,1)',
    fillerColor: 'rgba(114,230,212,0.25)',
    handleColor: '#cccccc',
    handleSize: '100%',
    textStyle: {
      color: '#999999',
    },
  },
  markPoint: {
    label: {
      color: '#ffffff',
    },
  },
}
echarts.registerTheme('u-theme', theme)
export default {
  name: 'UChart',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
    renderer: {
      type: String,
      default: 'canvas', // canvas|svg
    },
    theme: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      chart: null,
      timer: false,
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.updateOptions()
      },
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.dom, this.theme || theme, { renderer: this.renderer })
    this.updateOptions()
  },
  methods: {
    updateOptions() {
      this.timer && clearTimeout(this.timer)
      if (this.chart) {
        if (Array.isArray(this.options)) {
          let idx = 0
          const len = this.options.length
          const loop = () => {
            // console.log(idx, len)
            this.chart.setOption(this.options[idx])
            idx++
            console.log(idx)
            if (idx >= len) {
              return
            }
            const time = this.options[idx - 1]?.series?.animationDurationUpdate || 500
            this.timer = setTimeout(loop, time)
          }
          loop()
        } else {
          this.chart.setOption(this.options)
        }
      }
    },
  },
}
</script>
<style lang="scss"></style>
