/**
 * ! 路由
 * ? com-demo
 * @param {}
 */

const demoComponent = () => import('../../pages/demo')

const router = [
    {
        path: '/com-demo',
        name: '/demo',
        component: demoComponent,
        meta: {
            keepAlive: false,
            title: 'com-demo 项目页面'
        }
    }
]

export default router
