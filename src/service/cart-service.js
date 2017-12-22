/*
* @Author: Rushay
* @Date:   2017-11-30 15:53:23
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-22 17:35:47
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
	}
}

module.exports = _cart;