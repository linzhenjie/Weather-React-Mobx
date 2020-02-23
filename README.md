## React结合Mobx实现的天气查询项目

调用百度API，存在跨域问题，package已设置proxy

### 执行命令

 启动：`npm run start`
 编译：`npm run build`
 代码监测： `npm run lint`


### 从0开始构建项目

1. 初始化项目并安装

```
npx create-react-app Weather-React-Mobx/
npm install mobx mobx-react --save
npm install react-app-rewired --save-dev
npm install @babel/plugin-proposal-decorators --save-dev
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

2. 修改`package.json` ，修改启动项，babel装载插件，EsLint使用prettier格式化代码

```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject",
    "lint" : "eslint ./src"
  },
  "babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  },
  "eslintConfig": {
    "extends": ["react-app", "prettier"],
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  },
  "prettier": {
    "singleQuote": true,
    "semi": false
  }
```

3. 开始撸代码吧
   
