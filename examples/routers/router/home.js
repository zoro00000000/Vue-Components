/**
 * ! 路由
 * ? home
 * @param {}
 */

// 父集
const homeComponent = () => import('./common/home')
// 子集
const installComponent = () => import('./doc/install.md')

const router = [
    {
        path: '/',
        redirect: '/install'
    },
    {
        path: '/',
        component: homeComponent,
        meta: {
            title: '自述文件'
        },
        children: [
            {
                path: '/install',
                component: installComponent,
                meta: {
                    title: '安装'
                }
            }
        ]
    }
]

export default router
