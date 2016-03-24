# 概述
不像Java/C#等编程语言拥有完善的编程工具，javascript更像是黑客的语言，语言的可定制性很高，各种开发工具更是百花齐放，完全没有稳定下来的意思。
组成一个javascript全栈开发团队，不仅要有统一的编程规范，而且需要建立一个boilerplate，使用团队确定的开发工具，组件和库组合。
我们欢迎有共同观点的js程序员加入我们这个团队，同时我们保持开放的态度，欢迎和感谢来自社区的各种idea。
  
本项目包括以下内容
1. 编程语言及规范
2. 工具链
3. 前端组件
4. WEB服务
5. 代码生成器
6. 函数、模板字符串、正则表达式（模式匹配）
7. 应用程序结构及开发环境
8. 部署方案

# 1. 编程语言及规范
全面采用ES6语法及其编程规范：http://www.kancloud.cn/kancloud/javascript-style-guide/43119 或 https://github.com/airbnb/javascript .

airbnb JavaScript 规范 中文版：https://github.com/sivan/javascript-style-guide/blob/master/es5/README.md
airbnb React/JSX 规范：https://github.com/airbnb/javascript/tree/master/react
airbnb CSS/SAS 规范：https://github.com/airbnb/css
  
nodejs 6.0 LTS 基于 V8 5.0，支持es6的全部语法特性。但是前端代码需要通过babel转换为es5的语法，以保持更多的兼容性。
  
关注到事实上的标准google v8 及 microsoft typescript的发展，从目前来看在后端引入 async/await和decorator特性是可以尝试的，nodejs 7.0 stable 确定会支持async/await语法。
# 2. 工具链
## 工具链组合
我们设想的javascript全栈开发，流程如下：
    
+ 编辑
+ -> 工作调度
    + -> Build/打包
        + -> 编译/转译
    + -> 测试
        + -> BDD
        + -> UI Test
    + -> 发布
        -> Docker
        -> 补丁/migrate
            
基于以上的流程，我们设定了对应的工具链
+ 编辑器/IDE：VSC or (ATOM，Sublime Text)
+ 工作管理：Gulp
+ 打包：Webpack
+ 转译：Babel for webpack(Loader)
+ 测试：mocha，karma
+ 发布：Docker or PM2
   
## gulp

## webpack
webpack是一个模块化的应用软件打包工具，对javascript项目中各种资源按配置设定的规则进行模块化打包，本项目使用以下策略。
+ code split
  - 每个单页应用程序一个入口
  - vendor代码单独打包

+ config
  - 分为前端配置、后端配置
  - 基于策略组合
    - 环境变量：开发环境 or 部署环境
    - 编译选项


+ loader
  - babel-loader:react,es6,es7的转译
  - postcss-loader:CSS的处理
  - eslint：编译前代码检查

+ plugin
  - HotModuleReplacementPlugin
  - NoErrorsPlugin
  - CommonsChunkPlugin
  - NormalModuleReplacementPlugin
  - webpack-dev-middleware

+ devtool
  - source-map
  - eval-source-map

+ externals

```
https://webpack.github.io/docs/configuration.html
```


## babel
babel 从6.0以后改为模块化的代码生成器，不仅可以用于将es6/7的代码转换成浏览器或者node能够执行的代码，而且通过模块化和插件化的架构实现其它类型的代码转换、代码植入等功能。在本项目中babel作为webpack的loader，在应用打包之前进行代码转换工作。使用以下预设转换器：

+ es2015
+ stage-3
+ react
+ react-hmre




## postcss
postcss用于支持css的转换，由于css本身的设计不利于模块化和自动化，postcss通过调度插件来实现css的转换。本项目postcss作为webpack的loader，在应用打包之前对css进行转换编译。使用以下postcss插件

+ Autoprefixer


## karma

## vscode

### 特点
1. 完美支持javascript开发。
2. no tag page,only working files. 集中关注点。
3. git集成
4. nodejs和javacript调试集成。
5. 流畅



### 常用热键
vscode包括很多热键，一些非常用的操作可以使用菜单或command palete来实现。
  
以下常用热键分为两类：（CMD=WIN，OPT=ALT）
  
1. 经常或必须使用的功能：
    + CMD+p : 
        - filename - jump to file
        - > command palette
        - ？HELP
        - # symbol - open symbol
        - @ symbol - goto symbol
        - : number - goto line
        - ! show error and warn message
        - git command
        - task (gulp_task)
    + CMD+SHIFT+p : command palette
    + CMD+b : 边栏开关
    + CMD+\ : 分栏编辑
  
2. 通用热键：也可以用于终端或其它常用编辑器
    + CMD+a, CMD+c, CMD+c, CMD+v : 剪贴板操作
    + CMD+f, CMD+SHIFT+f, CMD+OPT+f : 查找，在项目文件中查找，替换
    + CMD+z, CMD+SHIFT+z :撤销，重做
    + CMD+s, CMD+SHIFT+s : 保存，另存
    + CTRL+TAB, CTRL+_, CTRL+SHIFT+_ : 编辑历史
    + CTRL+a, +e, +b, +f, +p, +n  : 移动到行首，行尾，<-，->，up，down
    + CTRL+k : 删除到行尾
    + CMD + delete ：删除到行首

### 代码重构
+ 多光标 
    - CMD+OPT+向上箭头
    - CMD+OPT+向下箭头
    - OPT+鼠标单击
+ 将当前行上移或下移
    - OPT+向上箭头
    - OPT+向下箭头
+ 定位到下一个错误或警告 : F8
+ 重命名变量或符号
    - F2 : in files
    - CMD+F2 : in current file
+ 查看定义
    - F12, CTRL+Click
    - CTRL+OPT+Click : open in new...
    - SHIFT+F12 : Peek 


### 代码提示


### Git

### Debug


# 2. 前端组件
## 框架
### react
### redux or relay


# 3. WEB服务
### koa

## 数据服务
### falcor
### Restful API
### mongo
### mysql

# 5. 代码生成器
## 5.1 通用操作界面的生成
### ListView/Edit
### CardViewEdit
### DetailView/Edit
### MasterDetailView/Edit

## 模型变更后的migrate
 name base or id base migrate ?
 
# 函数、模板字符串、模式匹配和正则表达式

1. 使用函数封装业务规则，实现解耦、分层和组装。避免多个业务规则混杂在一个大型的if/else结构中。
2. 使用模板字符串声明报文、sql，使得这些内容更加清晰和易于维护。
3. 

# 7. 应用程序结构及开发环境

  + project_root
    - docs  
    - build
    - src
      - client
        - app1
        - app2
      - server
        - session service
        - data service
        - buessiness service
    - webpack
    - test
    - node_modules
    - gulpfile.js
    
    - package.json
    - Dockerfile
    - docker-compose.yml
    - docker_entrypoint.sh
    - Readme.md


# 8. 部署方式
##  PM2 + database service

## PM2 + docker service

## docker 

## vagrant + VM （Windows，demo）
