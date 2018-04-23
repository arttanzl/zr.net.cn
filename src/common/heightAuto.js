/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-18 13:47:06
 * @version $Id$
 */


//底部永远在最下面（自适应框架）:
var AutoFoot = function(n) {
    var w_h = $(window).height();
    var h_h = $('.m-header').height();
	var c_h = $('.m-conter').height();
    var f_h = $('.m-footer').height();
    var body_base_h = w_h - h_h - c_h - f_h -1; //基本高度
    if (body_base_h <= 0) {
        body_base_h = 0;
    }
    $('.m-space').css({ height: body_base_h });
    // 指定当前频道选中
    $('.topNav a').eq(n).addClass("current");
}

// 窗口变化事件
$(window).resize(function(){
	AutoFoot();
});
	
// 接口调用
module.exports = {
	init:function(n){
		AutoFoot(n);
	}
}




