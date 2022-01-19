import Vue from 'vue'
import App from './App'
import router from './routers'
import { scrollToAnchor } from './utils'
import DemoPlayground from './components/DemoPlayground'

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false
}

Vue.component(DemoPlayground.name, DemoPlayground)

// 全局引入组件
// const compoments = [
//   // Toast,
//   // Lazyload
// ]
//
// compoments.forEach(component => {
//   Vue.use(component)
//   Vue.component(component.name, component)
// })

new Vue({
  mounted () {
    if (this.$route.hash) {
      scrollToAnchor(this.$route.hash)
    }
  },
  render: h => h(App),
  router
  // store
}).$mount('#app')
