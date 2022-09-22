/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const authRouter = {
  path: '/auth',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Auth',
  meta: {
    title: 'Yetkilendirme',
    icon: 'password'
  },
  children: [    
    {
      path: 'employees',
      component: () => import('@/views/auth/employees'),
      name: 'Employees',
      meta: {
        title: 'Kullanıcılar',
        noCache: true
      }
    },
    {
      path: 'directories',
      component: () => import('@/views/auth/directories'),
      name: 'Directories',
      meta: {
        title: 'Müdürlükler',
        noCache: true
      }
    },
    {
      path: 'chiefs',
      component: () => import('@/views/auth/chiefs'),
      name: 'Chiefs',
      meta: {
        title: 'Şeflikler',
        noCache: true
      }
    },
    {
      path: 'roles',
      component: () => import('@/views/auth/roles'),
      name: 'Roles',
      meta: {
        title: 'Roller',
        noCache: true
      }
    }
  ]
}

export default authRouter
