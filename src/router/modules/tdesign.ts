import baseLayout from '@/views/layout/base.vue'
import Layout from '@/views/layout/index.vue'

export default [
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    redirect: '/admin/tdesign',
    meta: { title: 'tdesign' },
    children: [
      {
        path: 'tdesign',
        name: 'tdesign',
        component: baseLayout,
        redirect: '/admin/tdesign/table',
        meta: { title: '表单', icon: 'check-circle' },
        children: [
          {
            path: 'table',
            name: 'TdesignTable',
            component: () => import('@/views/admin/tdesign/table.vue'),
            meta: { title: 'TdesignTable' },
          },
        ],
      },
    ],
  },
]
