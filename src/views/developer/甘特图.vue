<template>
  <div>
    <div class="u-quill-body">
      <h1>甘特图</h1>
      <pre><code class="language-javascript">
// Mock 数据格式        
{
	'title|1': [
		'1.@increment(1)协议或合同',
		'1.@increment(1)顾客特殊要求传递清单及工作任务单123',
		'1.@increment(1)新项目信息输入输出检查表',
		'1.@increment(1)新开发产品市场分析报告',
		'1.@increment(1)工程工作申请单',
		'1.@increment(1)产品成本核算表',
		'1.@increment(1)项目经验-以往缺陷清单',
		'1.@increment(1)产品设计方案评估报告',
		'1.@increment(1)注塑模具设计制造方案评估报告',
		'1.@increment(1)冲压模具设计制造方案评估报告',
	],
	endDate: '2020-10-@natural(16,31)',
	startDate: '2020-10-@natural(1,10)',
	actualEndDate: '2020-10-@natural(16,31)',
	actualStartDate: '2020-10-@natural(1,10)',
	'dateList|0-3': [
           { endDate: '2020-10-@natural(9,16)', startDate: '2020-10-@natural(1,8)' }
	],
}
      </code></pre>
    </div>
    <!-- gantt demo -->
    <div>
      <Gantt :list="list" style="height: 380px" class="test-gantt" @on-item-click="handleClick" />
    </div>
  </div>
</template>

<script type="ts">
import shaonq from 'shaonq'
import { defineComponent, ref } from 'vue'
import { http } from '@/utils/request'
export default defineComponent({
	setup() {
		const list = ref([])
		async function dataInit() {
			const res = await http.get('/api/get-gantt-list')
			list.value = res.list
		}
		dataInit()
		return {
			list,
			handleClick(e) {
				shaonq.toast(`您点击了 ${e.title}`)
			},
		}
	},
})
</script>
<style lang="scss">
.test-gantt {
  thead {
    td {
      border-color: #f79898;
      background: #f79898;
      color: #fff;
    }
  }
}
</style>
