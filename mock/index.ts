import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
// api demo : http://mockjs.com/examples.html
export default [
  {
    url: `/api/get-table-list`,
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
    url: `/api/get-gantt-list`,
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
    url: `/api/get-calendar-list`,
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
  {
    url: '/api/get-card-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|48-50': [
            {
              'index|+1': 1,
              isSetup: '@boolean',
              'type|1': '@natural(1, 5)',
              'banner|1': [
                'https://tdesign.gtimg.com/starter/cloud-db.jpg',
                'https://tdesign.gtimg.com/starter/cloud-server.jpg',
                'https://tdesign.gtimg.com/starter/ssl.jpg',
                'https://tdesign.gtimg.com/starter/t-sec.jpg',
                'https://tdesign.gtimg.com/starter/face-recognition.jpg',
              ],
              'name|1': ['人脸识别', 'SSL证书', 'CVM', '云数据库', 'T-Sec 云防火墙'],
              'description|1': [
                '基于腾讯优图强大的面部分析技术，提供包括人脸检测与分析、五官定位、人脸搜索、人脸比对、人脸',
                '云硬盘为您提供用于CVM的持久性数据块级存储服务。云硬盘中的数据自动地可用区内以多副本冗',
                'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
                '腾讯安全云防火墙产品，是腾讯云安全团队结合云原生的优势，自主研发的SaaS化防火墙产品，无需客无需客无需客无需客无需客无需客无需客',
                '云数据库MySQL为用户提供安全可靠，性能卓越、易于维护的企业级云数据库服务。',
              ],
            },
          ],
        }),
      },
    }),
  },
  {
    url: '/api/get-project-list',
    method: 'get',
    response: () => ({
      code: 0,
      data: {
        ...Mock.mock({
          'list|1-50': [
            {
              'index|+1': 1,
              adminPhone: '+86 13587609955',
              updateTime: '2020-05-30 @date("HH:mm:ss")',
              'adminName|1': ['顾娟	', '常刚', '郑洋'],
              'name|1': ['沧州市办公用品采购项目', '红河哈尼族彝族自治州办公用品采购项目	', '铜川市办公用品采购项目', '陇南市办公用品采购项目	', '六安市办公用品采购项目	 '],
            },
          ],
        }),
      },
    }),
  },
] as MockMethod[]
