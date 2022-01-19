import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
import { SCRIPT_EXTS } from '../common/constant'

let depsMap = {}
let existsCache = {}

const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

function matchImports (code) {
  return code.match(IMPORT_RE) || []
}

function exists (componentPath) {
  if (!(componentPath in existsCache)) {
    existsCache[componentPath] = existsSync(componentPath)
  }
  
  return existsCache[componentPath] 
}

export function fillExt (filePath) {
  // 文件
  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const componentPath = `${filePath}${SCRIPT_EXTS[i]}`
    if (exists(componentPath)) {
      return componentPath
    }
  }
  
  // 文件夹
  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const componentPath = `${filePath}/index${SCRIPT_EXTS[i]}`
    if (exists(componentPath)) {
      return componentPath
    }
  }
  
  return ''
}

/*
 * 重置数据
 */
export function clearDepsCache () {
  depsMap = {}
  existsCache = {}
}

function getPathByImport (code, filePath) {
  const divider = code.includes('"') ? '"' : '\''
  const relativePath = code.split(divider)[1]
  
  if (relativePath.includes('.')) {
    return fillExt(join(filePath, '..', relativePath))
  }
  
  return null
}

export function getDeps (filePath) {
  if (depsMap[filePath]) {
    return depsMap[filePath]
  }
  
  const code = readFileSync(filePath, 'utf-8')
  const imports = matchImports(code)
  
  const paths = imports
    .map(item => getPathByImport(item, filePath))
    .filter(item => !!item)
  
  depsMap[filePath] = paths
  
  paths.forEach(getDeps)
  
  return paths
}
