/*
* @Author: Rushay
* @Date:   2017-12-08 11:31:56
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-08 12:02:47
*/
'use strict';
require('./index.css');
var navSide = require('page/common/nav-simple/index.js');
var _rm = require('util/rm.js');

$(function(){
	var type 		= _rm.getUrlParam('type') || 'default',
		$element 	= $('.' + type + '-success');
	// 显示对应的提示元素
	$element.show();
})