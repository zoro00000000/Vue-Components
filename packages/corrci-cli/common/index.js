const {
  readdirSync,
  existsSync,
  readFileSync,
  writeFile
} = require('fs')
const { join } = require('path')

const { 
  SRC_DIR,
  PACKAGE_JSON_FILE
} = require('./constant')

const ENTRY_EXTENDS = ['js', 'ts', 'tsx', 'jsx', 'vue']
exports.ENTRY_EXTENDS = ENTRY_EXTENDS

// 
function hasDefaultExport (code) {
  return code.includes('export default') || code.includes('export { default }')
}
exports.hasDefaultExport = hasDefaultExport

function getComponents () {
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
exports.getComponents = getComponents

function smartOutputFile (filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')
    
    if (previousContent === content) {
      return
    }
  }

  writeFile(filePath, content)
}
exports.smartOutputFile = smartOutputFile

const camelizeRE = /-(\w)/g
const pascalizeRE = /(\w)(\w*)/g

function camelize (str) {
  return str.replace(
    camelizeRE,
    (_, c) => c.toUpperCase()
  ) 
}
exports.camelize = camelize

function pascalize (str) {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  )
}
exports.pascalize = pascalize

function normalizePath (path) {
  return path.replace(/\\/g, '/')
}
exports.normalizePath = normalizePath

function removeExt (path) {
  return path.replace('.js', '')
}
exports.removeExt = removeExt

function getPackageJson () {
  delete require.cache[PACKAGE_JSON_FILE]

  return require.context(PACKAGE_JSON_FILE, true)
}
exports.getPackageJson = getPackageJson
