const {
  // readdirSync,
  existsSync,
  readFileSync,
  writeFile
} = require('fs')

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

// 导出文件
function outputFile (filePath, content) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8')

    if (previousContent === content) {
      return
    }
  }

  writeFile(filePath, content, err => {
    if (err) throw err
    console.log(`生成文件成功！！！！${filePath}`)
  })
}

exports.removeExt = removeExt
exports.normalizePath = normalizePath
exports.pascalize = pascalize
exports.outputFile = outputFile
