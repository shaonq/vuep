<template>
  <div>
    <div class="u-quill-body">
      <h1>日程表</h1>
      <h1>日程表含义</h1>
      <p>日程表，根据日期安排活动顺序及内容的表格。可以用日程表来规划时间，安排办事的流程。</p>
      <h1>每日数据</h1>

      <pre><code class="language-javascript">
// @param {Object[]}  list :porp list Array
  [{
    content: "QC01-0710-APQP-01",
    title: "1.1协议或合同",
    startDate: "2019/11/21 00:00:00",
    endDate: "2019/11/30 00:00:00",
    className:""
  }]

// @param {Object[]}  holiday :porp holiday Array
  [{
    "holiday":false,
    "name":"国庆节前调休",
    "target":"国庆节",
    "date":"2019-09-29"
  }]
</code></pre>
      <h1>例子</h1>
    </div>
    <u-full-calendar :list="list" :holiday="holiday" @on-init="dataInit" @on-day="onDay" @on-item="onItem" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { http } from '@/utils/request'
import shaonq from 'shaonq'
export default defineComponent({
  setup() {
    const list = ref([])
    const holiday = ref([])
    function getHoliday(date) {
      typeof fetch === 'function' &&
        fetch('https://timor.tech/api/holiday/year/' + date)
          .then((data) => data.json())
          .then((data) => {
            if (data && data.code === 0) {
              holiday.value = Object.values(data.holiday)
            }
          })
    }
    async function dataInit(startDate, endDate, today) {
      const yyyyMM = today.slice(0, 7)
      getHoliday(yyyyMM)
      const res = await http.get('/api/get-calendar-list')
      list.value = res.list
    }
    function onDay(date) {
      shaonq.toast(date + '=> on-day')
    }
    function onItem(date, item) {
      shaonq.toast(date + '=> on-item => ' + JSON.stringify(item))
    }
    return {
      list,
      holiday,
      dataInit,
      onDay,
      onItem,
    }
  },
})
</script>
