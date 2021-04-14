# react-base

### 介绍
react-base架构配置包括api、router、store、layouts等
本项目采用react技术为基础开发者没有特殊业务情况一律采用react hooks方法开发。

### 版本须知
（该部分是针对当前项目开发或者使用的库或者环境的版本声明）
1. Node v10.x
2. React v16.x

### 软件架构
本项目致力于面向企业单位及大众用户，因此架构该项目旨在产品性能，用户体验，可维护性，安全性，可读性等。

1. 技术选型。根据业务发展和团队发展决定采用了 React 技术栈，React 技术是目前前端最流行的技术，也是目前应用最广的技术并且 React 社区也相对活跃，基本上我们的项目在 React 相关问题上可以迎刃而解。

   本项目技术栈基于 [ES6]、[React]、[React-Router]、[Redux]、[redux-thunk]、[Webpack] [Ant Design] [typescript] [Scss]等。

   <span style="color: rgb(184,49,47);">点击名称可跳转相关网站 😄😄</span>

- [React](https://facebook.github.io/react/)
- [React-Router](http://react-guide.github.io/react-router-cn/docs/API.html)
- [Redux](https://redux.js.org/)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [axios](http://www.axios-js.com/)
- [Webpack](https://webpack.js.org/)
- [Ant Design](https://ant.design/)
- [typescript](https://www.tslang.cn/)

2. 脚手架。采用的是`create-react-app`官方定制的脚手架，搭建项目，并且也实现了前后端分离，底层也实现了 MVC 的设计模式。
3. 开发规范。项目采用 Eslint 和 prettier 来约束开发时的基本规范。项目严格遵守**CodeReview**规范，做到及时审核及时反馈等效果。
4. 开发工具。统一采用 Vscode 进行开发。
5. 环境管理。统一采用.env 文件方式管理环境，基本保持有 development 和 production 环境，也可以根据业务需求自定义环境。
6. 开发流程管理。项目通过 gitee 码云仓库来存储代码，并通过 jenkins 一键部署测试和线上环境等。
7. 性能测试。压力测试，在线错误收集（否），mock 系统等（后期引入）
8. env环境。通过 dotenv 插件配置env环境

### 基础掌握

 1.  基于node基础开发，需要掌握node的基础。同时使用的是yarn加载模块资源包，需要了解yarn的使用规则。使用的IDE为微软的VSCode，所以也需要掌握VSCode软件。

 2.  本版本采用的框架为react，16.13.1版本，需要掌握react开发技术基础。并且需掌握16.x版本新增特性，例如hook特性，需要注意的是，尽量使用函数编程，便于优化前端性能。

 3.  同时本版本使用了Typescript编程，需要学习和了解Typescript的语言特点和使用规则。

 4.  需要掌握redux、redux-thunk的基本知识，懂得项目路由和数据是如何传递和工作的。

 5.  对接数据接口API使用的是Axios，所以也需要了解Axios的知识要点。

    Ps.在使用redux模块对数据管理开发的过程，需要在浏览器中安装插件：[https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)

### 目录
```
├── commitlint.config.js                   //commit-msg规则配置
├── config-overrides.js                    //webpack扩展配置
├── package.json
├── paths.json                             //alias路径
├── .prettierrc.js                         //perttierrc配置文件
├── .eslintrc.js                           //eslint配置文件
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── api
│   │   ├── apiConfig
│   │   │   ├── apiBase.ts                  //api基础配置
│   │   │   ├── axios.ts                    //axios封装
│   │   │   └── interface.ts
│   │   └── apiServer
│   │       └── apiUser.ts                  //api接口
│   ├── App.test.tsx
│   ├── App.tsx                             //App可作为顶层拦截页面（如登录信息、路由、token等拦截设置）
│   ├── assets
│   ├── components
│   ├── index.tsx
│   ├── layouts                              //布局文件
│   │   ├── BasicLayout
│   │   │   ├── BasicLayout.module.scss
│   │   │   └── BasicLayout.tsx
│   │   ├── FullLayout
│   │   │   └── FullLayout.tsx
│   │   └── index.ts
│   ├── pages
│   │   ├── home
│   │   │   └── index.tsx
│   │   ├── hooksDemo                        //react hooks demo文件便参考使用
│   │   │   ├── index.tsx
│   │   │   ├── providerHoc.tsx
│   │   │   ├── store.tsx
│   │   │   └── useImperativeHandle.tsx
│   │   └── notFound
│   │       └── index.tsx
│   ├── react-app-env.d.ts
│   ├── routes                              //路由配置文件夹
│   │   ├── config.ts
│   │   └── index.tsx
│   ├── serviceWorker.ts
│   ├── setupTests.ts
│   ├── store                               //store配置文件夹
│   │   ├── index.tsx
│   │   ├── reducers.tsx
│   │   └── user
│   │       ├── actions.tsx
│   │       ├── constants.tsx
│   │       └── userReducer.tsx
│   ├── styles                              //公共样式文件夹
│   │   ├── antdTheme.js
│   │   ├── global.scss
│   │   └── normalize.css
│   ├── typings                             //ts 声明文件夹
│   └── utils                               //公共工具文件夹
├── tsconfig.json                           //ts配置文件
├── .env.development                        //测试环境 env配置文件 
├── .env.production                         //生产环境 env配置文件   
├── .env.development.local                  //本地环境 env配置文件 
└── yarn.lock

```

### 项目使用说明、相关配置、工具系列及特殊说明

（该部分是针对项目 webpack 或者其他配置特意说明，便于其他人理解和知晓）

#### <span id="目录">目录</span>

- [√ 使用说明](#-使用说明)
- [√ 环境变量配置](#-环境变量配置)
- [√ webpack配置](#-webpack配置)
- [√ 路由结构](#-路由结构)
- [√ 部分插件说明](#-部分插件说明)

#### <span id="-使用说明">☞ 使用说明</span>

```

1.  yarn install 安装所有包
2.  npm run start 运行开发环境
3.  npm run build:dev 打包测试环境文件
4.  npm run build 打包生成环境文件
```

**注意**

> 使用npm 或者yarn 需要将镜像源切换成 http://171.217.71.138:4873/

> $ npm config set registry http://171.217.71.138:4873/

[▲ 回目录](#目录)

### <span id="-环境变量配置">☞ 环境变量配置</span>

```
REACT_APP_BASE_URL= https://api.dingdangcode.cn/
REACT_APP_SCRATCH = https://scratch.dingdangcode.cn
REACT_APP_ENV=development
```
[▲ 回目录](#目录)

### <span id="-webpack配置">☞ webpack配置</span>

```
  //配置别名
  addWebpackAlias({
    ['@']: path.resolve(__dirname, 'src')
  })
```

```
  //修改主题色
  addLessLoader({
    javascriptEnabled: true,
    strictMath: true,
    noIeCompat: true,
    localIdentName: '[local]--[hash:base64:5]',
    //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
    modifyVars: {
      '@primary-color': '#8cc7b5'
    }
  })
```
```
 //build输出文件件
 const rewiredOutputPath = () => (config, env) => {
    if (env === 'production') {
       const path = require('path');
       const paths = require('react-scripts/config/paths');
       paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
       config.output.path = path.join(path.dirname(config.output.path), 'dist');
    }
  return config;
}
```
```
 //antd按需加载
 fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
 })
```
```
 //配置主题
 addLessLoader({
    modifyVars: antdTheme,
    javascriptEnabled: true
 })
```

[▲ 回目录](#目录)

### <span id="-路由结构">☞ 路由结构</span>
```
const routes: MenuBase[] = [
  // 菜单相关路由
  {
    path: '/',
    name: '首页',
    exact: true,
    layout: BasicLayout,
    component: lazy(() => import('@/pages/home'))
  },
  {
    path: '/hooksDemo',
    name: 'hooksDemo',
    exact: true,
    layout: BasicLayout,
    component: lazy(() => import('@/pages/hooksDemo'))
  },
  {
    path: '/404',
    name: '404',
    exact: true,
    component: lazy(() => import('@/pages/notFound'))
  }
];
```

[▲ 回目录](#目录)

### <span id="-部分插件说明">☞ 部分插件说明</span>

- `eslint-plugin-html`
  &nbsp;&nbsp;&nbsp;&nbsp;用于 eslint 检测 html 文件出错

- `babel-plugin-import`
  &nbsp;&nbsp;&nbsp;&nbsp;按需加载JS 和 CSS, babel 配置

- `redux-thunk`
  &nbsp;&nbsp;&nbsp;&nbsp;中间件 异步数据流

- `eslint-config-prettier`
  &nbsp;&nbsp;&nbsp;&nbsp;prettier格式化配置

- `eslint-plugin-prettier`
  &nbsp;&nbsp;&nbsp;&nbsp;Eslint prettier格式化配置

- `husky`
  &nbsp;&nbsp;&nbsp;&nbsp;git hooks钩子

- `lint-staged`
  &nbsp;&nbsp;&nbsp;&nbsp;git hooks钩子 pre-commit检查

- `@commitlint/cli"，"@commitlint/config-conventional`
  &nbsp;&nbsp;&nbsp;&nbsp;git commit message规范插件

- `react-split-pane`
  &nbsp;&nbsp;&nbsp;&nbsp;用于垂直和水平拆分模块，并实现垂直和水平拖拽模块

- `axios`
  &nbsp;&nbsp;&nbsp;&nbsp;api请求插件

- `react-document-title`
  &nbsp;&nbsp;&nbsp;&nbsp;路由title

- `react-use`
 &nbsp;&nbsp;&nbsp;&nbsp;react hooks 的一些通用方法

- `dayjs`
  &nbsp;&nbsp;&nbsp;&nbsp;轻量的时间转化插件

- `less-loader: 5.0.0`
  &nbsp;&nbsp;&nbsp;&nbsp;lees-loader需要版本控制

- `cos-js-sdk-v5`
  &nbsp;&nbsp;&nbsp;&nbsp;腾讯cos云存储sdk
- `dotenv-cli`
  &nbsp;&nbsp;&nbsp;&nbsp;用于执行env环境文件

#### 规范
##### [git commit message 规范](./GitCommit规范.md)

##### [项目规范](./项目规范.md)
