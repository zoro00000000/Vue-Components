const {
  join,
  dirname,
  isAbsolute
} = require('path')
const {
  existsSync
  // readdirSync,
  // readFileSync,
  // writeFile
} = require('fs')
const { get } = require('lodash')

// 查找 corrci.config.js 配置文件
function findRootDir (dir) {
  if (existsSync(join(dir, 'corrci.config.js'))) {
    return dir
  }

  const parentDir = dirname(dir)
  if (dir === parentDir) {
    return dir
  }

  return findRootDir(parentDir)
}

const CWD = process.cwd()
const ROOT = findRootDir(CWD)
const DOCS_DIR = join(ROOT, 'docs')
const PACKAGE_JSON_FILE = join(ROOT, 'package.json')
const CORRCI_CONFIG_FILE = join(ROOT, 'corrci.config.js')

const CONFIG_DIR = join(__dirname, 'corrci-cli', '../../config')
const PACKAGE_ENTRY_FILE = join(CONFIG_DIR, 'package-entry.js')
const SET_DESKTOP_DEPLOY_FILE = join(CONFIG_DIR, 'desktop-deploy.js')

const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue']

exports.ROOT = ROOT
exports.DOCS_DIR = DOCS_DIR
exports.CONFIG_DIR = CONFIG_DIR
exports.PACKAGE_JSON_FILE = PACKAGE_JSON_FILE
exports.CORRCI_CONFIG_FILE = CORRCI_CONFIG_FILE
exports.PACKAGE_ENTRY_FILE = PACKAGE_ENTRY_FILE
exports.SET_DESKTOP_DEPLOY_FILE = SET_DESKTOP_DEPLOY_FILE
exports.ENTRY_EXTS = ENTRY_EXTS

function getPackageJson () {
  delete require.cache[PACKAGE_JSON_FILE]
  // eslint-disable-next-line import/no-dynamic-require
  return require(PACKAGE_JSON_FILE)
}
exports.getPackageJson = getPackageJson

/*
 * ----------------------------------------------
 */
// 获取 corrci.config.js 文件里的内容
function getCorrciConfig () {
  delete require.cache[CORRCI_CONFIG_FILE]

  try {
    // eslint-disable-next-line import/no-dynamic-require
    return require(CORRCI_CONFIG_FILE)
  } catch (err) {
    return {}
  }
}
exports.getCorrciConfig = getCorrciConfig

/*
 * 获取 coccri.config.js 配置文件中 组件所在的文件夹名
 */
function getSrcDir () {
  const corrciConfig = getCorrciConfig()
  const srcDir = get(corrciConfig, 'build.srcDir')

  if (srcDir) {
    if (isAbsolute(srcDir)) {
      return srcDir
    }

    return join(ROOT, srcDir)
  }
  return join(ROOT, 'components')
}
const SRC_DIR = getSrcDir()
exports.SRC_DIR = SRC_DIR
