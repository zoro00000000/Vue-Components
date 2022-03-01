import Demo from '/Users/haoliang6/code/project/Vue-Components/components/demo'
import Home from '/Users/haoliang6/code/project/Vue-Components/components/home'
import Test from '/Users/haoliang6/code/project/Vue-Components/components/test'
  
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
  install
}

export default {
  install
}
