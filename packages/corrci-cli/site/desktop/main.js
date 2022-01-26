import Vue from 'vue'
import App from './App'
import router from './router'
import { scrollToAnchor } from './utils'
import DemoPlayground from './components/DemoPlayground'

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false
}

Vue.component(DemoPlayground.name, DemoPlayground)

new Vue({
  mounted () {
    if (this.$route.hash) {
      scrollToAnchor(this.$route.hash)
    }
  },
  render: h => h(App),
  router
  // store
}).$mount('#app-desktop')
