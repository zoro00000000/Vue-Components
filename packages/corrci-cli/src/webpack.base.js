// import { SITE_DESKTOP_SHARED_FILE } from '../common/constant'
// import { CorrciCliSitePlugin } from '../compiler/corrci-cli-site-plugin'

const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
// const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const process = require('process')
// 引入项目文件属性 
const utils = require('./utils')

// 初始化 node Env
utils.initNodeEnv()

const entryPath = {
  desktop: path.join(__dirname, '../site/desktop/main')
  // mobile: path.join(__dirname, '../../../examples/mobile/main.js')
}

const HTMLPlugin = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../site/desktop/index.html'),
    title: 'desktop page',
    filename: 'index.html',
    publicPath: './',
    hash: false,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  })
  // new HtmlWebpackPlugin({
  //   template: path.resolve(__dirname, '../../../examples/mobile/index.html'),
  //   title: 'mobile page',
  //   filename: 'mobile.html',
  //   // publicPath: './mobile',
  //   hash: false,
  //   inject: true,
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true
  //   }
  // })
]

const CACHE_LOADER = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.join(__dirname, 'node_modules/.cache')
  }
}

const VUE_LOADER = {
  loader: 'vue-loader',
  options: {
    compilerOptions: {
      preserveWhitespace: false
    }
  }
}

// 模块
const moduleConfig = () => ({
  rules: [
    {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      include: [
        /src\/app/,
        /src\/server/,
        /src\/services/,
        /src\/utils/
      ],
      use: [
        'babel-loader',
        { // 条件编译处理
          loader: 'webpack-preprocessor-loader',
          options: {
            params: {
              isVue: true,
              isReact: false
            }
          }
        }
      ]
    },
    {
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          // options: {
          //   // 去除模板中的空格
          //   preserveWhitespace: false,
          //   loaders: [
          //     'style-loader',
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         modules: true
          //       }
          //     },
          //     {
          //       loader: 'sass-loader',
          //       options: {
          //         sourceMap: true
          //       }
          //     },
          //     {
          //       loader: 'less-loader'
          //     }
          //   ]
          // }
        }
      ]
    },
    {
      test: /\.md$/,
      use: [
        CACHE_LOADER,
        VUE_LOADER,
        {
          loader: path.resolve(__dirname, '../../corrci-md-loader/src/index.js')
        }
      ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[hash][ext][query]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      exclude: /node_modules/,
      include: [
        /src\/app/,
        /src\/base/
      ],
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[hash][ext][query]'
      }
    }
  ]
})

// 解析
const resolveConfig = () => ({
  modules: [
    'node_modules'
  ],
  extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.vue', '.less'],
  alias: {
    '@plugins': path.resolve('src/plugins'),
    '@config': path.resolve('config'),
    '@': path.resolve('src/app'),
    '@utils': path.resolve('src/utils'),
    '@base': path.resolve('src/base'),
    // 'site-desktop-shared': SITE_DESKTOP_SHARED_FILE
  }
})

// plugins
const pluginsConfig = () => {
  const basePlugin = [
    new ProgressBarPlugin({
      format: `${chalk.blue.bold('  构建中 [:bar] ') + chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      width: 100
    }),
    new webpack.DefinePlugin({
      // 'process.env': config.dev.env,
      'process.env.VUE_APP_BUILD_ENV': JSON.stringify(process.env.VUE_APP_BUILD_ENV)
    }),
    new VueLoaderPlugin(),
    // 引入 plugin 提前根据配置文件生成 entry 文件
    // new CorrciCliSitePlugin()
  ]

  return [].concat(HTMLPlugin, basePlugin)
}

const webpackBaseConf = {
  entry: entryPath,
  module: moduleConfig(),
  resolve: resolveConfig(),
  plugins: pluginsConfig(),
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true
  }
}

module.exports = webpackBaseConf
