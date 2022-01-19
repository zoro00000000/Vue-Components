import { get } from 'lodash'
import { join } from 'path'
import {
  getComponents,
  getPackageJson,
  pascalize,
  normalizePath,
  smartOutputFile
} from '../common'
import { 
  getCorrciConfig,
  SRC_DIR
} from '../common/constant'

function getImports (components, options) {
  return components.map(component => {
    let path = join(SRC_DIR, component)
    if (options.pathResolver) {
      path = options.pathResolver(path)
    }

    return `import ${pascalize(component)} from '${normalizePath(path)}'`
  }).join('\n')
}

function genExports (names) {
  return names.map(name => `${name}`).join(',\n  ')
}

export function getPackageEntry (options) {
  const names = getComponents()
  const corrciConfig = getCorrciConfig()
  const skipInstall = get(corrciConfig, 'build.skipInstall', []).map(pascalize())
  const version = process.env.PACKAGE_VERSION || getPackageJson().version
  
  const components = names.map(pascalize)
  const content = `
${getImports(names, options)}

const version = '${version}'

function install (Vue) {
  const components = [
    ${components.filter(item => !skipInstall.includes(item)).join(',\n  ')}
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
  install(window.Vue);
}

export {
  install,
  version,
  ${genExports(components)}
}

export default {
  install,
  version
}
  `
  
  smartOutputFile(options.outputPath, content)
}
