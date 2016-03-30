const xml2js = require('xml2js');

var parser = new xml2js.Parser({ explicitArray: false, explicitRoot: false });

// 返回XML的格式及编码转换
function *parse(data) {
    return new Promise(function (resolve, reject) {
    	parser.parseString(data, function (err, result) {
    	    if (err) {
    	        reject(err);
    	    } else {
    	        resolve(result);
    	    }
    	});
    }).then(function (result) {
        return result;
    }, function (err) {
        throw new Error(err);
    });
};

module.exports = {
    parse: parse
};