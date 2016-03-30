const nodeExcel = require('excel-export-xlsx');
const iconv = require('iconv-lite');
const moment = require('moment');

let excelTables = {
	'depositList': {
		headers: [
			{ header: '单位名称', field: 'company_name' },
			{ header: '项目编号', field: 'project_code' },
			{ header: '缴存账号', field: 'opposite_acct_id' },
			{ header: '缴存总额', field: 'amount', format: 'decimal' },
			{ header: '缴存笔数', field: 'deposit_count', format: 'number' },
			{ header: '缴存日期', field: 'trans_time', format: 'datetime' },
		]
	},
	'mainAcctFlows': {
		headers: [
			{ header: '银行流水号', field: 'SRVRTID' },
			{ header: '交易时间', field: 'trade_time', format: 'datetime' },
			{ header: '交易类型', field: 'TRNTYPE', transform: (cellData) => {
				if (cellData === 'CREDIT') return '收入';
				else return '支出';
			} },
			{ header: '交易金额', field: 'TRNAMT', format: 'decimal' },
			{ header: '对方账户名', field: 'CORRELATE_NAME' },
			{ header: '对方账号', field: 'CORRELATE_ACCTID' },
			{ header: '转账用途', field: 'MEMO' },
		]
	},
	'depositStat': {
		headers: [
			{ header: '项目编号', field: 'project_code' },
			{ header: '投标单位名称', field: 'company_name' },
			{ header: '中标情况', field: 'is_winner', transform: (cellData) => {
				if (cellData === 1) {
					return '是';
				} else {
					return '否';
				}
			} },
			{ header: '缴存总额', field: 'amount', format: 'decimal' },
			{ header: '缴存日期', field: 'trans_time', format: 'datetime' },
		],
		footers: [
			{ footer: '合计', headerIndex: 0 },
			{ footer: '总金额', field: 'total_amount', headerIndex: 3 },
		]
	},
	'refundStat': {
		headers: [
			{ header: '项目编号', field: 'project_code' },
			{ header: '投标单位名称', field: 'company_name' },
			{ header: '中标情况', field: 'is_winner', transform: (cellData) => {
				if (cellData === 1) {
					return '是';
				} else {
					return '否';
				}
			} },
			{ header: '退还总额', field: 'amount', format: 'decimal' },
			{ header: '退还日期', field: 'refund_time', format: 'datetime' },
		],
		footers: [
			{ footer: '合计', headerIndex: 0 },
			{ footer: '总金额', field: 'total_amount', headerIndex: 3 },
		]
	},
	'winnerStat': {
		headers: [
			{ header: '项目编号', field: 'project_code' },
			{ header: '项目名称', field: 'project_name' },
			{ header: '中标单位名称', field: 'winner_names' },
			{ header: '开标日期', field: 'open_date', format: 'datetime' },
		],
	},
};

module.exports = function (type, data, footerData) {

	if (!excelTables[type]) {
		throw new Error('找不到对应的导出表格类型');
	}

	let headers = excelTables[type].headers;
	let footers = excelTables[type].footers instanceof Array ? excelTables[type].footers: [];

	let config ={
		cols: [],
		rows: [],
	};
  	for (let item of headers){
    	config.cols.push({
      		caption: item.header,
      		type: ['string', 'number', 'bool', 'date'].indexOf(item.format) !== -1
      			? item.format : 'string',
      		beforeCellWrite: (row, cellData, eOpt) => {
      			if (cellData === null || cellData === undefined) {
      				return '';
      			}

      			switch (item.format) {
      				case 'decimal': return Number(cellData).toFixed(2); break;
      				case 'datetime': return moment(cellData).format('YYYY-MM-DD HH:mm:ss'); break;
      				case 'date': return moment(cellData).format('YYYY-MM-DD'); break;
      				default: 
      					if (!item.transform) {
      						return cellData;
      					} else {
      						return item.transform(cellData);
      					}
      			}
      		},
    	});
  	}

  	for (let item of data) {
  		let row = [];
  		for (let key in item) {
  			let index = headers.findIndex( (item) => item.field === key );
  			if (index !== -1) {
  				row[index] = item[key];
  			}
  		}
  		config.rows.push(row);
  	}

  	let footer_row = [];
  	for (let item of footers) {
  		if (!item.field) {
  			footer_row[item.headerIndex] = item.footer;
  		} else if (!footerData[item.field]) {
  			footer_row[item.headerIndex] = '';
  		} else {
  			footer_row[item.headerIndex] = footerData[item.field];
  		}
  	}
  	config.rows.push(footer_row);

  let result = nodeExcel.execute(config);
  let excel = iconv.encode(result, 'binary');
  return excel;
}