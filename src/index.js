import Demo from '../components/demo'
import Home from '../components/home'
import Test from '../components/test'

const version = '1.0.1'

function install (Vue) {
  const components = [
    Demo,
    Home,
    Test
  ]
  components.forEach(item => {
    if (item.install) {
      Vue.use(item)
    } else if (item.name) {
      Vue.component(item.name, item)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Demo,
  Home,
  Test
}
export default {
  install,
  version
}
