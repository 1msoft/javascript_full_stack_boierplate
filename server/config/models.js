'use strict';

import 'babel-polyfill';

const knex = require('./knex');
const db_init = require('../../test/mock/db_init');

module.exports = function (isDropExist) {

    if (!isDropExist) return;
    
    console.log('开始清空数据库表...');

    knex.schema.dropTableIfExists('sub_accts').then(function (e) {
        return knex.schema.dropTableIfExists('deposits');
    }).then(function () {
        return knex.schema.dropTableIfExists('origin_deposits');
    }).then(function () {
        return knex.schema.dropTableIfExists('projects');
    }).then(function () {
        return knex.schema.dropTableIfExists('trans_flows');
    }).then(function () {
        return knex.schema.dropTableIfExists('refunds');
    }).then(function () {
        return knex.schema.dropTableIfExists('sync_logs');
    }).then(function () {
        return knex.schema.dropTableIfExists('transactions');
    }).then(function () {
        return knex.schema.dropTableIfExists('users');
    }).then(function () {
        return knex.schema.dropTableIfExists('roles');
    }).then(function () {
        return knex.schema.dropTableIfExists('operators');
    }).then(function () {
        return knex.schema.dropTableIfExists('zones');
    }).then(function () {
        return knex.schema.dropTableIfExists('main_accts');
    }).then(function () {
        console.log('数据库表已清空...');
    }).then(function () {
        console.log('创建 保证金主账户表 （ main_accts ）...');
        /**
         * 保证金主账户表
         */
        return knex.schema.createTableIfNotExists('main_accts', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('zone_name');                           // 交易地区代码
            t.string('acct_id').unique();                    // 账号
            t.string('acct_name');                           // 帐户名
            t.string('bank_name');                           // 银行
            t.string('bank_num');                            // 银行代码
            t.decimal('total_balamt', 18, 6);                // 主账户总余额
            t.decimal('avail_balamt', 18, 6);                // 主账户可用余额
            t.bigInteger('query_date');                      // 余额查询截止日期
            t.string('bank_uri');                            // 银企直联地址
            t.string('cid');                                 // 企业网银客户号，10位数字字符
            t.string('user_id');                             // 登录用户名，最长：20位
            t.string('user_pass');                           // 登录密码，最长：30位
            t.decimal('interest_rate', 18, 6).defaultTo(0);  // 日利率，默认为0
            t.boolean('query_limit').defaultTo(false);       // 是否限制开标前查询，默认为否
            t.boolean('require_auth').defaultTo(false);      // 是否登录，默认为否
            t.boolean('subacct_enabled').defaultTo(false);   // 是否启用子账户，默认为否
            t.integer('subacct_query_days');                 // 子账户查询天数
            t.integer('subacct_remain_days');                // 子账户保留天数
            t.integer('status').defaultTo(1);                // 状态：1有效 -1注销
            t.string('remark');                              // 备注
        });
    }).then(function () {
        console.log('创建 保证金虚拟子账户表 （ sub_accts ）...');
        /**
         * 保证金虚拟子账户表
         */
        return knex.schema.createTableIfNotExists('sub_accts', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('acct_id');                                                 // 账号
            t.string('main_acct');                                                 // 主账户账号
            t.string('auth_code');                                               // 授权码
            t.integer('main_acct_id').unsigned().references('main_accts.id');    // 主账户id
            t.integer('status').defaultTo(1);                                                 // 状态：1可用 -1注销 0在用
            t.string('remark');                                                  // 备注
        });
    }).then(function () {
        console.log('创建 项目信息表 （ projects ）...');
        /**
         * 项目信息表
         */
        return knex.schema.createTableIfNotExists('projects', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('project_code');                                            // 项目编号
            t.string('project_name');                                            // 项目名称
            t.string('company_name');                                            // 招标单位名称
            t.bigInteger('bzj_end_date');                                          // 保证金截止日期
            t.bigInteger('open_date');                                             // 开标日期
            t.bigInteger('bzj_start_date');                                        // 公示日期
            t.bigInteger('refund_end_date');                                        // 退款截止日期，到了时间不能做交易
            t.decimal('min_amount', 18, 6);                                        // 最低保证金
            t.integer('status').defaultTo(0);                                      // 项目状态：0未开标、1延期、2已开标、3流标、4已中标、5退款中、-1结束
            t.boolean('is_failed').default(false);                                 // 是否已流标，true已流标，false表示未流标
            t.string('bank_acct_id');                                              // 保证金账户账号
            t.string('main_acct_id');                                            // 保证金账户主账号
            t.integer('bank_acct_type');                                         // 保证金账户类型：1子账户 2主账户
            t.string('zone_name');                                               // 交易地区代码
            t.string('auth_code');                                                  //校验码
            t.string('remark');                                                  // 备注
            t.string('is_interest');                                             // 是否退息
            t.bigInteger('create_at');
            t.bigInteger('update_at');
        });        
    }).then(function () {
        console.log('创建 银行交易流水表 （ trans_flows ）...');
        /**
         * 银行交易流水表
         */
        return knex.schema.createTableIfNotExists('trans_flows', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('SRVRTID');                       // 交易序号
            t.string('TRNTYPE');                       // 交易类型（借DEBIT/贷CREDIT）
            t.string('TRNCODE');                       // 核心摘要代码
            t.string('DTACCT');                      // 记账日期
            t.decimal('TRNAMT', 18, 6);                // 交易金额
            t.decimal('BALAMT', 18, 6);                // 历史余额
            t.string('CURRENCY');                      // 币种
            t.string('MEMO', 512);                          // 摘要简称|用途
            t.string('CORRELATE_NAME', 512);                // 对方账户名称（主账户流水）
            t.string('CORRELATE_ACCTID');              // 对方账号（主账户流水）
            t.string('CORRELATE_BANKNAME');            // 对方行名（主账户流水）
            t.string('CORRELATE_BANKCODE');            // 对方行号（主账户流水）
            t.string('CHEQUENUM');                     // 本行凭证代号
            t.string('BILLTYPE');                      // 他行凭证类型
            t.string('BILLNUMBER');                    // 他行凭证号码
            t.string('BUSINESSTYPE');                  // 业务类型
            t.string('ATTACHINFO');                    // 传票组内序号组成
            t.string('MAINACCT');                      // 保证金主账号
            t.string('SUBACCT');                       // 保证金子账号（若无为空）
            t.bigInteger('trade_time');                // 记账日期（时间戳）
            t.string('FULL_SRVRTID');                // 交易日期+交易序号 
            t.integer('excluded').defaultTo(0);        // 状态: 0正常, 1排查
            //t.boolean('is_matched').defaultTo(false);   // 是否已匹配
        });
    }).then(function () {
        console.log('创建 项目保证金缴存记录表 （ deposits ）...');
        /**
         * 项目保证金缴存记录表
         */
        return knex.schema.createTableIfNotExists('deposits', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('serial_id');                                               // 缴存流水号
            t.text('trade_id');                                                // 关联银行流水号，多个以逗号分割
            t.bigInteger('trans_time');                                            // 进账时间（最后一笔缴存进账）
            t.integer('project_id').unsigned().references('projects.id');        // 招标项目：不明进账此字段为null
            t.string('acct_id');                                        // 收款方账号
            t.string('sub_acct_id');                                        // 子账户账号
            t.string('main_acct_id');                                        // 主账户账号
            t.integer('acct_type');                                        // 收款方账号类型，1主账号 2子账号
            t.string('company_name');                                            // 投标单位名称
            t.string('opposite_acct_name');                                           // 付款方名称
            t.string('opposite_acct_id');                                             // 付款方账号
            t.string('opposite_bank_name');                                      // 付款方开户行
            t.string('opposite_bank_code');                                       // 付款方银行代码
            t.decimal('amount', 18, 6);                                          // 交易总金额
            t.decimal('balance', 18, 6);                                          // 账户余额
            t.string('memo');                                                    // 用途
            t.string('match_id');                                                 // match_id
            t.integer('match_type').defaultTo(0);                                   // 流水匹配状态：1手动匹配、2自动匹配、3异常进账、4不明进账、5特殊进账排查
            t.integer('deposit_type');                                              // 缴存类型：1招投标保证金、2履约保证金、3异常进账
            t.integer('status').defaultTo(1);                                                 // 交易状态：1有效，-1无效，2已对账，默认为1；中途退款等情况，标注该字段为无效
            t.boolean('is_winner').defaultTo(false);                                               // 是否中标
            t.boolean('is_refunded').defaultTo(null);                                            // 是否退款,null未退还申请，false未退还，true已退还
            t.text('origin_serial_ids');                                       // 原始匹配缴存流水号列表, 以逗号分隔
            t.string('remark');                                                  // 备注
        });
    }).then(function () {
    //     return knex.raw('ALTER TABLE deposits MODIFY id INT ZEROFILL auto_increment;');
    // }).then(function () {
        console.log('创建 项目保证金缴存原始记录表 （ origin_deposits ）...');
        /**
         * 项目保证金缴存原始记录表
         */
        return knex.schema.createTableIfNotExists('origin_deposits', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('serial_id');                                               // 缴存流水号
            t.string('trade_id');                                           // 关联银行流水号
            t.bigInteger('trans_time');                                            // 进账时间
            t.integer('project_id').unsigned().references('projects.id');        // 招标项目：不明进账此字段为null
            t.string('acct_id');                                        // 收款方账号
            t.string('sub_acct_id');                                        // 子账户账号
            t.string('main_acct_id');                                        // 主账户账号
            t.integer('acct_type');                                        // 收款方账号类型，1主账号 2子账号
            t.string('company_name');                                            // 投标单位名称
            t.string('opposite_acct_name');                                           // 付款方名称
            t.string('opposite_acct_id');                                             // 付款方账号
            t.string('opposite_bank_name');                                      // 付款方开户行
            t.string('opposite_bank_code');                                       // 付款方银行代码
            t.decimal('amount', 18, 6);                                          // 交易金额
            t.decimal('balance', 18, 6);                                          // 账户余额
            t.string('memo');                                                    // 摘要|用途
            t.string('match_id');                                                 // match_id
            t.integer('match_type').defaultTo(0);                                   // 流水匹配状态：1手动匹配、2自动匹配、3异常进账、4不明进账、5特殊进账排查
            t.integer('deposit_type');                                              // 缴存类型：1招投标保证金、2履约保证金、3异常进账
            t.integer('status').defaultTo(1);                                                 // 交易状态：1有效，-1无效，2已对账，默认为1；中途退款等情况，标注该字段为无效
            t.boolean('is_winner').defaultTo(false);                                               // 是否中标
            t.boolean('is_refunded').defaultTo(null);                                            // 是否退款,null未退还申请，false未退还，true已退还
            t.text('origin_serial_ids');                                       // 原始匹配缴存流水号列表, 以逗号分隔
            t.string('remark');                                                  // 备注
        });
    }).then(function () {
        console.log('创建 流水同步辅助表 （ sync_logs ）...');
        /**
         * 流水同步辅助表
         */
        return knex.schema.createTableIfNotExists('sync_logs', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            //t.integer('project_id');                                             // 招标项目
            //t.string('acct_id');                                                 // 账号
            t.string('sub_acct_id');                                             // 子账户账号
            t.string('main_acct_id');                                            // 主账户账号
            //t.integer('sync_type');                                              // 同步类型：1自动同步，2手动同步
            t.bigInteger('ok_start_date');                                   // 历史成功同步开始日期
            t.bigInteger('ok_end_date');                                   // 历史成功同步结束日期
            t.bigInteger('sync_start_date');                                   // 本轮同步开始日期
            t.bigInteger('sync_end_date');                                   // 本轮同步结束日期
            t.bigInteger('start_date');                                          // 单次同步开始日期
            t.bigInteger('end_date');                                            // 单次同步结束日期
            t.integer('page').defaultTo(0);                                      // 成功同步截止页
            t.boolean('has_more_page').defaultTo(true);                          // 查询下页标识
            t.bigInteger('sync_date');                                           // 最后同步日期
            t.string('sync_msg');                                                // 同步信息
            t.integer('status').defaultTo(1);                                    // 状态：1有效 -1失效
        });
    }).then(function () {
        console.log('创建 系统银行交易记录表 （ transactions ）...');
        /**
         * 系统银行交易记录表 1子账户申请、2流水查询、3子账户本金退回、4母账户退款、5项目结束
         */
        return knex.schema.createTableIfNotExists('transactions', function(t) {
            t.charset('utf8');
            t.increments('id').primary();                                        // 流水序号
            t.integer('trans_type');                                             // 交易类型
            t.bigInteger('trans_time');                                          // 交易日期
            t.integer('trans_id');                                               // 交易关联id
        });
    }).then(function () {
        console.log('创建 角色表 （ roles ）...');
        /**
         * 角色表
         */
        return knex.schema.createTableIfNotExists('roles', function(t) {
            t.charset('utf8');
            t.increments('id').primary();                                       // id
            t.string('role_name');                                             // 角色名称
            t.string('role_desc');                                             // 角色描述
            t.bigInteger('permission_code').defaultTo(0);                       // 角色权限码（十进制）
            t.boolean('status').defaultTo(1);                                   // 状态：1可用 -1禁用
        });
    }).then(function () {
        console.log('创建 交易地区表 （ zones ）...');
        /**
         * 交易地区
         */
        return knex.schema.createTableIfNotExists('zones', function(t) {
            t.charset('utf8');
            t.increments('id').primary();                   // id
            t.string('zone_name');                          // 交易地区代码
            t.string('zone_desc');                          // 交易地区名称
            t.string('remark');                             // 备注
            t.boolean('status').defaultTo(1);               // 状态：1可用 -1禁用
        });
    }).then(function () {
        console.log('创建 用户表 （ users ）...');
        /**
         * 用户表
         */
        return knex.schema.createTableIfNotExists('users', function(t) {
            t.charset('utf8');
            t.increments('id').primary();                             // id
            t.string('username');                                     // 用户名
            t.string('name');                                         // 显示名
            t.string('password');                                     // 用户密码
            t.integer('role_id').unsigned().references('roles.id');   // 用户角色id
            t.integer('zone_id').unsigned().references('zones.id');   // 用户交易地区id
            t.boolean('status').defaultTo(1);                         // 状态：1可用 -1禁用
        });
    }).then(function () {
        console.log('创建 主账户操作员表 （ operators ）...');
        /**
         * 操作员表
         */
        return knex.schema.createTableIfNotExists('operators', function(t) {
            t.charset('utf8');
            t.increments('id').primary();                     // id
            t.string('operator_name');                          // 用户名
            t.string('operator_role');                       // 用户角色，N经办，M复核
            t.integer('main_acct_id').unsigned().references('main_accts.id'); // 主账户id
            t.boolean('status').defaultTo(1);                 // 状态：1可用 -1禁用
        });
    }).then(function () {
        console.log('创建 保证金退款流水表 （ refunds ）...');
        /**
         * 保证金退款流水表
         */
        return knex.schema.createTableIfNotExists('refunds', function(t) {
            t.charset('utf8');
            t.increments('id').primary();
            t.string('serial_id');                                               // 退款流水号：退款申请发起时生成
            t.string('batch_serial_id');                                               // 退款流水号：退款申请发起时生成
            t.bigInteger('refund_time');                                           // 退款时间
            t.integer('refund_type');                                            // 退款类型：1正常退款、2异常进账退款、3不明进账退款、4中途退款、5其他途径退款
            t.string('deposit_serial_id');                                       // 关联系统单笔缴存流水号
            t.integer('deposit_id');                                             // 关联系统汇总缴存流水id
            t.decimal('income_amount', 18, 6);                                   // 流水进账金额
            t.decimal('interest_amount', 18, 6);                                 // 利息金额
            t.decimal('total_amount', 18, 6);                                    // 退款金额
            t.integer('status');                                                 // 新版状态：0待审核，-1审核不通过，-2退款异常，1退款中，2退款成功，3退款失败，4已对账
            t.string('comment');                                                 // 审核意见
            t.string('reason');                                                 // 退款原因
            t.string('remark');                                                  // 备注
            t.bigInteger('apply_time');                                           // 申请时间
            t.string('creator');                                                 // 申请人
            t.integer('creator_id').unsigned().references('users.id');         // 申请人id
            t.string('auditor');                                                 // 审核人
            t.integer('auditor_id').unsigned().references('users.id');         // 审核人id
            t.integer('operator_id').unsigned().references('operators.id');     // 操作员id
        });
    }).then(function () {
        console.log('数据库建表完成！');
    }).then(function () {
        console.log('开始插入基础数据...');
        return db_init(knex);
    }).then(function () {
        console.log('插入基础数据完成！');
    }).catch(function (e) {
        console.error(e.stack);
    });


    // knex.schema.hasTable('refunds').then(function () {
    //     if () { return; }
    //     /**
    //      * 项目保证金缴存记录表
    //      */
    //     return knex.schema.createTable('refunds', function(t) {
    //         t.increments('id').primary();
    //         t.string('serial_id');                  // 退款流水号：退款申请发起时生成
    //         t.dateTime('refund_time');              // 退款时间
    //         t.integer('refund_type');        // 退款类型：1正常退款、2异常进账退款、3不明进账退款、4中途退款、5其他途径退款
    //         t.string('deposit_serial_id');          // 关联系统流水号
    //         t.string('opposite_acct_id');          
    //         t.decimal('income_amount', 12, 2);             // 流水进账金额
    //         t.decimal('interest_amount', 12, 2);   // 利息金额
    //         t.decimal('total_amount', 12, 2);               // 退款金额
    //         t.integer('status');        // 状态：0待审核，-1审核不通过，1退款成功，2退款失败，3重新发起本次注销，4已对账
    //         t.string('comment'); // 审核意见
    //         t.string('remark');  // 备注
    //         t.timestamps();
    //     });
    // }).catch(function (e) {
    //     console.error(e);
    // });
}