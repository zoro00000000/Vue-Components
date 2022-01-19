import { join, isAbsolute } from 'path'
import { get } from 'lodash'
import { existsSync } from 'fs'

function findRootDir (dir) {
  if (existsSync(join(dir, 'coccri.config.js'))) {
    return dir
  }
}

// path
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const DOCS_DIR = join(ROOT, 'docs')
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')
export const CORRCI_CONFIG_FILE = join(ROOT, 'corrci.config.js')
export const DIST_DIR = join(__dirname, '../../dist')

// dist
export const PACKAGE_ENTRY_FILE = join(DIST_DIR, 'package-entry.js')
export const PACKAGE_STYLE_FILE = join(DIST_DIR, 'package-style.css')
export const SITE_DESKTOP_SHARED_FILE = join(DIST_DIR, 'site-desktop-shared.js')

export const STYPE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json')

// files
export const SCRIPT_EXTS = ['.js', '.jsx', '.ts', '.tsx', '.vue']

export function getCorrciConfig () {
  delete require.cache(CORRCI_CONFIG_FILE)
  
  try {
    // return require(CORRCI_CONFIG_FILE)
    return require.context(CORRCI_CONFIG_FILE, true)
  } catch (err) {
    return {}
  }
}

/*
 * 获取文件路径方法
 */
const getSrcDir = () => {
  const corrciConfig = getCorrciConfig()
  const srcDir = get(corrciConfig)
  
  if (srcDir) {
    if (isAbsolute(srcDir)) {
      return srcDir
    }

    return join(ROOT, srcDir)
  }

  return join(ROOT, 'src')
}

export const SRC_DIR = getSrcDir()
