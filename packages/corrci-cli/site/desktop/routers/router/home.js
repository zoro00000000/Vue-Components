/**
 * ! 路由
 * ? home
 * @param {}
 */

// 子集
const installComponent = () => import('../../../docs/install.md')

const router = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/install',
    component: installComponent,
    meta: {
      title: '安装'
    }
  }
]

export default router
