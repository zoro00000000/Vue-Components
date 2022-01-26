const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
// 压缩 JS 插件
const TerserPlugin = require('terser-webpack-plugin')
// 压缩 CSS 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBaseConf = require('./webpack.base')
// 引入项目文件属性
const config = require('../config')

// 输出
const outputConfig = () => {
  const output = {
    path: path.join(__dirname, '../../../dist'),
    filename: './js/[name].[chunkhash:8].js',
    // publicPath: '',
    chunkFilename: './js/[name].[chunkhash:8].bundle.js'
  }

  return output
}

// plugins
const pluginsConfig = () => {
  const plugins = [
    new MiniCssExtractPlugin({
      experimentalUseImportModule: true,
      filename: './styles/[name].[chunkhash:8].css',
      chunkFilename: './styles/[id].[chunkhash:8].css'
    }),
    // 复制自定义的不需要build的静态资源
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../../static'),
          to: 'static'
        }
      ]
    })
  ]

  return plugins
}

// 优化
const optimizationConfig = () => {
  const optimization = {
    minimize: config.build.minimize,
    minimizer: [
      // 压缩js插件 覆盖默认压缩工具
      new TerserPlugin({
        parallel: true, // 使用多进程提高构建速度
        // sourceMap: false,   
        terserOptions: {
          parse: {},
          compress: {
            pure_funcs: process.env.VUE_APP_BUILD_ENV === 'prod' ? ['console.log', 'debugger'] : []
          }
        },
        extractComments: false // 是否将注释提取到单独的文件中
      })
    ],
    concatenateModules: config.build.concatenateModules,
    // moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all', // 需要优化的模块
      minSize: {
        javascript: 50000,
        webassembly: 50000
      },
      minChunks: 1, // 分割前必须共享模块的最小块数
      maxSize: {
        javascript: 200000,
        webassembly: 500000
      },
      maxAsyncRequests: 8, // 按需加载时的最大并行请求数
      maxInitialRequests: 8, // 入口点处的最大并行请求数
      cacheGroups: { // 缓存组可以继承/覆盖任何选项
        // 相同代码提取
        common: {
          name: 'common',
          chunks: 'all', // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
          minChunks: 2, // 模块引用两次以上的抽到 common 中
          priority: -20
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial', // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all
          priority: -10
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
  return optimization
}

const styleLoader = name => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
        // minimize: true
      }
    },
    'postcss-loader'
  ]
  if (name && ['sass', 'less'].includes(name)) {
    loaders.push(`${name}-loader`)
  }
  return loaders
}

// 模块
const modulesConfig = () => {
  const modules = {
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
  }
  return modules
}

// 性能
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

const webpackProdConf = {
  mode: config.build.mode,
  devtool: config.build.devtool,
  output: outputConfig(),
  plugins: pluginsConfig(),
  optimization: optimizationConfig(),
  module: modulesConfig(),
  // 性能提示
  performance: performanceConfig()
}

// 合并 webpack 配置文件
const webpackConfig = merge({ mode: 'production' }, webpackBaseConf, webpackProdConf)

// 开启 gzip 的配置文件
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      test: /\.js$|\.css$|\.html$/,
      cache: true,
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
