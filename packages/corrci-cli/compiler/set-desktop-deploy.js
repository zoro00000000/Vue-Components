const { 
  readdirSync,
  existsSync
} = require('fs')
const { 
  join,
  parse 
} = require('path')
const glob = require('fast-glob')

const {
  SRC_DIR,
  DOCS_DIR,
  CORRCI_CONFIG_FILE,
  SET_DESKTOP_DEPLOY_FILE,
  getPackageJson,
  getCorrciConfig
} = require('../common/state')

const {
  outputFile,
  removeExt,
  normalizePath,
  pascalize
} = require('../common/constant')

function getImport () {
  return `import Vue from 'vue'
import PackageEntry from './package-entry'
import config from '${removeExt(normalizePath(CORRCI_CONFIG_FILE))}'
`
}

function getImportDocuments (items) {
  return items
    .map(item => `import ${item.name} from '${normalizePath(item.path)}'`)
    .join('\n')
}

function formatName (component, lang) {
  component = pascalize(component)

  if (lang) {
    return `${component}_${lang.replace('-', '_')}`
  }

  return component
}

/*
 * 返回 components 文件夹内的组件数组
 */
function resolveDocuments (components) {
  const corrciConfig = getCorrciConfig()
  const { defaultLang, locales } = corrciConfig.site
  
  const docs = []
  
  if (locales) {
    const langs = Object.keys(locales)
    langs.forEach(lang => {
      const fileName = lang === defaultLang ? 'README.md' : `README.${lang}.md`
      components.forEach(component => {
        docs.push({
          name: formatName(component, lang),
          path: join(SRC_DIR, component, fileName)
        })
      })
    })
  } else {
    components.forEach(component => {
      docs.push({
        name: formatName(component),
        path: join(SRC_DIR, component, 'README.md')
      })
    })
  }

  const staticDocs = glob
    .sync(normalizePath(join(DOCS_DIR, '**/*.md')))
    .map(path => {
      const pairs = parse(path).name.split('.')
      return {
        name: formatName(pairs[0], pairs[1] || defaultLang),
        path
      }
    })
  
  return [
    ...staticDocs,
    ...docs.filter(item => existsSync(item.path))
  ]
}

function genExportConfig () {
  return 'export { config }'
}

function genExportDocuments (items) {
  return `export const documents = {
  ${items.map(item => item.name).join(',\n  ')}
}`
}

function genExportVersion () {
  return `export const packageVersion = '${getPackageJson().version}'`
}

/*
 * desktop 端配置文件
 */
function setDesktopDeploy () {
  const dirs = readdirSync(SRC_DIR)
  const documents = resolveDocuments(dirs)

  const code = `${getImport()}
${getImportDocuments(documents)}

Vue.use(PackageEntry)

${genExportConfig()}
${genExportDocuments(documents)}
${genExportVersion()}
`
  
  outputFile(SET_DESKTOP_DEPLOY_FILE, code)
}

exports.setDesktopDeploy = setDesktopDeploy
