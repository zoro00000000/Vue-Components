import { Compiler } from 'webpack'
import { getStyleDepsMap } from './get-style-deps-map'
import { getPackageEntry } from './get-package-entry'
import { getPackageStyle } from './get-package-style'
import { getSiteDesktopShared } from './get-site-desktop-shared'
import { PACKAGE_ENTRY_FILE, PACKAGE_STYLE_FILE } from '../common/constant'

const PLUGIN_NAME = 'CorrciCliSitePlugin'

export async function getSiteEntry () {
  return new Promise((resolve, reject) => {
    getStyleDepsMap().then(() => {
      // TODO: package-entry.js 
      getPackageEntry({
        outputFile: PACKAGE_ENTRY_FILE
      })
      // TODO: package-style.css
      // getPackageStyle({
      //   outputFile: PACKAGE_STYLE_FILE
      // })
      // site-desktop-shared.js
      getSiteDesktopShared()
      resolve()
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
} 

/*
 * 根据 corrci.config.js 文件 提取配置项到新文件中。
 */
export const CorrciCliSitePlugin = (compiler = Compiler) => {
  if (process.env.NODE_ENV === 'production') {
    compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, getSiteEntry)
  } else {
    compiler.hooks.watchRun.tabPromise(PLUGIN_NAME, getSiteEntry)
  }
}
