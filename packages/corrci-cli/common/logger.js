const ora = require('ora')
const chalk = require('chalk')
const consola = require('consola')
const { ROOT } = require('./state')

function slimPath (path) {
  return chalk.yellow(path.replace(ROOT, ''))
}

exports.slimPath = slimPath
exports.ora = ora
exports.consola = consola
