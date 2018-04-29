var $ = require("./jquery.1.10.1.min.js");

// 格式化日期显示
// 日期对象
// var now = new Date();
// 传入格式化模板
// var nowStr1 = now.format('yyyy年MM年dd日 hh时mm分ss秒');
// 2016年02年24日 16时38分28秒
// var nowStr2 = now.format('yyyy-MM-dd hh:mm:ss');
// 2016-02-24 16:37:57
// var nowStr3 = now.format('yyyy/MM/dd/ hh-mm-ss');
// 2016/02/24/ 16-37-17
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

// 去掉字符左右的空格
String.prototype.trim=function(){
    return this.replace(/(^s*)|(s*$)/g,"");
}

//通用加载简单的编辑器
var loadSimpleEditor = function(htmlID,areaWidth,areaHeight,uploadUrl,fileManagerJson){
    if(window.KindEditor){
        var KindEditor = window.KindEditor;
        var defaultVal = $(htmlID).val();
        KindEditor.ready(function(K) {
            window.editor = K.create(htmlID, {
                width: '98%',
                width: areaWidth ? areaWidth : '98%',
                height: areaHeight ? areaHeight : '400px',
                items:['source','plainpaste','wordpaste', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                            'insertunorderedlist', '|', 'emoticons', 'image', 'link', '|','clearhtml','preview','fullscreen' ],
                resizeType:0,
                uploadJson:uploadUrl ? uploadUrl : 'http://www.hrloo.com/hrloo.php?m=attachment&c=index&a=ajax_uploadfile',
                fileManagerJson:fileManagerJson ? fileManagerJson : null,
                allowFileManager : true,
                afterBlur:function(){
                        this.sync();
                        var newhtml = this.html();
                        if(newhtml != defaultVal){
                            $(htmlID).trigger("change");
                        }
                  }
            });
            // editor.sync();
        });
    }else{
        alert('KindEditor undefined!');
        return;
    }
}

/**
 * @得到数据类型 (加强型数据检测)
 * @method typefor
 * @param {Object} [obj] 必选，数据
 * @param {RegExp} [type] 可选，数据类型正则表达式
 * Return {Boolean|String} 传入数据类型正则，则返回Boolean，否则返回数据类型String
 * typefor(object,/String/);
 */
var typefor = function(obj, type) {
    var oType = {
        '[object Boolean]': 'Boolean',
        '[object Number]': 'Number',
        '[object String]': 'String',
        '[object Function]': 'Function',
        '[object Array]': 'Array',
        '[object Date]': 'Date',
        '[object RegExp]': 'RegExp',
        '[object Object]': 'Object'
    },
    ret = obj == null ? String(obj) : oType[Object.prototype.toString.call(obj)] || 'Unknown';
    return type ? type.test(ret) : ret;
};

// 获取浏览器版本
// os: det.os,
// engine: det.engine,
// browser: det.browser,
// version: det.version
var getBrowser = function() {
    var ua = navigator.userAgent.toLowerCase(),
        re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;

    function toString(object) {
        return Object.prototype.toString.call(object);
    }

    function isString(object) {
        return toString(object) === "[object String]";
    }


    var ENGINE = [
        ["trident", re_msie],
        ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
        ["gecko", /\bgecko\/(\d+)/],
        ["presto", /\bpresto\/([0-9.]+)/]
    ];

    var BROWSER = [
        ["ie", re_msie],
        ["firefox", /\bfirefox\/([0-9.ab]+)/],
        ["opera", /\bopr\/([0-9.]+)/],
        ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
        ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//]
    ];

    // 操作系统信息识别表达式
    var OS = [
        ["windows", /\bwindows nt ([0-9.]+)/],
        ["ipad", "ipad"],
        ["ipod", "ipod"],
        ["iphone", /\biphone\b|\biph(\d)/],
        ["mac", "macintosh"],
        ["linux", "linux"]
    ];

    var IE = [
        [6, 'msie 6.0'],
        [7, 'msie 7.0'],
        [8, 'msie 8.0'],
        [9, 'msie 9.0'],
        [10, 'msie 10.0']
    ];

    var detect = function(client, ua) {
        for (var i in client) {
            var name = client[i][0],
                expr = client[i][1],
                isStr = isString(expr),
                info;
            if (isStr) {
                if (ua.indexOf(expr) !== -1) {
                    info = name;
                    return info
                }
            } else {
                if (expr.test(ua)) {
                    info = name;
                    return info;
                }
            }
        }
        return 'unknow';
    };

    return {
        os: detect(OS, ua),
        browser: detect(BROWSER, ua),
        engine: detect(ENGINE, ua),
        //只有IE才检测版本，否则意义不大
        version: re_msie.test(ua) ? detect(IE, ua) : ''
    };
};

/**
 * 统计字符串的长度，汉字和全角当作一个字，字线和半角当作半个字
 * @param str 字符串 全角汉字为一个字符
 * @returns len 统计的长度
 */
var fullStringLen = function(str) {
    var len = 0;
    var sem_len = 0;
    for (var i = 0; i < str.length; i++) {
        var strCode = str.charCodeAt(i);
        if (new RegExp('^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$').test(str[i]) || strCode > 255)
            len += 1;
        else
            sem_len++;
    }
    if (sem_len % 2 === 0)
        len += Math.floor(sem_len / 2);
    else
        len += Math.ceil(sem_len / 2);
    return len;
};

/**
 * 统计字符串的长度，汉字和全角当作两个字符，字线和半角当作一个字符
 * @param str 字符串 半角字线为一个字符
 * @returns len 统计的长度
 */
var halfStringLen = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var strCode = str.charCodeAt(i);
        if (new RegExp('^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$').test(str[i]) || strCode > 255)
            len += 2;
        else
            len += 1;
    }
    return len;
};

// 在 input textarea 中插入字符
var insertAtCaret = function(obj, str) { 
    if (document.selection) {
        // obj.focus();
        // input.createTextRange();
        // range.collapse(true);
        // range.moveEnd('character', selectionEnd);
        // range.moveStart('character', selectionStart);
        // range.select();
        // ----------------------------
        // obj.focus();
        // var sel = document.selection.createRange();
        // sel.text = str;
        // sel.select();
        obj.value += str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}

/**
 * getEvent 获取当前事件状态对象
 * @return Event    
 */
var getEvent = function() {
    if (document.all) { return window.event; }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
};

/**
 * 通过当前事件状态对象获取当前触发事件的元素
 * @return Element
 */
var eventTarget = function() {
    var e = getEvent();
    if (e){ 
        return e.target || e.srcElement; 
    }else{
        return null;
    }
};

/**
 * doane 阻止JS事件默认行为的发生和冒泡
 * @param event 事件状态对象
 * @param preventDefault 阻止默认行为
 * @param stopPropagation 阻止 冒泡
 */
var eventStop = function(event) {
    e = event ? event : window.event;
    if (!e) {
        e = getEvent();
    }
    if (!e) {
        return null;
    }
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
    return e;
};

/** 
 * 选中输入框内的内容
 * @param inputobj 对象或对象ID
 * @param selectionStart 开始处
 * @param selectionEnd 结束处
 */
var setSelection = function(inputobj, selectionStart, selectionEnd) {
    input = $(inputobj).get(0);
    if (!input) { return false; }
    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
};

/**
 * 设置光标的位置
 * @param elemobj 对象
 * @param position 位置
 */
var setCursorPosition = function(elemobj, position) {
    var obj = $(elemobj).get(0);
    if (!obj){ return false; }
    setSelection(obj, position, position);
};

/** 将光标设置到输入框的最后
 *@param str 对象或对象ID
 */
var setCursorEnd = function(elemobj) {
    var obj = $(elemobj).get(0);
    if (!obj){ return false; }
    setCursorPosition(obj, obj.value.length);
};

// JS 对中英文混编的字符串进行截取
// 测试 alert(subString("js字符串test截取测试",5,"……")); 
var subString = function(str, len, preStr) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }
    if (strLength > len) {
        if (preStr && preStr.length > 0) {
            newStr += preStr;
        }
    }
    return newStr;
}

// 返回当前地址前缀
var getUrlPre = function(){
    var url = window.location.href.toString();
    var hostName = window.location.host.toString();
    var hostPrevLen = url.indexOf(hostName);
    var hostNameLen = hostName.length;
    return url.substr( 0, hostPrevLen+hostNameLen );
}

// 是否同一个域名之下
var isSameDomain = function(url){
    var current = window.location.host.toString();
    if(url.indexOf(current) > 0){
        return true;
    }else{
        return false;
    }
}

/** 动态获取图片的宽度和高度的像素值 
 * 
 * @param sUrl 图片的url 
 * @param fCallback 回调函数，fCallback至少有一个类型为object类型的参数用来接收图片的宽、高、url 
 * usage: 
 * var url = "http://mat1.gtimg.com/datalib_img//11-05-26/c/c21ff1138e7349859b49b99312d05baf.jpg"; 
 * FGetImg(url, function(img){alert('width:'+img.width+";height:"+img.height+";url:"+img.url);}); 
 * 
 */  
var getImgSize = function(sUrl,callback){     
    var img = new Image();  
    img.src = sUrl + '?t=' + Math.random();     // IE下，ajax会缓存，导致onreadystatechange函数没有被触发，所以需要加一个随机数  
    var FBrowser = getBrowser();            // 获得浏览器版本
    if( FBrowser.browser =="ie" ){ 
        img.onreadystatechange = function()  {  
            if (this.readyState=="loaded" || this.readyState=="complete")  {  
                callback({width:img.width, height:img.height, url:sUrl});  
            }  
        };  
    }else if (FBrowser.browser =="firefox" || FBrowser.browser =="opera" || FBrowser.browser =="chrome" || FBrowser.browser =="safari"){  
        img.onload = function() {  
            callback({width:img.width, height:img.height, url:sUrl});  
        };  
    }  
    else{  
        callback({width:img.width, height:img.height, url:sUrl});  
    }  
};


// 获取地址栏中某一个参数的值
// alert(getUrlParam("name"));
var getUrlParam = function (name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
        return unescape(r[2]);
    }
    return null;
}


// 得到地址栏中的 get参数 数组
// var requestArr = getUrlParamJson();
// alert(requestArr['参数']);
var getUrlParamJson = function (){
    // 获取url中"?"符后的字串
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/* 
 * 用途：基于时间戳生成20位全局唯一标识（每一毫秒只对应一个唯一的标识，适用于生成DOM节点ID） 
 */
var randID = function(len) {
    var timestamp = new Date().getTime() || 0,
        chars = 'abcdefghijklmnopqrstuvwxyz',
        uuid = '';
    this.timestamp = this.timestamp == timestamp ? timestamp + 1 : timestamp;
    timestamp = '' + this.timestamp;
    len = len || 20;
    for (var i = 0; i < len; i++) {
        var k = timestamp.charAt(i);
        if (k == '') {
            k = Math.floor(Math.random() * 26);
        }
        uuid += chars.charAt(k) || 'x';
    }
    return uuid;
};

/*
 * 用途：动态加载 link css文件
 * @param {string} [url] css样式地址
 * @param {string} [cssID] css link ID
 * @param {string} [target] 是否添加到父页面
 */
var addCssLink = function(url,cssID,target) {
    // 没有此链接，动态加载
    if (url) {
        var link = document.createElement('link');
            link.id = cssID ? cssID : "" ;
            link.href = url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
        if(target == 'parent'){
            window.parent.document.getElementsByTagName("HEAD").item(0).appendChild(link);
        }else{
            document.getElementsByTagName("HEAD").item(0).appendChild(link);
        }
    }
}

/*
 * 用途：为页面增加一段 cssText到头部
 * @param {string} [css_Str] css样式字符串
 * @param {string} [cssID] 添加到指定的styleID区块
 * @param {string} [target] 是否添加到父页面
 */
var addCssText = function(css_Str,cssID,target) {
    if (css_Str) {
        var css_ID = cssID ? cssID : 'costomCssTest';
        var BRO = getBrowser();
        if (BRO.browser=='ie' && BRO.version<9){
            // 如果是IE浏览器 9.0以下则需要使用以下方式增加
            // var ArrSheet = document.styleSheets; 样式表
            if(target == 'parent'){
                var ArrSheetNew = window.parent.document.createStyleSheet();
                ArrSheetNew.cssText = css_Str;
                ArrSheetNew.id = css_ID;
            }else{
                var ArrSheetNew = document.createStyleSheet();
                ArrSheetNew.cssText = css_Str;
                ArrSheetNew.id = css_ID;
            }
         } else {
            if(target == 'parent'){
                var Dom_Style = window.parent.document.getElementById(css_ID)
            }else{
                var Dom_Style = document.getElementById(css_ID)
            }
            if (Dom_Style) {
                //如果对应ID的节点已经存在
                var CssContent = Dom_Style.textContent;
                Dom_Style.textContent = (CssContent + css_Str);
            } else {
                var style = document.createElement("style");
                style.id = css_ID; //指定ID
                style.type = "text/css";
                style.textContent = css_Str;
                if(target == 'parent'){
                    window.parent.document.getElementsByTagName("HEAD").item(0).appendChild(style);
                }else{
                    document.getElementsByTagName("HEAD").item(0).appendChild(style);
                }
            }
        }
    }
}

/*
 * 用途：动态加载 javascript 文件
 * @param {string} [url]
 * @param {string} [scriptID]
 * @param {string} [callback] 回调函数
 * @param {string} [wrapperID] 插入到指定位置
 */
var addScript = function(url,scriptID,callback,wrapperID) {
    // 检测IE版本号
    var testIE = function(){
        var t , vesion,
            ua = navigator.userAgent.toLowerCase(),
            ie = /msie ([0-9])\.0/;
        if((t=ie.exec(ua))!=null){
            vesion = t[1];
        }
        return vesion;
    };

    // 定义变量
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.id = scriptID ? scriptID : "" ;

    // IE系列 10以下都支持 onreadystatechange ，IE11以上支持 onload方法
    if( testIE() <= 10 ){
        script.onreadystatechange= function () {
            if ( script.readyState == "loaded" || this.readyState == 'complete' ){
                if(callback){
                    callback();
                }
            }   
        };
    }else{
        // 其它浏览器
        script.onload= function(){
            if(callback){
                callback();
            }
        };
    }

    script.src= url;
    if(wrapperID){
        document.getElementById(wrapperID).appendChild(script); 
    }else{
        head.appendChild(script); 
    }
};

/**
 * 用途：弹层基础控件
 * @param {object} [options] 传参对象请对照内部默认参数
 */
var popup = function(options){

    // 默认参数
    var defaults = {                        // 创建蒙板可更改参数
        pluginCssLink:null,                 // 当前插件的基础 CSS
        width: 600,                         // 指定弹窗宽度
        height: null,                       // 指定弹窗高度
        beforeShow: null,                   // 弹出前函数
        afterShow: null,                    // 弹出后函数
        setTimeout:null,                    // 多少毫秒后自动关闭
        zindex:1000,                           // 遮罩层显示层级
        overlay: "popup-overlay",           // 遮罩class name
        showed: "popup-showed",             // 打开的记录  不能让外部修改
        closeEl: '.close',                  // 关闭class
        mTop: 'auto',                       // auto | 20px
        overlayBg: "#000",                  // 遮罩层背景色
        overlayOpacity:5,                   // 遮罩层透明度 1~9 (0.1~0.9)
        docClick: false,                    // 点击弹窗之外时是否关闭
        type:null,                          // 弹层类型 alert | confirm | prompt | iframe | otherID
        title:null,                         // 提示标题 alert
        html:null,                          // 提示文字 alert | confirm | 弹出窗内容
        htmlClassName:null,                  // 附加 弹窗 样式名称
        moveHander:'.hd'                    // 移动弹层的绑定节点
    };
    var opts = $.extend(defaults, options);

    // 创建蒙板
    var createMengban = function(me){
        // 添加蒙板
        function mb(isHasMengban,mengbanHeight){
            // 是否创建透明蒙板
            var opacityHTML = isHasMengban ? 'opacity:0;filter:alpha(opacity=0);' : 'opacity:0.'+me.opts.overlayOpacity+';filter:alpha(opacity='+me.opts.overlayOpacity+'0);';
            // 判断是否已经有蒙版
            var mengbanHTML = $('<div class="'+me.opts.overlay+'" style="display:none;position:absolute;left:0px; top:0px;'+opacityHTML+'width:100%; height:'+mengbanHeight+'px; background:'+me.opts.overlayBg+'; z-index:'+me.opts.zindex+';"></div>');
            return mengbanHTML;
        }
        // 分支处理
        var isHasMengban = $("body").find('.' + me.opts.showed).length > 0 ? true : false;
        me.mask = $(mb(isHasMengban,$(document).height()));
        $("body").append(me.mask);
        return me;
    }

    // 入口函数
    var init = function(options) {

        var me = this;
            me.opts = $.extend(true, {}, options);

        // 关闭弹窗
        this.hide = function(){
            if(!me.opts.type && typefor(me.opts.html,/Object/) ){
                me.element.hide().removeClass(me.opts.showed).appendTo(me.nodeParent);
                me.mask.off().remove();
            }else{
                me.mask.off().remove();
                me.element.off().remove();
            }
            $(window).off("resize",me.resize);
            // 执行弹窗后事件函数
            if(me.opts.afterShow){
                me.opts.afterShow(me);
            }
        }

        // 窗口变化
        this.resize = function(){
            // 是否有滚动条出现 真实网页高度
            /*
            var mh ;
            var win_h = $(window).height();
            var doc_h = $(document).height();
            if ( doc_h > win_h ){
                mh = Math.floor(doc_h + 16);
            }else {
                mh = doc_h;
            }
            */
            // 定位数值
            // var scr_height = $(document).scrollTop();   //  距顶部高度
            me.opts.height = me.element.outerHeight();
            oLeft = Math.floor(($(window).width() - me.opts.width ) / 2 );
            oTop = Math.floor(($(window).height() - me.opts.height ) / 2 );
            docHeight = $(document).height();

            // 弹层位置
            me.element.css({
                'position':'fixed',         // IE6 position: absolute; background: #fff;
                'width': me.opts.width,
                // 'height': me.opts.height,
                'left': oLeft,
                "top": oTop
            });

            if(me.opts.mTop != "auto"){
                me.element.css({
                    "top": me.opts.mTop
                });
            }

            if(me.mask){
                me.mask.css({
                    'width':'100%',
                    'height': docHeight
                });
            }
        }

        // 弹层内容预处理
        switch(me.opts.type){
            case 'alert':
                me.element = $(me.opts.modeAlertHTML).css({'width':me.opts.width});
                me.element.find(".ct").html(me.opts.html);
                break;
            case 'confirm':
                me.element = $(me.opts.modeConfirmHTML).css({'width':me.opts.width});
                me.confirmSure = null;
                me.element.find(".btnTrue").on("click",function(){
                    me.confirmSure = true;
                    me.hide();
                });
                me.element.find(".btnFalse").on("click",function(){
                    me.confirmSure = false;
                    me.hide();
                });
                me.element.find(".ct").html(me.opts.html);
                break;
            case 'prompt':
                me.element = $(me.opts.modePromptHTML).css({'width':me.opts.width});
                me.element.find(".ct h1").html(me.opts.html);
                me.element.find(".ct input").val(me.opts.promptValue);
                me.promptValue = me.opts.promptValue;
                me.element.find(".btnTrue").on("click",function(){
                    me.promptValue = me.element.find("input").val();
                    me.hide();
                });
                me.element.find(".btnFalse").on("click",function(){
                    me.promptValue = me.opts.promptValue;
                    me.hide();
                });
                break;
            case 'iframe':
                me.element = $(me.opts.modeIframeHTML).css({'width':me.opts.width});
                if(me.opts.iframeid){
                   me.element.attr("id",me.opts.iframeid); 
                }
                me.element.find(".hd").html(me.opts.title);
                me.element.find("iframe").css({"width":me.opts.width,"height":me.opts.iframeHeight});
                me.element.find("iframe").attr("src",me.opts.modeIframeUrl);
                break;
            default:
                if(!me.opts.type){
                    if(me.opts.title){
                        me.element = $('<div class="popup"><header class="hd">'+me.opts.title+'</header><section class="ct"></section><a href="javascript:;" class="close">×</a></div>').css({'width':me.opts.width});
                    }else{
                        me.element = $('<div class="popup"><section class="ct"></section><a href="javascript:;" class="close">×</a></div>').css({'width':me.opts.width});
                    }
                    if(typefor(me.opts.html,/Object/) ){
                        me.nodeParent = $(me.opts.html).parent();
                        me.element.find('.ct').append($(me.opts.html).show());
                    }else{
                       me.element.find('.ct').append($(me.opts.html)); 
                    }
                }else{
                    return ;
                }     
        }

        // 多少毫秒后自动关闭弹窗
        if(me.opts.setTimeout>10){
            window.setTimeout(function(){
                me.hide();
                return false;
            },me.opts.setTimeout);
        }

        // 弹窗前预置函数
        if (me.opts.beforeShow) { 
            me.opts.beforeShow(me.element); 
        }  

        // 创建蒙板
        createMengban(me);

        // 如果存在需要附加弹窗样式
        if(me.opts.htmlClassName && !me.element.hasClass(me.opts.htmlClassName) ){
            me.element.addClass(me.opts.htmlClassName);
        }
        // 弹层内容
        me.element.appendTo("body");

        // 弹窗定位数值计算
        me.opts.height = me.opts.height ? me.opts.height : me.element.outerHeight();
        me.oLeft = Math.floor(($(window).width() - me.opts.width ) / 2 );
        me.oTop = Math.floor(($(window).height() - me.opts.height ) / 2 );
        
        // 是否有滚动条出现 真实网页高度
        /*
        var mh ;
        var win_h = $(window).height();
        var doc_h = $(document).height();
        if ( doc_h > win_h ){
            mh = Math.floor(doc_h + 16);
        }else {
            mh = doc_h;
        }
        */

        // 弹窗定位赋值
        me.element.css({
            'position':'fixed',         // IE6 position: absolute; background: #fff;
            'width': me.opts.width,
            //'height': me.opts.height,
            'left': me.oLeft,
            "top": me.oTop,
            "z-index":me.opts.zindex+1
        });

        // 如果有传入顶部高度
        if(me.opts.mTop != "auto"){
            me.element.css({
                "top": me.opts.mTop
            });
        }

        // IE 系列判断 并执行下面函数
        /*
        if(navigator.userAgent.indexOf("MSIE 6.0") > 0){ 
            $pop.css({
                "position": "absolute",
                "top": _top + scr_height
            });
        }
        */

        // 显示蒙板
        me.mask.fadeIn("fast");
        // 显示弹层
        me.element.addClass(me.opts.showed).css("display","block");

        // 移动弹层
        me.element.find(me.opts.moveHander).on("mousedown",function(event){
            // console.log(1)
            // 移动开始
            var startX = event.pageX || window.event.pageX,
                startY = event.pageY || window.event.pageY,
                offset = me.element.offset();
            var disX = startX-offset.left;
            var disY = startY-offset.top;
            var moveWidth = $(window).width();
            var moveHeight = $(window).height();
                // console.log(moveWidth);
                // console.log(moveHeight);
            // 禁止冒泡
            if (event.stopPropagation) {
                event.stopPropagation();    //其它
                } else {
                event.cancelBubble = true;//IE
            } 
            $("body").on("mousemove",function(event){   
                // 正在移动
                var _x = event.pageX || window.event.pageX,
                    _y = event.pageY || window.event.pageY;
                // 边界锁定范围
                if(_x - disX < 0 || _y - disY < 0 || _x - disX > moveWidth - me.opts.width || _y - disY > moveHeight - me.opts.height ){
                    return;
                }else{
                    me.element.css({ 
                        "left": _x - disX,
                        "top": _y - disY,
                        "cursor": "move"
                    });
                }
            }).on("mouseup",function(){
                // console.log(3);
                // 移动结束 
                me.element.css({ 
                    "cursor": "default"
                });
                me.element.closest("body").off('mousemove');
            });
        });

        
        // 窗口变化事件
        $(window).on("resize",me.resize);

        // 双击蒙板事件
        if (me.opts.docClick){
            me.mask.on('dblclick',me.hide);
        }

        // 关闭事件
        me.element.find(me.opts.closeEl).on('click',function(){
            me.hide();
            return false;
        });

    };
    
    // 初始化入口函数
    return new init(opts);

};

/**
 * 用途：普通提示
 * @param {string} [message] 提示文字
 * @param {number} [time] N毫秒后自动关闭
 * @param {function} [callback] 关闭后的回调函数
 *
 * 实例代码:
 * t.alerter('智能ABC点标签右边的小键盘符号智能ABC点标签右边的小键盘符号……');
 * t.alerter('智能ABC点标签右边的小键盘符号智能ABC点标签右边的小键盘符号……',3000);
 * t.alerter('智能ABC点标签右边的小键盘符号智能ABC点标签右边的小键盘符号……',3000,function(){
 *     关闭时回调……
 * });
 * 
 */
var alerter = function(message,time,callback){
    popup({
        type:'alert',
        modeAlertHTML:'<div class="popup popAlert"><header class="hd">提示</header><section class="ct"></section><a href="javascript:;" class="close">×</a></div>',
        width:360,
        zindex:9999,
        html:message,
        setTimeout:(time?time:null),
        afterShow:function(){
            if(callback){
                callback();
            }
        }
    });
}

/**
 * 用途：二次确认提示
 * @param {string} [message] 提示文字
 * @param {function} [callback(boolean)] 回调处理
 *
 * 实例代码：
 * t.confirm('确定删除吗？',function(boolean){
        if(boolean){
            alert(boolean);
        }else{
            alert(boolean);
        }
   });
 * 
 */
var confirm = function(message,callback){
    popup({
        type:'confirm',
        modeConfirmHTML:'<div class="popup popConfirm"><header class="hd">提示</header><section class="ct">说明文字提示区</section><footer class="ft"><a class="btnTrue" href="javascript:;">确定</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btnFalse popup-close" href="javascript:;">取消</a></footer><a href="javascript:;" class="close">×</a></div>',
        width:360,
        zindex:9999,
        html:message,
        afterShow:function(o){
            if(callback){
                callback(o.confirmSure);
            }
        }
    });
}

/**
 * 用途：获取输入文字
 * @param {string} [text] 标题文字
 * @param {string} [defaultText] 默认值
 * @param {function} [callback(inputText)] 回调处理
 *
 * 实例代码：
 * t.prompt("请输入你的姓名","三小二",function(inputText){
        alert(inputText);
    });
 */
var prompt = function(text,defaultText,callback){
    popup({
        type:'prompt',
        modePromptHTML:'<div class="popup popPromp"><header class="hd">提示</header><section class="ct"><h1>说明文字提示区</h1><p><input type="text" value=""></p></section><footer class="ft"><a class="btnTrue" href="javascript:;">确定</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btnFalse popup-close" href="javascript:;">取消</a></footer><a href="javascript:;" class="close">×</a></div>',
        width:360,
        zindex:9999,
        html:text,
        promptValue:(defaultText?defaultText:''),
        afterShow:function(o){
            if(callback){
                callback(o.promptValue);
            }
        }
    });
}

/**
 * 用途：打开新窗口链接
 * @param {object} [options] 参数说明
 * @param {number} [options.popId] 弹出层ID 用来操作关闭，及交互
 * @param {string} [options.title] 标题文字
 * @param {number} [options.width] 宽度
 * @param {number} [options.height] 高度
 * @param {string} [options.url] 地址
 * @param {number} [options.setTimeout] 多少毫秒后可以关闭
 * @param {function} [options.beforeShow] 弹出前执行函数
 * @param {function} [options.afterShow] 关闭后执行函数
 */
var openIframe = function(options){
    if(options.url){
        popup({
            type:'iframe',
            modeIframeHTML:'<div class="popup popIframe">'+(options.title ? '<header class="hd">'+options.title+'</header>':'')+'<section class="ct"><iframe src="#" frameborder="0" style="background:#fff;"></iframe></section><a href="javascript:;" class="close">×</a></div>',
            modeIframeUrl:null,                  // iframe url地址
            iframeid:(options.id?options.id:null),
            width:(options.width?options.width:800),
            height:(options.height?(options.height+51):551),
            iframeHeight:(options.height?options.height:500),
            modeIframeUrl:options.url+(options.url.indexOf('?')<0?'?rand=':'&rand=')+(new Date().getTime()),
            setTimeout:options.setTimeout,
            beforeShow:options.beforeShow,
            afterShow:options.afterShow
        });
    }else{
        alerter("参数中缺少请求地址！");
    }  
}

/**
 * 
 * 显示气泡样式小提示
 * 
 * @param obj 被显示气泡提示的对象,可传对象，也可传ID
 * @param type 气泡提示样式类型
 *        type 0 默认类型
 *        type 1 带“正确”图标类型
 *        type 2 带“错误”图标类型
 *        type 3 带“警告”图标类型
 * @param msg 消息字符串，可直接带入html结构
 * @param closeBtn 0或1，1显示关闭按钮（延时关闭无效），0不显示关闭按钮
 * @param delay 延时设置，单位毫秒（默认2000毫秒）
 * @param func 回调方法,当closebtn为1时才有作用
 * 
 * 调用示例：
 * showBubble(idName,0,"你已经支持过TA了<br />请关注其他人吧");  //不带关闭按钮，2.4秒后自动关闭
 * showBubble(idName,1,"操作成功！",0,3000)  //不带关闭按钮，显示打勾图标，3秒后自动关闭
 * showBubble(idName,1,"已收藏至<a href='#'>我的收藏</a>",1);   //带关闭按钮，显示打勾图标，不会自动关闭(设置delay无效)
 * 
 */
var showBubble = function(id, type, msg, delay, closeBtn, func) {

    if (!delay || typeof delay != "number"){
        delay = 1000*2;
    }

    var _timer,
        _type = parseInt(type) || 0,
        _msg = msg || "",
        _preHtml = "";

    var _target = null;
    if (typeof id == 'object') {
        _target = id;
    } else {
        _target = $("#" + id);
    }
    if (_target == null) {
        return false;
    }

    switch (_type) {
        case 0:
            _preHtml = $('<div class="hr-bubble"><div class="bub-text"><span class="bub-def">' + _msg + '</span></div><span class="arrow1"></span><span class="arrow2"></span></div>');
            break;
        case 1:
            _preHtml = $('<div class="hr-bubble"><div class="bub-text"><span class="bub-ok">' + _msg + '</span></div><span class="arrow1"></span><span class="arrow2"></span></div>');
            break;
        case 2:
            _preHtml = $('<div class="hr-bubble"><div class="bub-text"><span class="bub-err">' + _msg + '</span></div><span class="arrow1"></span><span class="arrow2"></span></div>');
            break;
        case 3:
            _preHtml = $('<div class="hr-bubble"><div class="bub-text"><span class="bub-warm">' + _msg + '</span></div><span class="arrow1"></span><span class="arrow2"></span></div>');
            break;
        default : 
            _preHtml = $('<div class="hr-bubble"><div class="bub-text"><span class="bub-def">' + _msg + '</span></div><span class="arrow1"></span><span class="arrow2"></span></div>');
            break;
    }
    if (!!closeBtn) _preHtml.append('<a href="javascript:;" title="关闭" class="bub-cls" onclick="this.parentNode.parentNode.removeChild(this.parentNode);return false;">x</a>');

    // 清空页面上已存在的冒泡框(带关闭按钮的除外);
    $(".hr-bubble").each(function() {
        if (!$(this).find(".bub-cls")) {
            $(this).remove();
        }
    });

    // 定位计算
    _preHtml.appendTo("body").css({
        "display": "block",
        "top": ($(_target).offset().top + $(_target).outerHeight() + 11),
        "left": $(_target).offset().left - $(_preHtml).outerWidth() / 2 + $(_target).outerWidth() / 2
    });
    if (!closeBtn) {
        setTimeout(function() {
            _preHtml.remove();
            if (func) {
                func();
            }
        }, delay);
    }
};


// API
module.exports = { 
    loadSimpleEditor : loadSimpleEditor,
    typefor : typefor,
    getBrowser : getBrowser,
    fullStringLen : fullStringLen,
    halfStringLen : halfStringLen,
    insertAtCaret : insertAtCaret,
    getEvent : getEvent,
    eventTarget : eventTarget,
    eventStop : eventStop,
    setSelection : setSelection,
    setCursorPosition : setCursorPosition,
    setCursorEnd : setCursorEnd,
    subString : subString,
    getUrlPre : getUrlPre,
    isSameDomain : isSameDomain,
    getImgSize : getImgSize,
    getUrlParam : getUrlParam,
    getUrlParamJson : getUrlParamJson,
    randID : randID,
    addCssLink : addCssLink,
    addCssText : addCssText,
    addScript : addScript,
    popup : popup,
    alerter : alerter,
    confirm : confirm,
    prompt : prompt,
    openIframe : openIframe,
    showBubble : showBubble
}