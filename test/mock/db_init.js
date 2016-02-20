'use strict';

const co = require('co');
const fs = require('co-fs');

const config = require('../../global.config');

module.exports = function (knex) {
    return co(function *() {

	    let modelsPath = config.app.modelsPath;
	    let files = yield fs.readdir(modelsPath);
        files.sort(function (a, b) {
            return parseInt(a.split('.')[0]) > parseInt(b.split('.')[0]);
        });
        // 遍历解析文件，导入初始数据
        for (let file of files) {

            let content = yield fs.readFile(modelsPath + '/' + file, 'utf8');
            let rows = content.split('\n');
            rows.shift(); // 去除中文表头
            let header = rows.shift().split(','); // 数据库字段表头
            
            // 解析并拼装待插入数据列表
            let insertDataList = [];
            for (let row of rows) {
            	let data = row.split(',');
            	if (header.length !== data.length) {
            		continue;
            	}
            	let insertData = {};
            	data.forEach((value, i ,array) => {
                    let parsedValue;
                    if (value.length < 10) {
                        parsedValue = parseFloat(value);
                        parsedValue = parsedValue.length === value.length ? parsedValue: undefined;
                    }
                    if (value === 'NULL') {
                        value = null;
                    }
            		insertData[header[i]] = parsedValue ? parsedValue : value;
            	});
            	insertDataList.push(insertData);
            }

            // 批量插入数据
            let tableName = file.split('.')[1];

            if (insertDataList.length === 0) {
                console.log('表' + tableName +　'无数据');
                continue;
            }

            if (tableName === 'sub_accts') {
            	for (let insertData of insertDataList) {
            		yield knex('main_accts')
            			.where('acct_id', insertData.main_acct)
            			.select().limit(1)
            			.then(function (main_accts) {
            				insertData.main_acct_id = main_accts[0].id;
            			});
            	}
            }

            yield knex(tableName).insert(insertDataList).then(function () {
        		console.log('表' + tableName +　'成功插入' + insertDataList.length + '条数据');
        	});
        }
    });
}