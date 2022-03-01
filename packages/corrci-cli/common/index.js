const {
  lstatSync
} = require('fs-extra')
const {
  sep
} = require('path')

const EXT_REGEXP = /\.\w+$/
const SFC_REGEXP = /\.(vue)$/
const DEMO_REGEXP = new RegExp(`\\${sep}demo$`)
const TEST_REGEXP = new RegExp(`\\${sep}test$`)
const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i
const STYLE_REGEXP = /\.(css|less|scss)$/
const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/
// const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']

function setModuleEnv (value) {
  process.env.BABEL_MODULE = value
}

function isDemoDir (dir) {
  return DEMO_REGEXP.test(dir)
}

function isTestDir (dir) {
  return TEST_REGEXP.test(dir)
}

function isDir (dir) {
  return lstatSync(dir).isDirectory()
}

function isSfc (path) {
  return SFC_REGEXP.test(path)
}

function isAsset (path) {
  return ASSET_REGEXP.test(path)
}

function isStyle (path) {
  return STYLE_REGEXP.test(path)
}

function isScript (path) {
  return SCRIPT_REGEXP.test(path)
}

function replaceExt (path, ext) {
  return path.replace(EXT_REGEXP, ext)
}

exports.isDemoDir = isDemoDir
exports.isTestDir = isTestDir
exports.isDir = isDir
exports.isSfc = isSfc
exports.isAsset = isAsset
exports.isStyle = isStyle
exports.isScript = isScript
exports.setModuleEnv = setModuleEnv
exports.replaceExt = replaceExt
