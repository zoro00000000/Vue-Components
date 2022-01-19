import {
  readdirSync,
  existsSync,
  readFileSync,
  writeFile
} from 'fs'
import { join } from 'path'

import { 
  SRC_DIR,
  PACKAGE_JSON_FILE
} from './constant'

export const ENTRY_EXTENDS = ['js', 'ts', 'tsx', 'jsx', 'vue']

// 
export function hasDefaultExport (code) {
  return code.includes('export default') || code.includes('export { default }')
}

export function getComponents () {
  const EXCLUDE = ['.DS_Store']
  const dirs = readdirSync(SRC_DIR)
  return dirs
    .filter(dir => !EXCLUDE.includes(dir))
    .filter(dir => ENTRY_EXTENDS.some(ext => {
      const path = join(SRC_DIR, dir, `index.${ext}`)
      if (existsSync(path)) {
        return hasDefaultExport(readFileSync(path, 'utf-8'))
      }
      return false
    }))
}

export function smartOutputFile (filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')
    
    if (previousContent === content) {
      return
    }
  }

  writeFile(filePath, content)
}

const camelizeRE = /-(\w)/g
const pascalizeRE = /(\w)(\w*)/g

export function camelize (str) {
  return str.replace(
    camelizeRE,
    (_, c) => c.toUpperCase()
  )
}

export function pascalize (str) {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  )
}

export function normalizePath (path) {
  return path.replace(/\\/g, '/')
}

export function removeExt (path) {
  return path.replace('.js', '')
}

export function getPackageJson () {
  delete require.cache[PACKAGE_JSON_FILE]

  return require.context(PACKAGE_JSON_FILE, true)
}
