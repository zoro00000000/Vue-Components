import CoriTestCom from './src/test'

CoriTestCom.install = function (Vue) {
  Vue.component(CoriTestCom.name, CoriTestCom)
}

export default CoriTestCom
