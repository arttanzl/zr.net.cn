define(function(require, exports, moudles) {
	return function($) {
		;(function($, window, undefined) {

			/**
			 * select 	原生伪包装 rel: form-select.css
			 * @authors 谭子良
			 * @date    2014-05-27 13:49:01
			 * @version 1.0.0
			 */
			// CSS STYLE:
			// form.select.css
			// .selectedShowSpan { }
			// .selectedShowSpan.over , .selectedShowSpan:hover {}
			// .selectedShowOpts {}
			// .selectedShowOpts ul {}
			// .selectedShowOpts li {}
			// .selectedShowOpts li.hover , .selectedShowOpts li.selected{}
			$.fn.selectPluging = function(options) {
				//默认参数
				var defaults = {
					"width":"100",
					"minWidth":"100",						// CSS样式指定宽度
					"height":null,
					"selectedShowSpan":"selectedShowSpan",	// 选中的文本存放容器 class样式
					"selectedShowOpts":"selectedShowOpts",	// 伪装列表容器 class样式
					"dis":""								// fiexd 定位
				};
				var opts = $.extend(defaults, options);
				// 方法
				var setTempID = function(){
					var d = new Date();
					var nRandom = (Math.random() * 1000000).toFixed(0);
					return Math.floor(d.getTime() + nRandom) ;
				}
				// 初始化
				var init = function(o,s){
					var tempID = setTempID();
					o.hide(); //隐藏select控件
					if(o.attr('width')){
						opts.width = parseInt(o.attr('width'));
						opts.minWidth = parseInt(o.attr('width'));
					}else{
						opts.width = defaults.width;
						opts.minWidth = defaults.minWidth;
					}
					//在自己后面插入伪装容器
					var _sVal = o.find("option:selected").text();
					var _sTr = '<span id="sid_'+ tempID +'" class="' + opts.selectedShowSpan + '" style="width:' + opts.width + 'px;min-width:'+opts.minWidth+'px;"><em class="val">'+_sVal+'</em><u class="dg"><i></i></u></span>';
					o.after(_sTr);				//插入伪装容品
					var _sSpan = o.next("#sid_"+tempID);
					//select change时
					o.change(function(){
						_sSpan.find('.val').html($(this).find("option:selected").text());	  
					});
					// 当出现在弹出层中时
					//绑定点击事件，弹出伪装select列表
					_sSpan.off("click").on('click',function(){
						$(this).addClass("over");
						//组装 options list 弹出层
						var _ops = o.find("option");
						var _opsUl = '<div id="id_' + tempID + '" class="'+ opts.selectedShowOpts +'"><ul>' ;
						for(var k=0; k < _ops.length; k++){
							var _li = '<li>'+_ops[k].text+'</li>';
							_opsUl += _li ;
						}
						_opsUl += "</ul></div>";

						//设置伪装select列表的位置
						var _offset = $(this).offset();
						var _width = $(this).outerWidth() - 2 ;
						var _height = $(this).outerHeight() - 1 ;
						var _fixHeight = _offset.top - $(document).scrollTop();

						//显示伪装select列表
						$("body").append(_opsUl);
						var _tempUL = $("#id_" + tempID );
						if(opts.height!=null){
							_tempUL.find("ul").css({"max-height":opts.height});
						}
						if(opts.dis==="fixed"){
							_tempUL.css({position:"fixed",width:_width, top: _fixHeight + _height, left: _offset.left}).show();
						}else{
							_tempUL.css({width:_width, top: _offset.top + _height, left: _offset.left}).show();
						}
						var _h = o.attr("h")?o.attr("h"):0; 	//定义选中项的滚动高度
						_tempUL.find("ul").scrollTop(_h);		//定位上次选中位置
						var _selectedIndex = s.selectedIndex;		//当前选中索引
						_tempUL.find("li").eq(_selectedIndex).addClass("selected");
						_tempUL.mousedown(function(){ return false ;});	
						_tempUL.find("li:not(.selected)").mouseover(function(){$(this).siblings(":not(.selected)").removeClass();$(this).addClass("hover");}).mouseout(function(){$(this).removeClass();});
						
						//伪装列表被选中时
						_tempUL.find("ul").scroll(function(){
							var scroll_height = $(this).scrollTop();
							o.attr("h",scroll_height);
						});

						_tempUL.find("li").off("click").click(function(){
							//为selected添加标记
							var TempVal = _sSpan.find('.val').eq(0).text();
							var NewVal = $(this).text();
							if(NewVal!=TempVal){
								var _index = $(this).parent("ul").find("li").index(this);
								o.find("option")[_index].selected = "selected";
								_sSpan.find('.val').eq(0).text($(this).text());
								_sSpan.removeClass("over");
								$(this).siblings().removeClass();
								_tempUL.remove();
								o.trigger('change');
								o.trigger('blur');
							}else{
								_sSpan.removeClass("over");
								_tempUL.remove();
							}
						});

						//在外面单击隐藏
						$(document).mousedown(function(){
							_tempUL.remove();
							_sSpan.removeClass("over"); 
						});
						$(window).resize(function(){
							_tempUL.remove();
							_sSpan.removeClass("over"); 
						});
					});
				};
				//绑定JQ循环
				return this.each(function(){
					var o = $(this);
					init(o,this);
				});
			};
			
		})(jQuery);
	}
});
