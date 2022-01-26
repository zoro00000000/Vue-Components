import Vue from 'vue'
import PackageEntry from './package-entry'

import Demo from '/Users/haoliang6/code/project/Vue-Components/components/demo/demo/index.vue'
import Test from '/Users/haoliang6/code/project/Vue-Components/components/test/demo/index.vue'

Vue.use(PackageEntry)

Demo.name = 'demo-demo'
Test.name = 'demo-test'

export const demos = {
  Demo,
  Test
}
export const config = {
  "name": "corrci",
  "site": {
    "defaultLang": "zh-CN",
    "version": [
      {
        "label": "v1",
        "link": "/corrci/v1"
      }
    ],
    "locales": {
      "zh-CN": {
        "title": "Corrci",
        "nav": [
          {
            "title": "基础组件",
            "items": [
              {
                "path": "demo",
                "title": "组件 demo"
              }
            ]
          },
          {
            "title": "基础组件",
            "items": [
              {
                "path": "test",
                "title": "组件 test"
              }
            ]
          }
        ]
      }
    }
  }
}
