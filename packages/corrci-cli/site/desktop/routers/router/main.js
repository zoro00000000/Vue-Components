/**
 * ! 路由
 * ? main
 * @param {}
 */

// 404页面
const component404 = () => import('../../pages/404')
// 403页面
const component403 = () => import('../../pages/403')

const router = [
  {
    path: '/404',
    component: component404
  },
  {
    path: '/403',
    component: component403
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default router
