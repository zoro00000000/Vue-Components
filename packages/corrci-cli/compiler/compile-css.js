const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const CleanCss = require('clean-css')
const { POSTCSS_CONFIG_FILE } = require('../common/constant')

const cleanCss = new CleanCss()

async function compileCss (source) {
  const config = await postcssrc({}, POSTCSS_CONFIG_FILE)
  const { css } = await postcss(config.plugins).process(source, {
    from: undefined 
  })

  return cleanCss.minify(css).styles
}

exports.compileCss = compileCss
