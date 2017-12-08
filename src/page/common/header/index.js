/*
* @Author: Rushay
* @Date:   2017-12-07 15:33:34
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-07 16:58:59
*/
'use strict';
require('./index.css');

var _rm 	= require('util/rm.js');
//通用页面头
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _rm.getUrlParam('keyword');
		// keyword存在， 则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent :function(){
		var _this = this;
		// 点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			// 13是回车键的keycode
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	// 搜索的提交
	searchSubmit :function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword，正常跳转到list页
		if(keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		}
		//  如果keyword为空，直接返回首页
		else {
			_rm.goHome();
		}
	}
};

header.init();