// css
require('../static/dev/less/index.less');

/*

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

	// 首页全局搜索分类
	$('.m-header .ui-select').custoomSelect({offsetY:38});

	// 首页现货供应与实单采购切换
	$('#goodsTab .name').on('click',"span",function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass();
		me.parent().siblings('.more').find('a').eq(index).show().siblings().hide();
		$('#goodsCnt').find('.rel').eq(index).show().siblings().hide();
	});

	// 首页供应与采购切换
	$('#products .hd').on('click',"span",function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass();
		$('#products').find('.rel').eq(index+1).show().siblings().hide();
	}); 
	
	// 发布采购
	$('#caigouBtn').on('click',function(){
		var HTML = $('#caigouPop').html();
		tools.popup({
			html:HTML,
			width:900,
			moveHander:'.ct',
			success:function(html){
				// custom select 
				html.find('.ui-select').custoomSelect({offsetY:28});
				// 切换显示 普通采购 与 实单采购
				html.find('.isPlus').on('click','label',function(){
					var me = $(this), index = me.index();
					me.addClass('on').siblings().removeClass('on');
					if(index == 1){
						html.find('input.plus').addClass('required');
						html.find('em.plus').removeClass('high');
					}else{
						html.find('input.plus').removeClass('required');
						html.find('em.plus').addClass('high');
					}
				});
			}
		}) 
	});

	// 发布采购
	$('#gongyiBtn').on('click',function(){
		var HTML = $('#gongyiPop').html();
		tools.popup({
			html:HTML,
			width:900,
			moveHander:'.ct',
			success:function(html){
				// custom select 
				html.find('.ui-select').custoomSelect({offsetY:28});
				// 切换显示 普通采购 与 实单采购
				html.find('.isPlus').on('click','label',function(){
					var me = $(this), index = me.index();
					me.addClass('on').siblings().removeClass('on');
					if(index == 1){
						html.find('input.plus').addClass('required');
						html.find('em.plus').removeClass('high');
					}else{
						html.find('input.plus').removeClass('required');
						html.find('em.plus').addClass('high');
					}
				});
			}
		})
	});

	// 询价
	$('#products').on('click','.xunjia',function(){
		var HTML = $('#xunjiaPop').html();
		tools.popup({
			html:HTML,
			width:900,
			moveHander:'.ct',
			success:function(html){
				// custom select 
				html.find('.ui-select').custoomSelect({offsetY:28});
				// 切换显示 普通采购 与 实单采购
				html.find('.isPlus').on('click','label',function(){
					var me = $(this), index = me.index();
					me.addClass('on').siblings().removeClass('on');
					if(index == 1){
						html.find('input.plus').addClass('required');
						html.find('em.plus').removeClass('high');
					}else{
						html.find('input.plus').removeClass('required');
						html.find('em.plus').addClass('high');
					}
				});
			}
		}) 
	});

	// 报价
	$('#products').on('click','.baojia',function(){
		var HTML = $('#baojiaPop').html();
		tools.popup({
			html:HTML,
			width:900,
			moveHander:'.ct',
			success:function(html){
				// custom select 
				html.find('.ui-select').custoomSelect({offsetY:28});
				// 切换显示 普通采购 与 实单采购
				html.find('.isPlus').on('click','label',function(){
					var me = $(this), index = me.index();
					me.addClass('on').siblings().removeClass('on');
					if(index == 1){
						html.find('input.plus').addClass('required');
						html.find('em.plus').removeClass('high');
					}else{
						html.find('input.plus').removeClass('required');
						html.find('em.plus').addClass('high');
					}
				});
			}
		}) 
	});

});


*/