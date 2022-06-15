<template>
  <div>
    <div class="u-quill-body">
      <h1></h1>
      <div class="u-scroll" style="max-height: 600px; padding-right: 10px">
        <div>
          <table class="xlsx">
            <tr>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>F</th>
              <th>G</th>
              <th>H</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <th>{{ index + 1 }}</th>
              <td v-for="(self, i) in item" :key="i">{{ self }}</td>
            </tr>
          </table>
        </div>
      </div>

      <a class="u-btn u-btn--blue u-mt" @click="exportXLSX(list)">导出xlsx</a>
    </div>
  </div>
</template>

<script lang="ts">
import shaonq from 'shaonq'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { http } from '@/utils/request'
export default defineComponent({
  setup() {
    const list = ref([])
    onMounted(async () => {
      try {
        const res = await http.get('/api/get-table-list')
        list.value = res.list
      } catch (e) {
        console.error(e)
      }
    })
    return {
      list,
      async exportXLSX(list) {
        let data = Object.assign([], list).map((obj) => Object.values(obj))
        try {
          if (typeof XLSX === 'undefined') {
            console.time('xlsx v0.16.8')
            // @demo:https://sheetjs.com/demo/manifest.html
            await shaonq.loadJs('https://unpkg.com/xlsx@0.16.8/dist/xlsx.full.min.js')
            console.timeEnd('xlsx v0.16.8')
          }
          // 设置表格样式，!cols为列宽
          const options = {
            '!cols': [{ wpx: 30 }, { wpx: 40 }, { wpx: 50 }, { wpx: 60 }, { wpx: 70 }, { wpx: 70 }, { wpx: 70 }, { wpx: 70 }],
          }
          // const ws = XLSX.utils.json_to_sheet(data)
          const ws = XLSX.utils.aoa_to_sheet(data)
          ws['!cols'] = options['!cols']
          console.log(ws)
          // 创建 Book
          const wb = XLSX.utils.book_new()
          // 添加 Sheet1
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
          // 导出
          XLSX.writeFile(wb, 'demo.xlsx')
        } catch (error) {
          shaonq.toast(String(error))
        }
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.xlsx {
  width: auto;
  min-width: 100%;
  font-size: 14px;
  line-height: 24px;
  color: #454545;
  td {
    border: 1px solid #e2e2e2;
  }
  th {
    background-color: #e2e2e2;
    border: 1px solid #d4d4d4;
    font-weight: 500;
  }
}
</style>
