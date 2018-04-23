/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-04-23 23:30:50
 * @version $Id$
 */

// 自定义 select 控伯
$.fn.custoomSelect = function(options) {
    var defaults = {};
    var opts = $.extend(defaults, options);
    // 初始化
    var init = function(o) {
    	// HOVER事件
        $(o).hover(function(){
			$(this).find('ul').show();
		},function(){
			$(this).find('ul').hide();
		});
		// 全局搜索
		$(o).on('click','li',function(){
			var me = $(this) , n = me.html() , v = me.attr('v');
			me.closest('ul').siblings('span').attr('v',v).find('b').html(n);
			me.closest('ul').hide();
		});
    };
    return this.each(function() {
        init(this);
    });
};