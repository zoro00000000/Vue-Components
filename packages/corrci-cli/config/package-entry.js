import Demo from '/Users/haoliang6/code/project/Vue-Components/components/demo'
import Test from '/Users/haoliang6/code/project/Vue-Components/components/test'
  
function install (Vue) {
  const components = [
    Demo,
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
