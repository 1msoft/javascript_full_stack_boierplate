'use strict';

const permissions = require('../config/permissions');

module.exports = {
	getPermissions,
	findPermission,
	getPermissionWeight,
	genPermissionCode,
	getPermissionList,
};

/**
 * 获取权限列表
 * @return {Array} 权限列表
 */
function getPermissions() {
	let permissionList = permissions.sort( (a, b) => a.sn > b.sn ? 1 : -1 );
	return permissionList;
}

/**
 * 根据权限id获取权限
 * @return {Number} permissionId
 */
function findPermission(permissionId) {
	return permissions.find( (item) => item.id === permissionId );
}

/**
 * 根据权限id获取单个权限码（十进制）
 * @param  {Number} permissionId 权限id
 * @return {Number} 权限码（十进制）
 */
function getPermissionWeight(permissionId) {
	let weight = 1;
	
	if (permissionId === 1) {
		return weight;
	}

	for (let i = 1; i < permissionId; i++) {
		weight = weight * 2;
	}
	return weight;
}

/**
 * 根据权限id列表，生成角色权限码（十进制）
 * @param {Array} perimissionIds 权限id列表
 * @return {Number} 角色权限码（十进制）
 */
function genPermissionCode(permissionIds) {
	let permissionCode = 0;
	for (let permissionId of permissionIds) {
		permissionCode += getPermissionWeight(permissionId);
	}
	return permissionCode;
}

/**
 * 根据角色权限码，获取权限列表
 * @param {Number} permissionCode 角色权限码（十进制）
 * @return {Array} 权限列表
 */
function getPermissionList(permissionCode) {
	let permissionList = [];
	permissionCode = permissionCode.toString(2);

	for (let i = 0; i < permissionCode.length; i++) {
		let id = i + 1;
		let isPermitted = parseInt( permissionCode.substr(-i - 1, 1) );
		if (isPermitted) {
			permissionList.push( permissions.find( (item) => item.id === id) );
		}
	}
	return permissionList;
}