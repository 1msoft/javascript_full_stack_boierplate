'use strict';

let crypto = require('crypto');
let Buffer = require('buffer').Buffer;

exports.md5 = function (str) {
	let md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
}

exports.base64Encoder = function (str) {
  let enc = new Buffer(str).toString('base64');
  return enc;
}

exports.base64Decoder = function (str) {
  let dec = new Buffer(str, 'base64').toString();
  return dec;
}