// css
require('../css/index.less');

// javascript
var $ = window.$ = 
require("../common/jquery.1.10.1.min.js");
require('../common/jquery.cookie.js');
require('../common/jquery.fn.js');
require('../common/tools.js');
require('../common/heightAuto.js');

// 页面代码
$(function(){

	// 全局搜索
	$('.m-header .ui-select').custoomSelect();

	// 首页左右切换
	$('#products .hd').on('click',"span",function(){
		var me = $(this), index = me.index();
		me.addClass('on').siblings().removeClass();
		$('#products').find('.rel').eq(index+1).show().siblings().hide();
	});
	
});
