/*
* @Author: Rushay
* @Date:   2017-11-30 15:37:34
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-14 14:57:35
*/
'use strict';

var _rm = require('util/rm.js');

var _user = {	
	//检查登录状态
	login	: function(userInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/login.do'),
			data 	: userInfo,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//检查用户名是否存在
	checkUsername	: function(username, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/check_valid.do'),
			data 	: {
				type  	: 'username',
				str 	: username
			},
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//用户注册
	register	: function(userInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/register.do'),
			data 	: userInfo,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//检查登录状态
	checkLogin	: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/get_user_info.do'),
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	// 
	getQuestion	: function(username, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/forget_get_question.do'),
			method	: 'POST',
			data 	: {
				username : username
			},
			success : resolve,
			error 	: reject
		});
	},
	//获取密码提示问题
	checkAnswer	: function(userInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/forget_check_answer.do'),
			method	: 'POST',
			data 	: userInfo,
			success : resolve,
			error 	: reject
		});
	},
	//重设密码
	resetPassword	: function(userInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/forget_reset_password.do'),
			method	: 'POST',
			data 	: userInfo,
			success : resolve,
			error 	: reject
		});
	},
	//获取用户信息
	getUserInfo	: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/get_information.do'),
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	// 更新用户信息
	updateUserInfo : function(userInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/update_information.do'),
			method	: 'POST',
			data 	: userInfo,
			success : resolve,
			error 	: reject
		});
	},
	// 登录状态下更新密码
	updatePassword : function(userInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/user/reset_password.do'),
			method	: 'POST',
			data 	: userInfo,
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