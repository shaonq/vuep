import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
// api demo : http://mockjs.com/examples.html
export default [
  {
    url: '/api/get-table-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|50': [
            {
              no: 'BH00@natural(01, 100)',
              name: '@city()办公用品采购项目',
              'paymentType|1': '@natural(0, 1)',
              'contractType|1': '@natural(0, 2)',
              updateTime: '2020-05-30',
              amount: '@natural(10, 500),000',
              adminName: '@cname()',
            },
          ],
        }),
      },
    }),
  },
  {
    url: '/api/get-gantt-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|20-30': [
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
              'dateList|0-3': [{ endDate: '2020-10-@natural(9,16)', startDate: '2020-10-@natural(1,8)' }],
            },
          ],
        }),
      },
    }),
  },
  ,
  {
    url: '/api/get-calendar-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|20-30': [
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
              content: '@guid()',
              startDate: '2020-09-0@natural(1, 9) @date("HH:mm:ss")',
              endDate: '2022-09-@natural(10,30 ) @date("HH:mm:ss")',
              className: 'ab5bf66',
            },
          ],
        }),
      },
    }),
  },
] as MockMethod[]
