/*
* @Author: Rushay
* @Date:   2017-12-14 09:40:09
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-14 14:47:33
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _rm 			= require('util/rm.js');
var _user 			= require('service/user-service.js');
var templateIndex 	= require('./index.string');


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
				phone 		: $.trim($('#phone').val()),
				email 		: $.trim($('#email').val()),
				question 	: $.trim($('#question').val()),
				answer 		: $.trim($('#answer').val()),
			},
			validateResult = _this.valdateForm(userInfo);
			if(validateResult.status) {
				_user.updateUserInfo(userInfo, function(res){
					_rm.successTips();
					window.location.href = './user-center.html';
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
		if (!_rm.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		if (!_rm.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if (!_rm.validate(formData.question, 'require')) {
			result.msg = '密码提示不能为空';
			return result;
		}
		if (!_rm.validate(formData.answer, 'require')) {
			result.msg = '密码提示答案不能为空';
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
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _rm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_rm.errorTips(errMsg);
		});
	}
}

$(function(){
	page.init();
})
