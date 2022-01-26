import Vue from 'vue'
import App from './App'
import router from './router'
import MobileBlock from './components/MobileBlock'
import MobileSection from './components/MobileSection'
import { scrollToAnchor } from '../desktop/utils'

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false
}

Vue.component(MobileBlock.name, MobileBlock)
Vue.component(MobileSection.name, MobileSection)

new Vue({
  mounted () {
    if (this.$route.hash) {
      scrollToAnchor(this.$route.hash)
    }
  },
  render: h => h(App),
  router
  // store
}).$mount('#app-mobile')
