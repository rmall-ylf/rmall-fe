/*
* @Author: Rushay
* @Date:   2017-12-14 09:34:08
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-14 10:48:29
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/rm.js');
var _user 			= require('service/user-service.js');
var templateIndex 	= require('./index.string');


// page逻辑部分
var page = {
	init: function() {
		this.onLoad();
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
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
}

$(function(){
	page.init();
})
