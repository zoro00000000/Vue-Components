// const { getStyleDepsMap } = require('./get-style-deps-map')
// // const { getPackageStyle } = require('./get-package-style')
// // const { getSiteDesktopShared } = require('./get-site-desktop-shared')
const { 
  PACKAGE_ENTRY_FILE
  // PACKAGE_STYLE_FILE
} = require('../common/state')

const { setPackageEntry } = require('./set-package-entry')
const { setDesktopDeploy } = require('./set-desktop-deploy')

const PLUGIN_NAME = 'CorrciCliSitePlugin'

async function setSiteEntry () {
  return new Promise((resolve, reject) => {
    // package-entry.js
    setPackageEntry({
      outputPath: PACKAGE_ENTRY_FILE
    })
    // desktop-deploy.js
    setDesktopDeploy()
    resolve()
  })
}

/*
 * 自定义 webpack 插件
 * 根据 corrci.config.js 文件 提取配置项到新文件中。
 */
class CorrciCliSitePlugin {
  // eslint-disable-next-line class-methods-use-this
  apply (compiler) {
    if (process.env.NODE_ENV === 'production') {
      compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, setSiteEntry)
    } else {
      compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, setSiteEntry)
    }
  }
}

exports.CorrciCliSitePlugin = CorrciCliSitePlugin
