/*
* @Author: Rushay
* @Date:   2017-12-12 16:28:11
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-13 11:04:28
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _rm = require('util/rm.js');
var _user = require('service/user-service.js');
// 表单里的错误提示
var formError = {
	show : function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function() {
		$('.error-item').hide().find('.err-msg').text('');
	}
};
// page逻辑部分
var page = {
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		// 验证username
		$('#username').blur(function() {
			var username = $.trim($(this).val());
			// 用户名为空的时候不做验证
			if (!username) {
				return;
			}
			// 异步验证用户名是否存在
			_user.checkUsername(username, function(res) {
  				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		// 注册按钮的点击
		$('#submit').click(function(event) {
			/* Act on the event */
			_this.submit();
		});
		// 如果按下回车也进行提交
		$('.user-content').keyup(function(event) {
			/* Act on the event */
			if(event.keyCode === 13){
				_this.submit();
			}
		});
	},
	// 提交表单
	submit: function(){
		var formData = {
			username 		:$.trim($('#username').val()),
			password 		:$.trim($('#password').val()),
			passwordConfirm :$.trim($('#password-confirm').val()),
			phone 			:$.trim($('#phone').val()),
			email 			:$.trim($('#email').val()),
			question 		:$.trim($('#question').val()),
			answer 			:$.trim($('#answer').val())
		},
		// 表单验证结果
		validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			_user.register(formData, function(res){
				window.location.href = './result.html?type=register';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}
		// 验证失败
		else{
			// 错误提示
			formError.show(validateResult.msg);
		}
	},
	// 表单字段的验证
	formValidate: function(formData){
		var result = {
			status	: false,
			msg		: ''
		}
		if (!_rm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_rm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次输入密码不一致';
			return result;
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
	} 
}

$(function(){
	page.init();
})


