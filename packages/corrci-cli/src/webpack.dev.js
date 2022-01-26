const path = require('path')
const { merge } = require('webpack-merge')

const webpackBaseConf = require('./webpack.base')
// 引入项目文件属性
const config = require('../config')

const styleLoader = name => {
  const loaders = [
    'vue-style-loader',
    'css-loader',
    'postcss-loader'
  ]
  if (name && ['sass', 'less'].includes(name)) {
    loaders.push(`${name}-loader`)
  }
  return loaders
}

// 模块
const modulesConfig = () => ({
  rules: [
    {
      test: /\.css$/,
      use: styleLoader()
    },
    {
      test: /\.(sa|sc)ss$/,
      use: styleLoader('sass')
    },
    {
      test: /\.less$/,
      use: styleLoader('less')
    }
  ]
})

// 输出
const outputConfig = () => ({
  // 如果有项目名 输出单个项目
  // path: path.join(__dirname, '../../../../dist'),
  // filename: './js/[name].js',
  chunkFilename: '[name].js',
  // 性能优化1
  pathinfo: false
})

// 插件
const pluginsConfig = () => [
  // 热更新
  // new webpack.HotModuleReplacementPlugin()
]

const webpackDevConf = {
  mode: config.dev.mode,
  devtool: config.dev.devtool,
  // entry: entryPath,
  output: outputConfig(),
  plugins: pluginsConfig(),
  // 性能优化2
  optimization: config.dev.optimization,
  module: modulesConfig()
}

// 合并配置文件
const newConf = merge(webpackBaseConf, webpackDevConf)

module.exports = newConf
