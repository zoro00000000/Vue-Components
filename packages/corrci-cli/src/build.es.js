const { remove, copy, readdirSync } = require('fs-extra')
const { join } = require('path')
const { SRC_DIR, ES_DIR } = require('../common/state')
const {
  isDir,
  isSfc,
  isAsset,
  isStyle,
  isScript,
  // isDemoDir,
  // isTestDir,
  // setNodeEnv,
  setModuleEnv
} = require('../common')
const { compileJs } = require('../compiler/compile-js')
const { compileSfc } = require('../compiler/compile-sfc')
const { compileStyle } = require('../compiler/compile-style')

async function compileFile (filePath) {
  if (isSfc(filePath)) {
    return compileSfc(filePath)
  }

  if (isScript(filePath)) {
    return compileJs(filePath)
  }

  if (isStyle(filePath)) {
    return compileStyle(filePath)
  }

  if (isAsset(filePath)) {
    return Promise.resolve()
  }

  return remove(filePath)
}

/**
 * 编译函数
 * @param dir
 */
async function compileDir (dir) {
  const files = readdirSync(dir)
  
  console.log(files)

  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename)
  
      // if (isDemoDir(filePath) || isTestDir(filePath)) {
      //   return remove(filePath)
      // }
  
      if (isDir(filePath)) {
        return compileDir(filePath)
      }
  
      return compileFile(filePath)
    })
  )
}

/**
 * 构建 esmodule 文件
 */
async function buildEsModule () {
  console.log('build es module')
  setModuleEnv('esmodule')
  await copy(SRC_DIR, ES_DIR)
  await compileDir(ES_DIR) 
}

// exports.buildEsModule = buildEsModule

// 执行一下
buildEsModule()
