// css
require('../css/index.less');

// javascript
var $ = window.$ = 
require("../common/jquery.1.10.1.min.js");
require('../common/jquery.cookie.js');
require('../common/jquery.fn.js');
require('../common/heightAuto.js');
// 工具类
var tools = require('../common/tools.js');

// 页面代码
$(function(){

	// 全局搜索
	$('.m-header .ui-select').custoomSelect();

	// 首页左右切换
	$('#goodsTab .name').on('click',"span",function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass();
		me.parent().siblings('.more').find('a').eq(index).show().siblings().hide();
		$('#goodsCnt').find('.rel').eq(index).show().siblings().hide();
	});

	// 首页左右切换
	$('#products .hd').on('click',"span",function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass();
		$('#products').find('.rel').eq(index+1).show().siblings().hide();
	});
	
	// 发布采购
	$('#caigouBtn').on('click',function(){
		tools.popup({
			title:'发布采购',
			html:'#caigouPop',
			width:600
		})
	});

	// 发布采购
	$('#gongyiBtn').on('click',function(){
		tools.popup({
			title:'发布供应',
			html:'#gongyiPop',
			width:600
		})
	});

});
