/*
* @Author: Rushay
* @Date:   2017-12-21 15:20:12
* @Last Modified by:   Rushay
* @Last Modified time: 2017-12-22 16:40:14
*/
'use strict';

var _rm = require('util/rm.js');

var _product = {	
	//获取商品列表
	getProductList	: function(listParam, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/product/list.do'),
			data 	: listParam,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//获取商品详细信息
	getProductDetail: function(productId, resolve, reject) {
		_rm.request({
			url 	: _rm.getServerUrl('/product/detail.do'),
			data 	: {
				productId : productId
			},
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	}
}

module.exports = _product;