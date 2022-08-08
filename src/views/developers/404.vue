<template>
  <div class="card">
    <p style="font-size: 28px; color: #2f2f2f">404</p>
    <p style="font-size: 16px; color: #888888; margin-top: 8px">对不起，系统找不到您访问的页面！</p>
    <router-link style="display: block; margin-top: 10px; color: #ff9800" to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {}

function getChineseNumbers(num = 0, errValue = '') {
  if (typeof num !== 'number' || isNaN(num)) return errValue
  if (num === 0) return '零'
  const loop = ['十', '百', '千']
  const place = ['', '万', '亿', '万'].reduce((s, i) => s.concat(i).concat(loop), [])
  const single = '0一二三四五六七八九'.split('')
  let arr = String(num).split('').reverse()
  arr = arr.map((n, i) => {
    const unit = place[i]
    const value = single[n] + unit
    return n === '0' ? (~loop.indexOf(unit) ? single[n] : unit) : value
  })
  return arr.reverse().join('').replace(/0+/g, '零')
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 10px;
  background: #fff;
  overflow: hidden;
  border-radius: px;
  box-sizing: border-box;
  width: 620px;
  padding: 60px;
  margin: 100px auto 0;
}
a {
  color: #4795ef;
}
</style>
