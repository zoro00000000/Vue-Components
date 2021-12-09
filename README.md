# corrci-ui #
❌✅❎❗️❕ℹ️

# 柯基UI，谐音科技，基于金融消金业务沉淀的中型基础UI组件，组件带有相应的业务逻辑，无脑式直接引用。 ##

## 项目结构 ##

```
━━Vue project━━
    ┣━build
    ┃   ┣━ webpack的配置文件
    ┃   ┗━ 其他辅助文件
    ┣━config
    ┃   ┗━ 各环境基础配置文件
    ┣━docker
    ┃   ┗━ JD docker构建配置文件
    ┣━public
    ┃   ┗━ HTML 文件 (dev-server使用)
    ┣━VCM
    ┃   ┗━ Version Control Management 版本控制管理
    ┣━src
    ┃   ┣━ base
    ┃   ┃   ┗━ font 通用字体引入
    ┃   ┣━ app
    ┃   ┃   ┗━ 所有子项目的文件夹
    ┃   ┗━ server
    ┃   ┃   ┗━ http 请求方法1
    ┃   ┗━ services
    ┃   ┃   ┗━ http 请求方法2
    ┃   ┗━ utils
    ┃   ┃   ┣━ generalJSBridge 统一桥方法
    ┃   ┃   ┣━ layout 通用UI组件
    ┃   ┃   ┣━ lodash 节流/防抖
    ┃   ┃   ┣━ widget 小组件
    ┃   ┃   ┃   ┣━ masonry 瀑布流组件
    ┃   ┃   ┃   ┗━ skeleton 骨架屏组件
    ┃   ┃   ┣━ calculator 重写计算器
    ┃   ┃   ┣━ getQueryParams 从URL获取参数
    ┃   ┃   ┣━ getSDKToken 金融环境下获取风控参数
    ┃   ┃   ┣━ formRule form表单校验方法
    ┃   ┃   ┣━ getQueryParams 获取url参数方法
    ┃   ┃   ┣━ tracker 埋点方法
    ┃   ┃   ┣━ transformLink 转链方法
    ┃   ┗━  ┗━ webviewTester webview环境监测方法
    ┣━static
    ┃   ┗━ 无需构建的静态文件
    ┣━template
    ┃   ┗━ vue 项目基础模板
    ┣━  .browserslistrc
    ┣━  .editorconfig
    ┣━  .env
    ┣━  .eslintgonre
    ┣━  .eslintrc.js
    ┣━  .gitgnore
    ┣━  .prettierignore
    ┣━  .babel.config.js
    ┣━  package.json
    ┣━  postcss.config.js
    ┗━  README.md
```

## 编写 md-loader ##

```
基于：
node.js (path, fs, os)
loader-utils
front-matter
markdown-it
markdown-it-anchor
transliteration
highlight.js
```

## 不确定是否使用的插件 ##

```
```

## 待完成的优化配置 ##

```
-- 将所有配置参数提取到 config 文件中
-- 代码压缩配置
```

## vue + vue-router + vuex + axios 的配置

```
✅ vue
✅ vue-router
✅ vuex
✅ axios
```

## 项目依赖 安装 ##

**安装依赖**

✅ npm install

**启本地服务**

```
✅ npm run dev 【测试环境】  选择需要启动的项目
✅ npm run dev:staging 【预发环境】  选择需要启动的项目
✅ npm run dev:prod 【生产环境】  选择需要启动的项目
```

**打包项目**

```
✅ npm run build 【构建生产包】
✅ npm run build:test 【构建测试包】
✅ npm run build:staging 【构建预发包】
```

**上传项目测试环境**

✅ npm run upload 选择要上传的项目

**build后的文件合并替换release文件夹中，上线流程**

✅ npm run upload:prod 选择要上传的项目

**新建项目**

✅ npm run new:project 创建新的项目 在 src/app 文件夹内

### 重点注意 ###

```
```

**未来计划**

```
```

### 架子修改为 多项目架构 ###

### utils widge ###

```
❌ masonry     瀑布流
✅ skeleton    骨架屏
```