const { join } = require('path')
const { 
  existsSync,
  readdirSync
} = require('fs-extra')
const { 
  SRC_DIR,
  SET_MOBILE_DEPLOY_FILE,
  getCorrciConfig
} = require('../common/state')
const {
  outputFile,
  removeExt,
  normalizePath,
  pascalize,
  decamelize
} = require('../common/constant')

function getInstall () {
  return `import Vue from 'vue'
import PackageEntry from './package-entry'
`  
}

function getImports (components) {
  return components
    .map(item => `import ${item.name} from '${removeExt(normalizePath(item.path))}'`)
    .join('\n')
}

function getSetName (components) {
  return components
    .map(item => `${item.name}.name = 'demo-${item.component}'`)
    .join('\n')
}

function getExports (components) {
  return `export const demos = {
  ${components.map(item => item.name).join(',\n  ')}\n}`
}

function getConfig (components) {
  const corrciConfig = getCorrciConfig()
  const componentsNames = components.map(item => decamelize(item.name))

  function componentsFilter (nav) {
    return nav.filter(group => {
      group.items = group.items.filter(item => componentsNames.includes(item.path))
      return group.items.length
    })
  }
    
  const { nav, locales } = corrciConfig.site
  if (locales) {
    Object.keys(locales).forEach(lang => {
      if (locales[lang].nav) {
        locales[lang].nav = componentsFilter(locales[lang].nav)
      }
    })
  } else if (nav) {
    corrciConfig.site.nav = componentsFilter(nav)
  }

  return `export const config = ${JSON.stringify(corrciConfig, null, 2)}`
}

function resolveDocuments (components) {
  return components
    .map(component => ({
      component,
      name: pascalize(component),
      path: join(SRC_DIR, component, 'demo/index.vue')
    }))
    .filter(item => existsSync(item.path))
}

function setMobileDeploy () {
  const dirs = readdirSync(SRC_DIR)
  const documents = resolveDocuments(dirs)
  
  const code = `${getInstall()}
${getImports(documents)}

Vue.use(PackageEntry)

${getSetName(documents)}

${getExports(documents)}
${getConfig(documents)}
`

  outputFile(SET_MOBILE_DEPLOY_FILE, code)
}

exports.setMobileDeploy = setMobileDeploy
