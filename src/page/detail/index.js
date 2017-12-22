/*
* @Author: Rushay
* @Date:   2017-12-22 14:31:26
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-22 17:33:39
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _rm 			= require('util/rm.js');
var _product 		= require('service/product-service.js');
var _cart			= require('service/cart-service.js');
var templateIndex 	= require('./index.string');

// page逻辑部分
var page = {
	data : {
		productId 	: _rm.getUrlParam('productId') || ''
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	bindEvent :function(){
		var _this = this;
		// 图片预览
		$(document).on('mouseenter','.p-img-item', function(){
			var imgUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imgUrl);
		});
		// 加减号
		$(document).on('click', '.p-count-btn', function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus'){
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			} else if (type === 'minus'){
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});
		// 加入购物车
		$(document).on('click', '.cart-add', function(){
			_cart.addToCart({
				productId : _this.data.productId,
				count : $('.p-count').val()
			}, function(res) {
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg) {
				_rm.errorTips(errMsg);
			});
		});
	},
	onLoad : function(){
		// 如果没有传productId自动跳回首页
		if (!this.data.productId){
			_rm.goHome();
		}
		this.loadDetail();
 	},
	// 加载商品详情数据
	loadDetail : function(){
		var _this		= this,
			html 		= '',
			$pageWrap 	= $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_product.getProductDetail(this.data.productId, function(res){
			_this.filter(res);
			// 缓存detail数据
			_this.data.detailInfo = res;
			// render
			html = _rm.renderHtml(templateIndex, res);
			$('.page-wrap').html(html);
		}, function(errMsg){
			$('.page-wrap').html('<p class="err-tip">此商品太淘气，找不到了~</p>');
		});
	},
	filter : function(data) {
		data.subImages = data.subImages.split(',');
	}
};

$(function(){
	page.init();
})
