module.exports = {
  name: 'corrci',
  build: {
    skipInstall: ['lazyload'],
    vetur: {
      tagPrefix: 'cor-',
    },
  },
  site: {
    defaultLang: 'zh-CN',
    version: [
      { label: 'v1', link: '/corrci/v1' }
    ],
    locales: {
      'zh-CN': {
        title: 'Corrci',
        nav: [
          {
            title: '开发指南',
            items: [
              {
                path: 'home',
                title: '介绍',
              },
              {
                path: 'quickstart',
                title: '快速上手',
              }
            ],
          },
          {
            title: '基础组件',
            items: [
              {
                path: 'demo',
                title: '组件 demo'
              }
            ]
          },
          {
            title: '基础组件',
            items: [
              {
                path: 'test',
                title: '组件 test'
              }
            ]
          }
        ]
      }
    }
  }
}
