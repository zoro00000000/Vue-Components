import Vue from 'vue'
import VueRouter from 'vue-router'
import { demos, config } from 'set-mobile-deploy'
import { getLang, setDefaultLang } from '../common/locales'
import { listenToSyncPath, syncPathToParent } from '../common/iframe-router'
import { decamelize } from '../common'
import MobileHome from './components/MobileHome'

const { locales, defaultLang } = config.site

setDefaultLang(defaultLang)

Vue.use(VueRouter)

function getLangFromRoute (route) {
  const lang = route.path.split('/')[1]
  const langs = Object.keys(locales)

  if (langs.indexOf(lang) !== -1) {
    return lang
  }

  return getLang()
}

const getRoutes = () => { 
  const routes = []
  const names = Object.keys(demos)
  const langs = locales ? Object.keys(locales) : []

  if (langs.length) {
    routes.push({
      path: '*',
      redirect: route => `/${getLangFromRoute(route)}/`
    })

    langs.forEach(lang => {
      routes.push({
        path: `/${lang}`,
        component: MobileHome,
        meta: { lang }
      })
    })
  } else {
    routes.push({
      path: '*',
      redirect: () => '/'
    })

    routes.push({
      path: '/',
      component: MobileHome
    })
  }

  names.forEach(name => {
    const component = decamelize(name)

    if (langs.length) {
      langs.forEach(lang => {
        routes.push({
          name: `${lang}/${component}`,
          path: `/${lang}/${component}`,
          component: demos[name],
          meta: {
            name,
            lang
          }
        })
      })
    } else {
      routes.push({
        name,
        path: `/${component}`,
        component: demos[name],
        meta: {
          name
        }
      })
    }
  })

  console.log('Mobile-----------------')
  console.log(routes)
  console.log('Mobile-----------------')

  return routes
}

const routerPage = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  // 打包后的项目访问基础路径 /release/vue-template
  // base: routerBase,
  routes: getRoutes(),
  // 路由切换时 滑动行为处理
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 新增路由拦截
routerPage.beforeEach((to, from, next) => {
  console.log('路由拦截beforeEach：', to, from)
  // 路由发生变化修改页面title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

routerPage.afterEach((to, from) => {
  console.log('路由拦截afterEach：', to, from)
  if (!routerPage.currentRoute.redirectedFrom) {
    syncPathToParent(routerPage)
  }
})

listenToSyncPath(routerPage)

// window.vueRouter = routerPage

export default routerPage
