/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-04-23 23:30:50
 * @version $Id$
 */

// 自定义 select 控伯
$.fn.custoomSelect = function(options) {
	// opts.offsetX 偏移值
	// opts.offsetY 偏移值
    var defaults = {};
    var opts = $.extend(defaults, options);
    // 初始化
    var init = function(o) {
    	var offsetY = opts.offsetY ? opts.offsetY : 0;
    	// HOVER事件
        $(o).hover(function(){
			$(this).find('ul').show().css({'z-index':9,position:'absolute',left:'-1px',top:offsetY});
		},function(){
			$(this).find('ul').hide();
		});
		// 全局搜索
		$(o).on('click','li',function(e){
			var me = $(this) , n = me.html() , v = me.attr('v') , ul = me.closest('ul');
			ul.siblings('input').val(v);
			ul.siblings('span').find('b').html(n);
			ul.hide();
			if (e.preventDefault) {
		        e.preventDefault();
		    } else {
		        e.returnValue = false;
		    }
		    if (e.stopPropagation) {
		        e.stopPropagation();
		    } else {
		        e.cancelBubble = true;
		    }
		});
    };
    return this.each(function() {
        init(this);
    });
};