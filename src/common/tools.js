/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-24 14:26:59
 * @version $Id$
 */



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


//js截取字符串，中英文都能用  
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。  
//字符串，长度   
/** 
 * js截取字符串，中英文都能用 
 * @param str：需要截取的字符串 
 * @param len: 需要截取的长度 
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}


// 返回随机唯一ID
var setTempID = function(){
    var d = new Date();
    var nRandom = (Math.random() * 1000000).toFixed(0);
    return Math.floor(d.getTime() + nRandom) ;
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

/**
    分页函数
    参数：
    _total： 总记录数
    _per：   每页显示多少记录
    _pn：    当前页码
    调用例子：
    pageBar(180, 20,1);
    <div class="m-pageBar box">
        <a href="##" class="disabled">上一页</a>
        <a href="##">1</a>
        <a href="##" class="selected">2</a>
        <a href="##">3</a>
        <a href="##">4</a>
        <a href="##">下一页</a>
    </div>
*/
var pageBar = function(_total,_per,_pn){

    var _per = _per ? _per : 10;    // 当前页显示条数
    var _pn = _pn ? _pn : 1;        // 当前为第几页

    if(_total<=0){
        return '';
    }

    var _pagetotal = Math.ceil(_total / _per);   //总共多少页
    
    // 上一页
    var $str = '<div class="m-pageBar box">';
    if(_pn==1){
        $str += '<a href="javascript:;" class="disabled">上一页</a>';
    }else{
        $str += '<a href="javascript:;" data-pn="'+(_pn-1)+'">上一页</a>';
    }
    
    // 如果当前页码靠近总数，总数在9以上，要在 6789页前追加 2345
    if( _pn > _pagetotal - 4 && _pn > 5 ){
        var _beforenumber = 4 - ( _pagetotal - _pn );
        for (var i=_pn-4-_beforenumber; i<=_pn-5; i++){
            if( i > 0 ){
                $str += '<a href="javascript:;" data-pn="'+ i + '">' + i + '</a>';  
            }
        }
    }

    //前4页
    for (var i=_pn-4; i<_pn; i++){
        if(i > 0){
            $str += '<a href="javascript:;" data-pn="' + i + '">' + i + '</a>';  
        }
    }

    //当前页
    $str += '<a href="javascript:;" class="selected">' + _pn + '</a>' ;

    //后4页
    for (var i=_pn+1; i<=_pn+4; i++){
        if(i <= _pagetotal){
            $str += '<a href="javascript:;" data-pn="' + i + '">' + i + '</a>';  
        }
    }

    //如果当前小于5，但实际页码，在9以上，要在4之后加上56789 追加显示到第9页
    if( _pn < 5 && _pagetotal>_pn+4 ){
        for (var i=_pn+5; i<=9; i++){
            if( i <= _pagetotal){
                $str += '<a href="javascript:;" data-pn="' + i + '">' + i + '</a>';  
            }
        }
    }
    
    if(_pn<_pagetotal)
    {
        $str += '<a href="javascript:;" data-pn="' + (_pn+1) + '">下一页</a>';
    }else
    {
        $str += '<a href="javascript:;" class="disabled">下一页</a>';
    }
    
    $str += '</div>';
    
    return $str;

}

// 将 /Date(1430797919670)/ 转成真实时间
var paseCTime = function(str){
    var dataStr = str.replace("/Date(","").replace(")/","");
    var now = new Date(parseInt(dataStr));
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;     
}





/** 动态获取图片的宽度和高度的像素值 
 * 
 * @param sUrl 图片的url 
 * @param fCallback 回调函数，fCallback至少有一个类型为object类型的参数用来接收图片的宽、高、url 
 *  
 * usage: 
 * var url = "http://mat1.gtimg.com/datalib_img//11-05-26/c/c21ff1138e7349859b49b99312d05baf.jpg"; 
 * FGetImg(url, function(img){alert('width:'+img.width+";height:"+img.height+";url:"+img.url);}); 
 * 
 */  
var getImgSize = function(sUrl,callback){     
    var img = new Image();  
    img.src = sUrl + '?t=' + Math.random();     // IE下，ajax会缓存，导致onreadystatechange函数没有被触发，所以需要加一个随机数  
    var FBrowser = getBrowserInfo();            // 获得浏览器版本
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


// 获取浏览器版本
// os: det.os,
// engine: det.engine,
// browser: det.browser,
// version: det.version
var getBrowserInfo = function() {
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




module.exports = { 
    subString : subString,
    setTempID : setTempID,
    pageBar : pageBar,
    isSameDomain : isSameDomain,
    paseCTime : paseCTime,
    getImgSize : getImgSize,
    getBrowserInfo : getBrowserInfo
}


