/*
* @Author: Rushay
* @Date:   2017-12-13 14:41:15
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-13 17:39:12
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
	data : {
		username 	: '',
		question 	: '',
		answer 		: '',
		token 		: ''
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this = this;
		// 输入用户名下一步按钮的点击
		$('#submit-username').click(function(event) {
			/* Act on the event */
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入用户名');
			}
		});
		// 输入密码提示问题答案中的按钮点击
		$('#submit-question').click(function(event) {
			/* Act on the event */
			var answer = $.trim($('#answer').val());
			if (answer) {
				_user.checkAnswer({
					username 	: _this.data.username,
					question 	: _this.data.question,
					answer		: answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				}, function(errMsg){
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入密码提示问题答案');
			}
		});
		// 输入新密码后的按钮点击
		$('#submit-password').click(function(event) {
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				_user.resetPassword({
					username 		: _this.data.username,
					passwordNew 	: password,
					forgetToken			: _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset-success';
				}, function(errMsg){
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	// 加载输入用户名的一步
	loadStepUsername: function() {
		$('.step-username').show();
	},
	// 加载输入提示答案密码的一步
	loadStepQuestion: function() {
		// 清除错误提示
		formError.hide();
		// 
		$('.step-username').hide()
		.siblings('.step-question').show()
		.find('.question').text(this.data.question);


	},
	// 加载输入新密码的一步
	loadStepPassword: function() {
		// 清除错误提示
		formError.hide();
		// 
		$('.step-question').hide()
		.siblings('.step-password').show();
	}
}

$(function(){
	page.init();
})


