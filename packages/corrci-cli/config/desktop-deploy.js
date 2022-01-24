import Vue from 'vue'
import PackageEntry from './package-entry'
import config from '/Users/haoliang6/code/project/Vue-Components/corrci.config'

import Install_zh_CN from '/Users/haoliang6/code/project/Vue-Components/docs/markdown/install.zh-CN.md'
import Quickstart_zh_CN from '/Users/haoliang6/code/project/Vue-Components/docs/markdown/quickstart.zh-CN.md'
import Demo_zh_CN from '/Users/haoliang6/code/project/Vue-Components/components/demo/README.md'
import Home_zh_CN from '/Users/haoliang6/code/project/Vue-Components/components/home/README.md'
import Test_zh_CN from '/Users/haoliang6/code/project/Vue-Components/components/test/README.md'

Vue.use(PackageEntry)

export { config }
export const documents = {
  Install_zh_CN,
  Quickstart_zh_CN,
  Demo_zh_CN,
  Home_zh_CN,
  Test_zh_CN
}
export const packageVersion = '1.0.0'
