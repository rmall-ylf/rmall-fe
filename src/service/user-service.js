/*
* @Author: Rushay
* @Date:   2017-11-30 15:37:34
* @Last Modified by:   Rushay
* @Last Modified time: 2017-11-30 17:08:35
*/
'use strict';

var _rm = require('util/rm.js');

var _user = {
	//检查登录状态
	checkLogin	: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/get_user_info.do'),
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//登出
	logout	: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/logout.do'),
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	}
}

module.exports = _user;