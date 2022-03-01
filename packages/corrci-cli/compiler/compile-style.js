const { parse } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const consola = require('consola')
const { replaceExt } = require('../common')
const { compileCss } = require('./compile-css')
const { compileLess } = require('./compile-less')
const { compileSass } = require('./compile-sass')

async function compileFile (filePath) {
  const parsedPath = parse(filePath)

  try {
    if (parsedPath.ext === '.less') {
      const source = await compileLess(filePath)
      return await compileCss(source)
    }

    if (parsedPath.ext === '.scss') {
      const source = await compileSass(filePath)
      return await compileCss(source)
    }

    const source = readFileSync(filePath, 'utf-8')
    return await compileCss(source)
  } catch (err) {
    consola.error(`Compile style failed: ${filePath}`)
    throw err
  }
}

async function compileStyle (filePath) {
  const css = await compileFile(filePath)

  writeFileSync(replaceExt(filePath, '.css'), css)
}

exports.compileStyle = compileStyle
