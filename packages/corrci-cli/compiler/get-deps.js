// const { join } = require('path')
// const { readFileSync, existsSync } = require('fs')

// https://regexr.com/47jlq
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

function matchImports (code) {
  return code.match(IMPORT_RE) || []
}

// "import App from 'App.vue';" => "import App from 'App.xxx';"
function replaceScriptImportExt (code, from, to) {
  const importLines = matchImports(code)

  importLines.forEach(importLine => {
    const result = importLine.replace(from, to)
    code = code.replace(importLine, result)
  })

  return code
}

exports.replaceScriptImportExt = replaceScriptImportExt
