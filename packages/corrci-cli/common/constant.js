const {
  // readdirSync,
  existsSync,
  readFileSync,
  outputFileSync
} = require('fs-extra')

const camelizeRE = /-(\w)/g
const pascalizeRE = /(\w)(\w*)/g

function camelize (str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

function removeExt (path) {
  return path.replace('.js', '')
}

function normalizePath (path) {
  return path.replace(/\\/g, '/')
}

function pascalize (component) {
  return camelize(component).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  )
}

function decamelize (str, sep = '-') {
  return str
    .replace(/([a-z\d])([A-Z])/g, `$1${sep}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${sep}$2`)
    .toLowerCase()
}

// 导出文件
function outputFile (filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')
 
    if (previousContent === content) {
      return
    }
  }

  outputFileSync(filePath, content)
}

exports.removeExt = removeExt
exports.normalizePath = normalizePath
exports.pascalize = pascalize
exports.decamelize = decamelize
exports.outputFile = outputFile
