/*
* @Author: Rushay
* @Date:   2017-12-14 14:21:09
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-14 14:59:51
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _rm 			= require('util/rm.js');
var _user 			= require('service/user-service.js');


// page逻辑部分
var page = {
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	bindEvent :function(){
		var _this = this;
		// 点击提交按钮之后的动作
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				password 			: $.trim($('#password').val()),
				passwordNew 		: $.trim($('#password-new').val()),
				passwordConfirm 	: $.trim($('#password-confirm').val()),
			},
			validateResult = _this.valdateForm(userInfo);
			if(validateResult.status) {
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				}, function(res,msg){
					_rm.successTips(msg);
				}, function(errMsg){
					_rm.errorTips(errMsg);
				});
			}
			else {
				_rm.errorTips(validateResult.msg);
			}
		});
	},
	valdateForm : function(formData) {
		var result = {
			status	: false,
			msg		: ''
		}
		if (!_rm.validate(formData.password, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '新密码长度不得小于6位';
			return result;
		}
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次输入的密码不一致';
			return result;
		}

		// 验证通过，返回正确提示
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	}
}

$(function(){
	page.init();
})
