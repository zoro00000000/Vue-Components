import glob from 'fast-glob'
import { join, parse } from 'path'
import { readdirSync, existsSync } from 'fs'
import {
  getCorrciConfig,
  SRC_DIR,
  DOCS_DIR,
  SITE_DESKTOP_SHARED_FILE,
  CORRCI_CONFIG_FILE
} from '../common/constant'
import {
  pascalize,
  normalizePath,
  smartOutputFile,
  removeExt
} from '../common'

function formatName (component, lang) {
  component = pascalize(component)
  
  if (lang) {
    return `${component}_${lang.replace('-', '_')}`
  }
  
  return component
}

/*
 * 文件内容
 */
function resolveDocuments (components) {
  const corrciConfig = getCorrciConfig()
  const { locales, defaultLang } = corrciConfig.site
  
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

  return [...staticDocs, ...docs.filter(item => existsSync(item.path))]
}

function getImport () {
  return `
    import Vue from 'vue'
    import config from '${removeExt(normalizePath(CORRCI_CONFIG_FILE))}'
  `
}

function getImportDocuments (items) {
  return items
    .map(item => `import ${item.name} from '${normalizePath(item.path)}'`)
    .join('\n')
}

export function getSiteDesktopShared () {
  const dirs = readdirSync(SRC_DIR)
  const documents = resolveDocuments(dirs)
  
  const code = `
    ${getImport()}
    ${getImportDocuments(documents)}
  `
  
  smartOutputFile(SITE_DESKTOP_SHARED_FILE, code)
}
