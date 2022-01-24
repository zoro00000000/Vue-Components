// const path = require('path')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const chalk = require('chalk')
const webpackDevConfig = require('./webpack.dev')
const config = require('../config')

// webpack dev server 配置
const options = {
  port: config.dev.port,
  host: config.dev.host,
  client: {
    logging: config.dev.logging, // 日志记录
    overlay: config.dev.overlay, // 编译错误警告 是否显示全屏覆盖
    progress: config.dev.progress // 百分比显示编译进度
  },
  compress: config.dev.compress, // 开启gzip
  // 支持 history 路由模式
  // historyApiFallback: true,
  hot: config.dev.hot,
  https: config.dev.https,
  liveReload: false,
  // TODO: 临时注释
  // open: {
  //   app: {
  //     name: 'Google Chrome',
  //     arguments: ['--incognito', '--new-window']
  //   }
  // },
  allowedHosts: config.dev.allowedHosts,
  proxy: config.dev.proxy
}

const compiler = webpack(webpackDevConfig)

const server = new DevServer(options, compiler)

server.startCallback(() => {
  console.log(chalk.blue(`  dev server: ${config.dev.host}:${config.dev.port}  `))

  const localUrl = `http://${config.dev.host}:${config.dev.port}`

  console.log()
  console.log()
  console.log(`  ${chalk.green('success')}!!!!  `)
  console.log()
  console.log('  App 启动:')
  console.log(`  - 地址:   ${chalk.cyan(localUrl)}  `)
  console.log()

  const buildCommand = 'npm run build (选择项目)'
  // console.log(`  Note that the development build is not optimized. `)
  console.log(`  构建生产包, 执行 ${chalk.cyan(buildCommand)}.`)
  console.log()
})
