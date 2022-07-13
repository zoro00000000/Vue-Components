const chokidar = require('chokidar')
const { remove, copy, readdirSync } = require('fs-extra')
const { join, relative } = require('path')
const { SRC_DIR, ES_DIR, LIB_DIR } = require('../common/state')
const { ora, consola, slimPath } = require('../common/logger')
// const { installDependencies } = require('../common/manager')
const {
  isDir,
  isSfc,
  isAsset,
  isStyle,
  isScript,
  isDemoDir,
  isTestDir,
  // setNodeEnv,
  setModuleEnv
} = require('../common')
const { clean } = require('./clean')
const { compileJs } = require('../compiler/compile-js')
const { compileSfc } = require('../compiler/compile-sfc')
const { compileStyle } = require('../compiler/compile-style')
const { makePackageEntry } = require('../compiler/make-package-entry')

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
 * 构建 EsModule
 * @returns {Promise<void>}
 */
async function buildEsModule () {
  setModuleEnv('esmodule')
  await copy(SRC_DIR, ES_DIR)
  await compileDir(ES_DIR) 
}

/**
 * 构建 commonJS
 * @returns {Promise<void>}
 */
async function buildCommonJS () {
  setModuleEnv('commonjs')
  await copy(SRC_DIR, LIB_DIR)
  await compileDir(LIB_DIR)
}

/**
 * 构建 package index.js
 * @returns {Promise<void>}
 */
async function buildPackageEntry () {
  const esEntryFile = join(ES_DIR, 'index.js')
  const libEntryFile = join(LIB_DIR, 'index.js')
  
  // 生成 package entry
  makePackageEntry({
    outputPath: esEntryFile,
    pathResolver (path) {
      return `./${relative(SRC_DIR, path)}`
    }
  })

  setModuleEnv('esmodule')
  await compileJs(esEntryFile)
  
  setModuleEnv('commonjs')
  await copy(esEntryFile, libEntryFile)
  await compileJs(libEntryFile)
}

/**
 * 任务执行列表
 * @type {Array}
 */
const tasks = [
  {
    text: 'Build EsModule Output',
    task: buildEsModule
  },
  {
    text: 'Build CommonJS Output',
    task: buildCommonJS
  },
  {
    text: 'Build Package Entry',
    task: buildPackageEntry
  }
]

/**
 * 循环执行
 * @returns {Promise<void>}
 */
async function runBuildTask () {
  for (let i = 0; i < tasks.length; i++) {
    const { task, text } = tasks[i]
    const spinner = ora(text).start()
    try {
      // eslint-disable-next-line no-await-in-loop
      await task()
      spinner.succeed(text)
    } catch (err) {
      spinner.fail(text)
      console.log(err)
      throw err
    }
  }
  consola.success('Compile successfully')
}

/**
 * 
 */
function watchFileChange () {
  consola.info('\nWatching file changes...')

  chokidar.watch(SRC_DIR).on('change', async path => {
    if (isDemoDir(path) || isTestDir(path)) {
      return
    }

    const spinner = ora('File changed, start compilation...').start()
    const esPath = path.replace(SRC_DIR, ES_DIR)
    const libPath = path.replace(SRC_DIR, LIB_DIR)

    try {
      await copy(path, esPath)
      await copy(path, libPath)
      await compileFile(esPath)
      await compileFile(libPath)
      
      spinner.succeed(`Compiled: ${slimPath(path)}`)
    } catch (err) {
      spinner.fail(`Compile failed: ${path}`)
      console.log(err)
    }
  })
}

/**
 * 执行构建
 * @returns {Promise<void>}
 */
async function build (cmd) {
  try {
    await clean()
    await runBuildTask()
    if (cmd && cmd.watch) {
      watchFileChange()
    }
  } catch (err) {
    consola.error('Build failed')
    process.exit(1)
  }
}

module.exports = build

build()
