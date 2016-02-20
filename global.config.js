'use strict';

const path =require('path');
const _ = require('lodash');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 应用基本配置
 */
let base = {
    app: {
        root: process.cwd(),
        env: env,
        modelsPath: './data/base_data',// models 目录
    },
    interface: {
        switch: true,                  // 是否开启接口，true开启，false关闭
        debug: false,                  // 接口调试开关，开启时返回测试报文数据
        port: 7007,                     // 接口监听端口
        protocolType: 'tcp',            // 接口传输协议，tcp/http
        interfaceDir: '../',           // 保证金接口目录
        interfaceName: 'interface_epoint', // 保证金接口文件夹，如 interface_sx/interface_epoint
    },
};

/**
 * 环境配置
 */
let specific = {
    development: {
        app: {
            port: 3000,
            name: '招投标保证金管理系统 - Dev',
            keys: ['bid-bond-secret-hurr-durr'],
        },
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'emsoft',
            database : 'bid_bond',
        },
    },
    production: {
        app: {
            port: 3000,
            name: '招投标保证金管理系统',
            keys: ['bid-bond-secret-hurr-durr'],
        },
        mysql: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'emsoft',
            database : 'bid_bond',
        },
    },
};

/**
 * 默认运行参数配置
 */
let sysConfig = {
    syncStartDate: '2015-05-10',             // 主账户流水同步开始日期，必填，不超过当前日期
    subAcctQueryDays: 15,                    // 子账户查询天数，必填
    subAcctRemainDays: 15,                   // 子账户保留天数，必填
    maxSyncDays: 80,                         // 单次最大同步天数，必填，一般不用修改

    interestRate: 0.005,                     // 保证金日利率
    depositTableName: 'origin_deposits',     // 缴存记录表
    limitPerPage: 20,                        // 分页默认每页数据条数
};

/**
 * 合并并返回配置对象
 */
module.exports = _.merge(base, specific[env], sysConfig);