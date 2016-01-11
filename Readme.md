# 概述
不像Java/C#等编程语言拥有完善的编程工具，javascript更像是黑客的语言，语言的可定制性很高，各种开发工具更是百花齐放，完全没有稳定下来的意思。
为了更好的推进javascript应用开发工程化，，需要有人专门收集和整合现有优秀的开发工具，库和UI组件等，力求做到开发效率最大化。本项目为以reactjs+webpack 的 boilerplate.

# 工具链
## webpack
webpack是一个模块化的应用软件打包工具，对javascript项目中各种资源按配置设定的规则进行模块化打包。webpack的主要概念包括：
+ code split

+ config

+ loader

+ plugin

+ devtool

** base front-end config **
```javascript

```

** base back-end config **
```javascript

```

## babel
babel 5.0是一个支持es2015的代码转换器，从6.0以后改为模块化的代码生成器，不仅可以用于将es6/7的代码转换成浏览器或者node能够执行的代码，而且通过模块化和插件化的架构实现其它类型的代码转换、代码植入等功能。在本项目中babel作为webpack的loader，在应用打包之前进行代码转换工作。使用以下预设转换器：

+ es2015
+ react


## postcss
postcss用于支持css的转换，由于css本身的设计不利于模块化和自动化，postcss通过调度插件来实现css的转换。本项目postcss作为webpack的loader，在应用打包之前对css进行转换编译。使用以下postcss插件

+ Autoprefix


# karma
karma是一个测试任务调度器，包括服务端和客户端，主要用于在真实环境下实现单元测试。（UI测试？）
 + mocha
 + chai

# gulp
gulp是一个javascipt任务调度器，实现开发过程中各种任务的定义和调度。在本项目中gulp作为项目的任务管理器，实现多项任务包括：调度webpack进行应用打包，调度karma进行自动化测试等等。


# 应用程序目录

  + project_root
    - docs  
    - build
    - src
      - client
      - server
    - gulp
      - webpack
      - karma
    - package.json
    - devserver.js
    - Dockerfile
    - docker-compose.yml
    - docker_entrypoint.sh
    - Readme.md
