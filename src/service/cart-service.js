/*
* @Author: Rushay
* @Date:   2017-11-30 15:53:23
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-24 19:46:17
*/
'use strict';

var _rm = require('util/rm.js');

var _cart = {
	//获取购物车数量
	getCartCount	: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error 	: reject
		});
	},
	//加入购物车
	addToCart		: function(productInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/add.do'),
			method	: 'POST',
			data 	: productInfo,
			success : resolve,
			error 	: reject
		});
	},
	//获取购物车列表
	getCartList		: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/list.do'),
			success : resolve,
			error 	: reject
		});
	},
	//选择购物车商品
	selectProduct		: function(productId, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/select.do'),
			method	: 'POST',
			data 	: {
				productId : productId
			},
			success : resolve,
			error 	: reject
		});
	},
	//取消选择购物车商品
	unselectProduct		: function(productId, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/un_select.do'),
			method	: 'POST',
			data 	: {
				productId : productId
			},
			success : resolve,
			error 	: reject
		});
	},
	//选中全部商品
	selectAll		: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/select_all.do'),
			success : resolve,
			error 	: reject
		});
	},
	//取消选中全部商品
	unselectAll		: function(resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/un_select_all.do'),
			success : resolve,
			error 	: reject
		});
	},
	//更新购物车商品数量
	updateProduct	: function(productInfo, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/update.do'),
			method	: 'POST',
			data 	: productInfo,
			success : resolve,
			error 	: reject
		});
	},
	// 删除商品
	deleteProduct 	: function(productIds, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/cart/delete_product.do'),
			method	: 'POST',
			data 	: {
				productIds : productIds
			},
			success : resolve,
			error 	: reject
		});
	}
}

module.exports = _cart;