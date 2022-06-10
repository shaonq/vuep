<template>
  <div>
    <div class="u-quill-body">
      <h1>数据格式</h1>
      <pre><code class="language-javascript">
    {
      title: "0.1协议或合同",
      endDate: "2020-11-30",
      startDate: "2019-09-21",
      actualEndDate: "2020-11-29",
      actualStartDate: "2019-09-22",
      dateList: [
        { endDate: "2020-09-30", startDate: "2019-09-21", title: "0.1协议或合同", },
        { endDate: "2020-10-30", startDate: "2019-09-30", title: "0.1协议或合同", },
        { endDate: "2020-11-30", startDate: "2019-10-30", title: "0.1协议或合同", },
      ]
    }
      </code></pre>
      <h1>例子</h1>
    </div>
    <!-- gantt demo -->
    <div>
      <Gantt :list="list" style="height: 380px" @on-item-click="handleClick" class="test-gantt" />
    </div>
  </div>
</template>

<script type="ts">
import shaonq from 'shaonq';
import { defineComponent } from 'vue'
export default defineComponent( {
  setup() {
   const list =[{"title":"1.1协议或合同","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-21","endDate":"2022-06-30","className":"a3aa1ef"},{"title":"1.2顾客特殊要求传递清单及工作任务单123","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-21","endDate":"2022-06-22","className":"afec7b5"},{"title":"1.3新项目信息输入输出检查表","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-21","endDate":"2022-06-23","className":"a4ffa5d"},{"title":"1.4新开发产品市场分析报告","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-24","endDate":"2022-06-24","className":"aeed6ca"},{"title":"1.5工程工作申请单","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-25","endDate":"2022-06-25","className":"a8f58d5"},{"title":"1.6产品成本核算表","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-26","endDate":"2022-06-26","className":"a26825f"},{"title":"1.7项目经验-以往缺陷清单","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-21","endDate":"2022-06-27","className":"a83f6dd"},{"title":"1.8产品设计方案评估报告","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-28","endDate":"2022-06-28","className":"a46071c"},{"title":"1.9注塑模具设计制造方案评估报告","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-29","endDate":"2022-06-29","className":"a94750f"},{"title":"1.10冲压模具设计制造方案评估报告","content":" 订单编号：QC01-0710-APQP-01 ","startDate":"2019-09-30","endDate":"2022-06-30","className":"a054a28"},{"title":"1.1协议或合同","content":" 订单编号：QC01-0619-APQP-01 ","startDate":"2019-09-21","endDate":"2022-06-21","className":"a37de21"},{"title":"1.2顾客特殊要求传递清单及工作任务单123","content":" 订单编号：QC01-0619-APQP-01 ","startDate":"2019-09-22","endDate":"2022-06-22","className":"a177216"},{"title":"1.3新项目信息输入输出检查表","content":" 订单编号：QC01-0619-APQP-01 ","startDate":"2019-09-23","endDate":"2022-06-23","className":"a2f2e37"},{"title":"1.4新开发产品市场分析报告","content":" 订单编号：QC01-0619-APQP-01 ","startDate":"2019-09-24","endDate":"2022-06-24","className":"a77d3e7"},{"title":"1.5工程工作申请单","content":" 订单编号：QC01-0619-APQP-01 ","startDate":"2019-09-25","endDate":"2022-06-25","className":"ad5c55d"},{"title":"1.6产品成本核算表","content":" 订单编号：QC01-0619-APQP-01 ","startDate":"2019-09-26","endDate":"2022-06-26","className":"ac98e7c"}];
    list.unshift({
      className: "a653e82",
      content: " 订单编号：QC01-0710-APQP-01 ",
      endDate: "2020-11-30",
      startDate: "2019-09-21",
      title: "0.1协议或合同",
      actualEndDate: "2020-11-29",
      actualStartDate: "2019-09-22",
      dateList: [
        { endDate: "2020-09-30", startDate: "2019-09-21", title: "0.1协议或合同", },
        { endDate: "2020-10-30", startDate: "2019-09-30", title: "0.1协议或合同", },
        { endDate: "2020-11-30", startDate: "2019-10-30", title: "0.1协议或合同", },
      ]
    });
    return {
      list,
      handleClick(e) {
        shaonq.toast(`您点击了 ${e.content}`);
      },
    }
  }
});
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
