const babelConfig = function (api) {
  // 动态监听 babel.config.js   
  if (api) {
    api.cache.never();
  }

  const { BABEL_MODULE } = process.env
  const useESModules = BABEL_MODULE !== 'commonjs'
  
  console.log('----ENV----:', BABEL_MODULE)
  
  return {
    presets: [
      [
        '@babel/preset-env', 
        { 
          targets: { browsers: ['last 1 Chrome versions'] },
          loose: true,
          modules: useESModules ? false : 'commonjs'
        }
      ],
      [
        '@vue/babel-preset-jsx',
        {
          // vModel: false,
          // compositionAPI: true,
          functional: true,
          injectH: true
        }
      ]
    ],
        // sourceType: 'unambiguous',
    plugins: [
      // 扩展运算符 spread
      '@babel/plugin-proposal-object-rest-spread',
      // 链式判断 ?.
      '@babel/plugin-proposal-optional-chaining',
      // '@babel/polyfill',
      '@babel/plugin-transform-runtime',
      // '@babel/plugin-transform-modules-commonjs',
      ['@babel/plugin-proposal-decorators', {
        'legacy': true
      }],
      'jsx-v-model',
      ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }, 'vant']
    ]
  }
}

module.exports = babelConfig