const { Command } = require('commander')

const program = new Command()
const { build } = require('./build')

program.command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build)

program.parse()
