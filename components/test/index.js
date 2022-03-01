import CoriTestCom from './src/test.vue'

CoriTestCom.install = function (Vue) {
  Vue.component(CoriTestCom.name, CoriTestCom)
}

export default CoriTestCom
