const { get } = require('lodash')
const { getCorrciConfig } = require('./state')

function getCssLang () {
  const corrciConfig = getCorrciConfig()
  const preprocessor = get(corrciConfig, 'build.css.preprocessor', 'less')
  
  if (preprocessor === 'sass') {
    return 'scss'
  }
  
  return preprocessor
}

const CSS_LANG = getCssLang()

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

// "import 'a.less';" => "import 'a.css';"
function replaceCssImportExt (code) {
  return code.replace(IMPORT_STYLE_RE, str => str.replace(`.${CSS_LANG}`, '.css'))
}

exports.CSS_LANG = CSS_LANG
exports.replaceCssImportExt = replaceCssImportExt
