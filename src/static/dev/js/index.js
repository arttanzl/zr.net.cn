/**
 * 描述：略
 * @authors arttanzl (630804990@qq.com)
 * @date    2017-02-21 09:41:05
 * @version version v1.0
 */
define(function(require, exports, modules){

	// 公共模块
	var $ = require("jquery");
			require("jqPlugins")($);
			require('public/jquery.cookie.js');
	var t = require("tools");
	var c = require('common');

	// 设置默认值
	var setPlaceholder = function() {
		$('body').on('focus','input',function(){
			if(this.value == $(this).attr('placeholder')){
				this.value = '';
				this.style.color = '#333';
			}
		}).on('blur','input',function(){
			if(this.value == ''){
				this.value = $(this).attr('placeholder');
				this.style.color = '#aaa';
			}
		})
	};

	// 页面代码
	$(function(){ 

		setPlaceholder();

		// 首页全局搜索分类
		$('.m-header .ui-select').selectPluging({
			"selectedShowSpan":"selectedShowSpan_search",	// 选中的文本存放容器 class样式
			"selectedShowOpts":"selectedShowOpts_search"	// 伪装列表容器 class样式
		});

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
			t.popup({
				html:HTML,
				width:900,
				title:'发布采购',
				// moveHander:'.ct',
				beforeShow:function(html){
					// custom select 
					html.find('.ui-select').selectPluging({'dis':'fiexd'});
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

		// 发布供应
		$('#gongyiBtn').on('click',function(){
			var HTML = $('#gongyiPop').html();
			t.popup({
				html:HTML,
				width:900,
				title:'<b>发布供应</b><span style="margin-left:20px; color:#ff6a00; font-size:12px;">选择产品类别后，标题可通过输入完整料号或简称自动匹配对应参数生成！或手动完整必填参数</span>',
				beforeShow:function(html){
					// custom select 
					html.find('select.cates').selectPluging({
						"selectedShowSpan":"selectedShowSpan_cate",	// 选中的文本存放容器 class样式
						"selectedShowOpts":"selectedShowOpts_cate"	// 伪装列表容器 class样式
					});
					html.find('select.default').selectPluging();
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
			t.popup({
				html:HTML,
				width:900,
				title:'发布询价',
				beforeShow:function(html){
					// custom select 
					html.find('.ui-select').selectPluging();
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
			t.popup({
				html:HTML,
				width:900,
				title:'发布报价',
				beforeShow:function(html){
					// custom select 
					html.find('.ui-select').selectPluging();
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
	
});