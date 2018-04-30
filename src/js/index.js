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
	$('.ui-select').custoomSelect();

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
			width:880
		}) 
	});

	// 切换显示 普通采购 与 实单采购
	$('#caigouPop .isPlus').on('click','label',function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass('on');
		if(index == 1){
			$('#caigouPop input.plus').addClass('required');
			$('#caigouPop em.plus').removeClass('high');
		}else{
			$('#caigouPop input.plus').removeClass('required');
			$('#caigouPop em.plus').addClass('high');
		}
	});

	// 发布采购
	$('#gongyiBtn').on('click',function(){
		tools.popup({
			title:'发布供应',
			html:'#gongyiPop',
			width:880
		})
	});

	// 切换显示 普通采购 与 实单采购
	$('#gongyiPop .isPlus').on('click','label',function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass('on');
		if(index == 1){
			$('#gongyiPop input.plus').addClass('required');
			$('#gongyiPop em.plus').removeClass('high');
		}else{
			$('#gongyiPop input.plus').removeClass('required');
			$('#gongyiPop em.plus').addClass('high');
		}
	});

});
