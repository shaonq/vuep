import type { EChartsOption } from 'echarts'
// Parliament chart

const pieData = [
  { value: 40, name: 'A' },
  { value: 32, name: 'B' },
  { value: 28, name: 'C' },
  { value: 24, name: 'D' },
  { value: 19, name: 'E' },
  { value: 15, name: 'F' },
  { value: 12, name: 'G' },
  { value: 10, name: 'H' },
]

const fov = 800 //pixels are 300px away from us
function project3dcoords(x: number, y: number, z: number, w: number, h: number) {
  // https://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript
  //calculating 2d position for 3d coordinates
  //fov = field of view = denotes how far the pixels are from us.
  //the scale will control how the spacing between the pixels will decrease with increasing distance from us.
  const scale = fov / (fov + z)
  return [x * scale + w / 2, y * scale + h / 2]
}

function get3dcoords(m: number, n: number, elapsedTime: number) {
  const x = (m - grid / 2) * 100
  const y = Math.sin(m / 5 + elapsedTime) * Math.cos(n / 5 + elapsedTime) * 50 + 300
  const z = (grid - n) * 80
  return [x, y, z]
}

const randData: { dist: number; groupId: string; value: number[] }[] = []
const grid = 30
for (let i = 0; i < grid; i++) {
  for (let k = 0; k < grid; k++) {
    const x = Math.random()
    const y = Math.random()
    randData.push({
      value: [x, y, Math.random()],
      dist: Math.round(y * 1000) + x,
      groupId: pieData[Math.round(Math.random() * (pieData.length - 1))].name,
    })
  }
}

randData.sort((a, b) => a.dist - b.dist)

const waveOption: EChartsOption[] = [
  // explosion
  {
    series: {
      type: 'custom',
      data: randData,
      coordinateSystem: undefined,
      universalTransition: {
        enabled: true,
        seriesKey: 'point',
      },
      animationThreshold: 1e5,
      animationDurationUpdate: 100,
      animationEasingUpdate: 'circularOut',
    },
  },
  // grid
  {
    series: {
      animationEasingUpdate: 'cubicInOut',
      animationDurationUpdate: 100,
      universalTransition: {
        // Need to disable universal transition to continue custom series animation
        enabled: false,
      },
    },
  },
  // wave
  {
    series: {
      animationDurationUpdate: 0,
      animationEasingUpdate: 'cubicInOut',
      renderItem(params, api) {
        const idx = params.dataIndex
        const m = idx % grid
        const n = Math.floor(idx / grid)
        const [x, y, z] = get3dcoords(m, n, 0)
        const size = ((+api.value(2) * 10 + 10) * fov) / (fov + z)
        const [x2d, y2d] = project3dcoords(x, y, z, api.getWidth(), api.getHeight())
        return {
          type: 'circle',
          shape: {
            cx: x2d,
            cy: y2d,
            r: size / 2,
          },
          extra: {
            percent: 0,
          },
          transition: ['shape'],
          style: {
            fill: '#999',
          },
        }
      },
    },
  },

  {
    series: {
      animationEasingUpdate: 'linear',
      animationDurationUpdate: 5000,
      renderItem(params, api) {
        const idx = params.dataIndex
        const m = idx % grid
        const n = Math.floor(idx / grid)
        const [x, y, z] = get3dcoords(m, n, 0)
        // const size = Math.abs(n - grid / 2) + 5;
        const size = ((+api.value(2) * 10 + 10) * fov) / (fov + z)
        const w = api.getWidth()
        const h = api.getHeight()
        const [x2d, y2d] = project3dcoords(x, y, z, w, h)
        return {
          type: 'circle',
          shape: {
            cx: x2d,
            cy: y2d,
            r: size / 2,
          },
          extra: {
            percent: 1,
          },
          transition: 'extra',
          style: {
            fill: '#999',
          },
          during(duringApi) {
            const elapsedTime = (duringApi.getExtra('percent') as number) * 5
            const [x, y, z] = get3dcoords(m, n, elapsedTime)
            const [x2d, y2d] = project3dcoords(x, y, z, w, h)
            duringApi.setShape('cx', x2d)
            duringApi.setShape('cy', y2d)
          },
        }
      },
    },
  },
  // To a dot
  // {
  //   series: {
  //     animationEasingUpdate: 'cubicOut',
  //     animationDurationUpdate: 500,
  //     animationDelayUpdate: 0,

  //     renderItem(params, api) {
  //       return {
  //         type: 'circle',
  //         shape: {
  //           cx: api.getWidth() / 2,
  //           cy: api.getHeight() / 2,
  //           r: 0,
  //         },
  //         transition: ['shape'],
  //         style: {
  //           transition: ['opacity'],
  //           opacity: 0,
  //           fill: '#999',
  //         },
  //       };
  //     },
  //   },
  // },
]

export default waveOption
