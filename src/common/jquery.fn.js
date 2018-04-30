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
    	var height = $(o).outerHeight()-2;
    	// HOVER事件
        $(o).hover(function(){
			$(this).find('ul').show().css({'z-index':9,position:'absolute',left:'-1px',top:height});
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