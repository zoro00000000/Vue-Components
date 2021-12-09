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
    desktop: path.join(__dirname, '../../../examples/desktop/main.js')
    // mobile: path.join(__dirname, '../../../examples/mobile/main.js')
}

const HTMLPlugin = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../../examples/desktop/index.html'),
        title: 'desktop page',
        filename: 'index.html',
        publicPath: './desktop',
        hash: false,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../../examples/mobile/index.html'),
        title: 'mobile page',
        filename: 'mobile.html',
        publicPath: './mobile',
        hash: false,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    })
]

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
                    options: {
                        // 去除模板中的空格
                        preserveWhitespace: false,
                        loaders: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            test: /\.md$/,
            use: [
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
    extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.vue'],
    alias: {
        '@plugins': path.resolve('src/plugins'),
        '@config': path.resolve('config'),
        '@': path.resolve('src/app'),
        '@utils': path.resolve('src/utils'),
        '@base': path.resolve('src/base')
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
        new VueLoaderPlugin()
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
