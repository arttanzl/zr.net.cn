<?php

exit();
header('Content-Type:text/html;charset=utf-8');

require('zr_arr.php');
$url = 'http://www.mlcc1.com/search/param_ai.html';
$id = (int)$_REQUEST['id'];

// 第一种方式 -------------------------------------
/**
 * 模拟post进行url请求
 */
function request_post($url = '', $param = '') {
    if (empty($url) || empty($param)) {
        return false;
    }
    
    $postUrl = $url;
    $curlPost = $param;
    $ch = curl_init();//初始化curl
    curl_setopt($ch, CURLOPT_URL,$postUrl);//抓取指定网页
    curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
    curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
    $data = curl_exec($ch);//运行curl
    curl_close($ch);
    
    return $data;
}

function testAction($cate_id){
        $url = 'http://www.mlcc1.com/search/param_ai.html';
        $post_data['cate_id']       = $cate_id;
        $o = "";
        foreach ( $post_data as $k => $v ){ 
            $o.= "$k=" . urlencode( $v ). "&" ;
        }
        $post_data = substr($o,0,-1);
        $res = request_post($url, $post_data);       
        return $res;
}


/*
// 组装数组
$arr2 = array();
foreach ($arr as $key => $value) {
	foreach ($value['list'] as $k => $v) {
		$arr2[] = array(
			id => $v['cate_id'],
			name => $v['name'],
			pid => $value['cate_id'],
			pname => $value['name'],
		);
	}
}

// 写入php
$TxtFileName = "zr_arr.php";
$strArray = var_export($arr2,TRUE);
$StrConents = preg_replace('/=>(\s+)array/','=> array','<?php' . "\r\n".'$arr2 = ' . $strArray . ';'."\r\n".'?>');
// 以读写方式打写指定文件，如果文件不存则创建
if( ($TxtRes=fopen ($TxtFileName,"w+")) === FALSE){
	echo("创建可写文件：".$TxtFileName."失败");    
	exit();
}
// 将信息写入文件
if(!fwrite ($TxtRes,$StrConents)){
	echo ("尝试向文件".$TxtFileName."写入失败！");
	fclose($TxtRes);
	exit();       
}
// 关闭指针
fclose ($TxtRes); 
echo '<script>alert("更新成功！");window.history.go(-1);</script>';
*/





// ----------------------------------------------------------

if($id < 44 ){

	$jsonData = testAction($arr2[$id]['id']);

	// 把PHP数组转成JSON字符串  
	$json_string = json_encode($jsonData);  
	  
	// 写入文件  
	file_put_contents($arr2[$id]['pid'].'__'.$arr2[$id]['id'].'.json', $json_string);  	

	// 迭代
	echo("采集--- ".$id." --- 成功<br>");
	echo '<script>window.location="zr.php?id='.($id+1).'";</script>';
	exit();

}else{
	echo '全部完成';
}


// 从文件中读取数据到PHP变量  
// $json_string = file_get_contents('test.json');  
  
// 把JSON字符串转成PHP数组  
// $data = json_decode($json_string, true);  
  
// 显示出来看看  
// print_r($data);  








// ----------------------------------------------------------





/**
 * 模拟post进行url请求
 * string $url
 * array $post_data
 */
/*
function request_post($url = '', $post_data = array()) {
    if (empty($url) || empty($post_data)) {
        return false;
    }
    $o = "";
    foreach ( $post_data as $k => $v ) 
    { 
        $o.= "$k=" . urlencode( $v ). "&" ;
    }
    $post_data = substr($o,0,-1);

    $postUrl = $url;
    $curlPost = $post_data;
    $ch = curl_init();//初始化curl
    curl_setopt($ch, CURLOPT_URL,$postUrl);//抓取指定网页
    curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
    curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
    $data = curl_exec($ch);//运行curl
    curl_close($ch);
    return $data;

}

function testAction(){
    $url = 'http://mobile.jschina.com.cn/jschina/register.php';
    $post_data['appid']       = '10';
    $post_data['appkey']      = 'cmbohpffXVR03nIpkkQXaAA1Vf5nO4nQ';
    $post_data['member_name'] = 'zsjs124';
    $post_data['password']    = '123456';
    $post_data['email']    = 'zsjs124@126.com';
    //$post_data = array();
    $res = $this->request_post($url, $post_data);       
    print_r($res);

}
*/







// ----------------------------------------------------------








/*
// 模拟提交数据函数
function curl_taobao_detail($url,$type=1) {	

	// 启动一个CURL会话
	$ch = curl_init();
	// http头数组
	$header = array();
	$header[] = '';
	// 采集网页时无需添加解压缩，会报错，采集 ajax JSON 时开启
	if($type == 2 ){
		$header[] = 'Accept-Encoding:gzip, deflate';
	}
	$header[] = 'Accept-Language:zh-CN,zh;q=0.9';
	$header[] = 'Cache-Control:no-cache';
	$header[] = 'Connection:keep-alive';
	$header[] = 'Content-Length:9';
	$header[] = 'Content-Type:application/x-www-form-urlencoded; charset=UTF-8';
	$header[] = 'Cookie:pgv_pvi=8232493056; think_template=default; PHPSESSID=okvfspmpjogao4m7u27juv5ne4; pgv_si=s7255335936; Hm_lvt_539bf1041b495812d6e134b58c37be01=1524232585,1524233193,1524316111,1525274778; Hm_lvt_66462b2f25b10e2bda6927887033e571=1524232585,1524233193,1524316111,1525274779; Hm_lpvt_539bf1041b495812d6e134b58c37be01=1525279483; Hm_lpvt_66462b2f25b10e2bda6927887033e571=1525279484';
	$header[] = 'Host:www.mlcc1.com';
	$header[] = 'Origin:http://www.mlcc1.com';
	$header[] = 'Pragma:no-cache';
	$header[] = 'Referer:http://www.mlcc1.com/';
	$header[] = 'User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';
	$header[] = 'X-Requested-With:XMLHttpRequest';

	curl_setopt($ch, CURLOPT_URL, $url);			// 要访问的地址
	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);	// 设置http头
	curl_setopt($ch, CURLOPT_HEADER, 0);			// 显示返回的Header区域内容
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);	// 获取的信息以文件流的形式返回
	curl_setopt($ch, CURLOPT_TIMEOUT, 20);			// 设置超时限制防止死循环
	$content = curl_exec($ch);						// 执行操作
	curl_close($ch);								// 关闭CURL会话
	return $content;								// 返回数据

}
*/

// http://www.mlcc1.com/search/param_ai.html



?>