const { get } = require('lodash')
const { join } = require('path')
const {
  readdirSync,
  existsSync,
  readFileSync
} = require('fs')

const {
  SRC_DIR,
  ENTRY_EXTS,
  getCorrciConfig
} = require('../common/state')

const {
  pascalize,
  normalizePath,
  outputFile
} = require('../common/constant')

// 返回带有导出的组件
function hasDefaultExport (code) {
  return code.includes('export default') || code.includes('export { default }')
}

// 获取到 components 文件夹内 组件list 
function getComponents () {
  const EXCLUDE = ['.DS_Store']
  const dirs = readdirSync(SRC_DIR)
  return dirs
    .filter(dir => !EXCLUDE.includes(dir))
    .filter(dir => ENTRY_EXTS.some(ext => {
      const path = join(SRC_DIR, dir, `index.${ext}`)
      if (existsSync(path)) {
        return hasDefaultExport(readFileSync(path, 'utf-8'))
      }

      return false
    }))
}

// 引入所有组件 ESM
function getImports (components, options) {
  return components
    .map(component => {
      let path = join(SRC_DIR, component)
      if (options.pathResolver) {
        path = options.pathResolver(path)
      }
      return `import ${pascalize(component)} from '${normalizePath(path)}'`
    })
    .join('\n')
}

function setPackageEntry (options) {
  const componentNames = getComponents()
  const corrciConfig = getCorrciConfig()
  const skipInstall = get(corrciConfig, 'build.skipInstall', []).map(pascalize)
  const components = componentNames.map(pascalize)
  
  const content = `${getImports(componentNames, options)}
  
function install (Vue) {
  const components = [
    ${components.filter(item => !skipInstall.includes(item)).join(',\n    ')}
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
`

  // 导出js文件
  outputFile(options.outputPath, content)
}

exports.setPackageEntry = setPackageEntry
