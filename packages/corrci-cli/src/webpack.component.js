const { merge } = require('webpack-merge')
const { join } = require('path')
const { getCorrciConfig, COMPONENT_DIR, LIB_DIR } = require('../common/state')
// 引入项目文件属性
const config = require('../config')

const { name } = getCorrciConfig()

console.log(name)

const entryConfig = () => ({
  [name]: join(COMPONENT_DIR, 'index.js')
})

const outputConfig = () => ({
  path: LIB_DIR, 
  library: name,
  libraryTarget: 'umd',
  filename: '[name].js',
  umdNamedDefine: true
})

const externalsConfig = () => {}

const pluginsConfig = () => false

const optimizationConfig = () => ({
  minimize: false
})

const styleLoader = loaderName => {
  const loaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
        // minimize: true
      }
    },
    'postcss-loader'
  ]
  if (loaderName && ['sass', 'less'].includes(loaderName)) {
    loaders.push(`${loaderName}-loader`)
  }
  return loaders
}

// 模块
const modulesConfig = () => ({
  rules: [
    {
      test: /\.(sa|sc|c)ss$/,
      use: styleLoader('sass')
    },
    {
      test: /\.less$/,
      use: styleLoader('less')
    }
  ]
})

const performanceConfig = () => {
  const performance = {
    // 创建超过400kb 警告
    hints: config.build.hints,
    maxEntrypointSize: config.build.maxEntrypointSize,
    maxAssetSize: config.build.maxAssetSize,
    assetFilter (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  }

  return performance
}

const webpackComponentConf = {
  mode: config.build.mode,
  devtool: config.build.devtool,
  entry: entryConfig(),
  output: outputConfig(),
  externals: externalsConfig(),
  plugins: pluginsConfig(),
  optimization: optimizationConfig(),
  module: modulesConfig()
  // 性能提示
  // performance: performanceConfig()
}

module.exports = webpackComponentConf
