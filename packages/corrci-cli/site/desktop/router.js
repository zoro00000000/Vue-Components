import Vue from 'vue'
import VueRouter from 'vue-router'
import { config, documents } from 'set-desktop-deploy'
import { isMobile, decamelize } from '../common'
import { getLang, setDefaultLang } from '../common/locales'
import { listenToSyncPath, syncPathToChild } from '../common/iframe-router'

if (isMobile) {
  window.location.replace(`mobile.html${window.location.hash}`)
}

const { locales, defaultLang } = config.site

setDefaultLang(defaultLang)

Vue.use(VueRouter)

// const { defaultLang } = config.site

// let routerBase = `/${defaultLang}`
// if (process.env.NODE_ENV === 'production') {
//   routerBase = `/${defaultLang}/release/corrciComponents`
//   window.location.host === 'minner.jr.jd.com' && (routerBase = `/${defaultLang}/experience/corrciComponents`)
// }

const parseName = name => {
  if (name.indexOf('_') !== -1) {
    const pairs = name.split('_')
    const component = pairs.shift()

    return {
      component: `${decamelize(component)}`,
      lang: pairs.join('-')
    }
  }

  return {
    component: `${decamelize(name)}`,
    lang: ''
  }
}

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
  const names = Object.keys(documents)

  if (locales) {
    routes.push({
      path: '*',
      redirect: route => `/${getLangFromRoute(route)}/`
    })
  } else {
    routes.push({
      path: '*',
      redirect: '/'
    })
  }

  names.forEach(name => {
    const { component, lang } = parseName(name)

    if (component === 'home') {
      routes.push({
        name: lang,
        path: `/${lang || ''}`,
        component: documents[name],
        meta: { lang }
      })
    }

    if (lang) {
      routes.push({
        name: `${lang}/${component}`,
        path: `/${lang}/${component}`,
        component: documents[name],
        meta: {
          lang,
          name: component
        }
      })
    } else {
      routes.push({
        name: `${component}`,
        path: `/${component}`,
        component: documents[name],
        meta: {
          name: component
        }
      })
    }
  })
  
  console.log('-----------------')
  console.log(routes)
  console.log('-----------------')

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

export default routerPage

// 新增路由拦截
routerPage.beforeEach((to, from, next) => {
  // console.log('路由拦截beforeEach：', to, from)
  // 路由发生变化修改页面title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

routerPage.afterEach((to, from) => {
  // console.log('路由拦截afterEach：', to, from)
  Vue.nextTick(() => {
    syncPathToChild(routerPage)
  })
})

listenToSyncPath(routerPage)

// window.vueRouter = routerPage
