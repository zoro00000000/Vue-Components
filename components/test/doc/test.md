
# test
# 安装
```bash

npm i element-ui -S
npm i jdd-atom-ui -S

```
> `jdd-atom-ui` 是基于`element-ui`开发的更贴近业务的表单组件库，在使用`jdd-atom-ui`前先安装`element-ui`

## 引入ATOM-UI

### 完整引入

在`main.js`中写入以下内容:

```javascript
import Atom from 'jdd-atom-ui'
import 'jdd-atom-ui/lib/css/index.css'

Vue.use(Atom)

```

### 按需引入
借助[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，在 .babelrc 添加：

```json
{"plugins":  [
    "component",
    {
        "libraryName":  "jdd-atom-ui",
        "libDir": "lib",
        "styleLibrary": {
            "name": "css",
            "base": false,
            "path": "[module].css"
        }
    }
]}
```
接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import { Button, Input } from 'jdd-atom-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

```

## 全局配置
如果在组件中需要调用接口，请在注册`Atom`时，配置options
```javascript
Vue.use(Atom, {
  // 接口base_url
  BASE_URL: '//jr-martech-manager.jd.com'
})
```