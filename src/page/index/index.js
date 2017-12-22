/*
* @Author: Rushay
* @Date:   2017-11-27 16:56:52
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-21 11:20:57
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var templateBanner 	= require('./banner.string');
var _rm 			= require('util/rm.js');

$(function() {
	// 渲染banner的html
	var bannerHtml 	= _rm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
    var $slider 	= $('.banner').unslider({
    	dots: true,
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function() {
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });
});