'use strict';

import path from 'path';
import _ from 'lodash';

const NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 应用基本配置
 */
let base = {
    app: {
        env: NODE_ENV,
        root: process.cwd(),

        clientPath: path.resolve(process.cwd(), 'src', 'client'),         // 前端代码目录
        serverPath: path.resolve(process.cwd(), 'src', 'server'),         // 后端代码目录
        modelsPath: './test/mock/base_data',                              // models 目录
        
        publicPath: '/assets/',                                           // 浏览器访问路径
        outputPath: path.resolve(process.cwd(), 'build'),                  // 项目发布路径
        clientOutputPath: path.resolve(process.cwd(), 'build', 'client'), // 前端文件发布路径
        serverOutputPath: path.resolve(process.cwd(), 'build', 'server'), // 后端文件发布路径
        
        nodeModulesPath: path.resolve(process.cwd(), 'node_modules'),     // npm 安装依赖包文件夹路径
    },
};

/**
 * 环境配置
 */
let specific = {
    development: {
        app: {
            port: 3000,
            name: 'javascript_full_stack_boilerplate - Dev',
            keys: ['javascript_full_stack_boilerplate_hurr_durr'],
        },
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'emsoft',
            database : 'js_fullstack',
        },
        mongo: {
            url: 'mongodb://localhost:27017/js_fullstack'
        },
    },
    production: {
        app: {
            port: 3000,
            name: 'javascript_full_stack_boilerplate',
            keys: ['javascript_full_stack_boilerplate_hurr_durr'],
        },
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'emsoft',
            database : 'js_fullstack_test',
        },
        mongo: {
            url: 'mongodb://localhost:27017/js_fullstack_test'
        },
    },
};

/**
 * 系统菜单权限配置
 * @attribute  id     权限id，必须唯一，一旦角色生成并配置权限后，不可轻易更改
 * @attribute  sn     权限顺序权重，权限列表将根据该字段由小到大排列
 * @attribute  name   权限标识，必须唯一
 * @attribute  id     权限描述，用于显示
 */
let permissions = {
    permissions: [
        { id: 1, sn: 10, name: 'ProjectManage', desc: '项目管理' },
        //{ id: 2, name: 'TendererManage', desc: '投标单位备案' },
        { id: 3, sn: 30, name: 'DepositQuery', desc: '开标查询' },
        { id: 4, sn: 40, name: 'DepositConfirm', desc: '手工确认' },
        { id: 5, sn: 50, name: 'MarkTenderers', desc: '中标单位标记' },
        { id: 6, sn: 60, name: 'RefundApply', desc: '退还申请' },
        { id: 7, sn: 70, name: 'RefundTransfer', desc: '资金划转' },
        { id: 8, sn: 80, name: 'RefundQuery', desc: '退还查询' },
        { id: 9, sn: 90, name: 'Statistics', desc: '综合统计' },
        //{ id: 10, sn: 100, name: 'Zones', desc: '专户明细查询' },
        //{ id: 11, sn: 110, name: 'Zones', desc: '专户信息管理' },
        { id: 12, sn: 120, name: 'Users', desc: '用户管理' },
        { id: 13, sn: 130, name: 'Zones', desc: '交易地区管理' },
        //{ id: 14, sn: 140, name: 'Users', desc: '银行流水管理' },
        { id: 15, sn: 150, name: 'Roles', desc: '权限配置' },
    ],
}

/**
 * 默认运行参数配置
 */
let sysConfig = {
    // 系统运行一些必要参数的配置
};

/**
 * 合并并返回配置对象
 */
export default _.merge(base, specific[NODE_ENV], permissions, sysConfig);