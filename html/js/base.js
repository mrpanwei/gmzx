//var horse_ajax = 'http://localhost:1818/horseman.asmx/'
 //var horse_ajax = "http://localhost:1818/lightning.asmx/";

var horse_ajax = "http://appser.dtgmzx.cn/lightning.asmx/";
//
//APP全局变量
var app_para = "";
var item_para = "";
var _winLocation = window.location.href; //获得当前页面的路径，根据路径规则进行逐页替换
var _isWebKit = '__proto__' in {}; //是否是webkit内核
if (_isWebKit) { //如果是webkit内核，则分模块使用zepto
	//要使用zeptojs的路径列表，可以做为分模块替换的开关
	var _locationList = new Array();
	//活动模块
	_locationList.push('/user/');

	var _needReplace = true;
	//如果当前路径符合要使用的路径规则，则进行替换
	//    for (var i = 0; i < _locationList.length; i++) {
	//        if (_winLocation.indexOf(_locationList[i]) != -1) {
	//            _needReplace = false;
	//            break;
	//        }
	//    }
	//如果是首页的话，则使用zepto
	var _tmp = _winLocation.replace(/(^http:\/\/)|(\/*$)/g, '');
	if (_tmp.indexOf('/') < 0 || (_tmp.split('/').length <= 2 && _tmp.indexOf('/index') >= 0)) {
		_needReplace = true;
	}
	//如果是商品详情页的话，则使用zepto
	//    var _dlocationList = new Array();
	//    _dlocationList.push(/\/product\/([0-9]+)\.html/);
	//    _dlocationList.push(/\/orderComment\/([0-9]+)\.html/);
	//    _dlocationList.push(/\/consultations\/([0-9]+)\.html/);
	//    _dlocationList.push(/\/consultations\/([0-9]+)-([0-9]+)\.html/);
	//    _dlocationList.push(/\/comments\/([0-9]+)\.html/);
	//    for (var i = 0, len = _dlocationList.length; i < len; i++) {
	//        if (_dlocationList[i].test(_winLocation)) {
	//            _needReplace = true;
	//            break;
	//        }
	//    }

	//	if(_needReplace) {
	//		//            document.write('<script src="js/zepto.min.js"><\/script>');
	//		//            document.write('<script type="text/javascript">window.jQuery=window.Zepto;<\/script>');
	//		document.write('<script src="../../lib/jquery-2.1.4.min.js"><\/script>');
	//	} else {
	//		document.write('<script src="../../lib/jquery-2.1.4.min.js"><\/script>');
	//	}

} else { //如果是非webkit内核直接使用jquery

	//	document.write('<script src="../../lib/jquery-2.1.4.min.js"><\/script>');

}
//window.jQuery = window.Zepto;
//document.write('<script src="js/jquery-2.1.4.min.js"></script>');

//document.write('<script src="js/AppCall.js"></script>');
//document.write('<script src="js/jquery.urldecoder.min.js"></script>');

//alert(location.href);
//QQ互联登录
function loginFromQQ() {
	window.location = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100301989&state=QQConnect&redirect_uri=http://m.554488.com/loginauto.html&scope=get_user_info,get_info,get_other_info";
}

//微信互联登录
function loginFromWX() {
	window.location = "https://open.weixin.qq.com/connect/qrconnect?appid=wx7eb583e292df67c2&redirect_uri=http://m.554488.com/loginauto.html&response_type=code&scope=snsapi_login&state=WXConnect#wechat_redirect";
}

function app_index_GoMyhome() {
	if (isHxApp())
		app_GoMyhome();
	else
		window.location.href = "home.html";
}

//判断是否登录
function if_login() {
	var thisURL = window.location.href;
	//var mpUPage = thisURL.split("/");

	//var thisUPage = mpUPage[mpUPage.length - 1];
	//cookie('hxapp_url_old',  document.referrer); //设置带时间的cookie
	//cookiesetset('hxapp_url_new', thisUPage, { expires: 7 }); //设置带时间的cookie
	//alert(thisUPage);
	//mobile.changePage( cookie('hxapp_url_new'), {changeHash :false, transition: "slideup"} );
	//var dd = cookie('username');
	if (isBlank(cookieget('usersafety'))) {
		//转到	searchresults页面，使用来自id为search的表单数
		if (isHxApp()) {
			//alert("在APP");
			app_GoLogin();
		} else {
			alert("请在APP中打开");
			window.location.href = 'login.html?u=' + encodeURIComponent(thisURL);
		}
		//mobile.changePage( 'login.html', {changeHash :true, transition: "slideup"} );
		return false;
	}
	return cookieget('usersafety');
}

//判断有没有选择客户
function if_customer() {
	var thisURL = window.location.href;
	if (isBlank(cookieget('customerID'))) {
		//转到	searchresults页面，使用来自id为search的表单数
		if (isHxApp()) {
			//alert("在APP");
			window.location.href = 'chosekehu.html';
		} else {
			alert("请在APP中打开");
			window.location.href = 'chosekehu.html';
		}
		//mobile.changePage( 'login.html', {changeHash :true, transition: "slideup"} );
		return false;
	}
	return cookieget('customerID');
}

function sendShopid(shopid) {
	app_para = shopid;
	try {
		if (typeof (eval('HxAppReady')) === "function") {

			HxAppReady(app_para);
		}
	} catch (e) {}
}

//判断登录后台判断
function if_login_h(response) {
	if (response[0].s_login != "0") {
		return true;
	} else {
		var thisURL = window.location.href;
		//var mpUPage = thisURL.split("/");
		//var thisUPage = mpUPage[mpUPage.length - 1];
		//$.cookie('hxapp_url_old',  document.referrer); //设置带时间的cookie
		//$.cookie('hxapp_url_new', thisUPage, { expires: 1 }); //设置带时间的cookie
		if (cookieget('username') != null && cookieget('username') != 'null' && cookieget('username') != "")
			cookieremove('username');
		if (cookieget('usersafety') != null && cookieget('usersafety') != 'null' && cookieget('usersafety') != "")
			cookieremove('usersafety');
		//hideLoader();
		if (isHxApp()) {
			app_GoLogin();
		} else {
			alert("请在APP中打开");
			window.location.href = 'login.html?u=' + encodeURIComponent(thisURL);
		}
		return false;
	}
}

//判断登录成功后，返回的URL
function login_url() {
	var getret = new QueryString();
	var thisURL = getret.u;
	if (typeof (thisURL) != "undefined" && thisURL != "") {
		//window.location.href = decodeURIComponent(thisURL);
		app_OpenUrl(decodeURIComponent(thisURL), '0')
	} else {
		//window.location.href = murl;
		app_OpenUrl(murl, '0')
	}
	return false;
}
//退出登录
function login_out() {
	if (cookieget('username') != null)
		cookieremove('username');
	if (!isBlank(cookieget('usersafety'))) {
		if (is_weixn()) { //在微信中退出才清除openid
			//清空之前先把数据库中清除一下
			$.ajax({
				type: "get", //访问WebService使用Post方式请求
				url: ajaxurl + "login_out", //调用WebService
				data: {
					usersafety: cookieget('usersafety')
				}, //Email参数
				dataType: "jsonp",
				crossDomain: true,
				error: function (x, e) {
					hideLoader();
				},
				success: function (response) { //回调函数，result，返回值
					cookieremove('usersafety');
					if (isHxApp()) {
						app_GoHome();
					} else {
						window.location = 'index.html';
					}
				}
			});
		} else {
			cookieremove('usersafety');
			if (isHxApp()) {
				app_GoHome();
			} else {
				window.location = 'index.html';
			}
		}
	} else {
		if (isHxApp()) {
			app_GoHome();
		} else {
			window.location = 'index.html';
		}
	}
}
//获取授权码
function get_usersafety() {
	if (isBlank(cookieget('usersafety')))
		return "";

	else
		return cookieget('usersafety');
}

//获取客户ID
function get_customerID() {
	if (isBlank(cookieget('customerID')))
		return "";

	else
		return cookieget('customerID');
}

function app_LocationService(second) {
	CallApp("Act=UploadLocation&Second=" + second);
}

function app_StopLocationService() {
	CallApp("Act=StopLocationService");
}

//获取线路id
function get_roadLineID() {
	if (isBlank(cookieget('roadLineID')))
		return "";

	else
		return cookieget('roadLineID');
}

//function cookiesetset(name, value, max_age) {
//    max_age = max_age || 10;
//    var exp = new Date();
//    exp.setTime(new Date().getTime() + max_age * 60 * 1000);
//    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + "; path=/";
//}
//function cookieget(name) {
//    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//    if (arr != null) {
//        return decodeURIComponent(arr[2])
//    }
//    return null
//}
//function cookieremove(name) {
//    cookiesetset(name, "", -1)
//}
//function cookiesetset(name, value, max_age) {
//    var storage = window.localStorage;
//    if (!storage) {
//        show_create("请退出无痕模式才可以登录!");
//        return false;
//    }
//    storage.setItem(name, encodeURIComponent(value));
//}
//function cookieget(name) {
//    //只有获取usersafety才会有APP判断
//    if (name == "usersafety") {
//        //判断APP
//        if (isHxApp()) {
//            var _app_para = app_para.split(',');
//            if (_app_para.length == 5)
//                if (!isBlank(_app_para[2])) {
//                    //$(document.body).append("<div style=\"width:100%;z-index:1001;position:static;overflow:auto;background:rgba(145, 145, 145, .4);display:block\" id=\"background\">" + app_para + "</div> ");

//                    return _app_para[2];
//                }
//        }
//    }

//    var storage = window.localStorage;
//    if (!storage) {
//        alert("请退出无痕模式才可以登录!");
//        return false;
//    }
//    else {
//        var arr = storage.getItem(name); //获取b的值
//        if (arr != null) {
//            return decodeURIComponent(arr)
//        }
//        return null;
//    }
//}
//function cookieremove(name) {
//    var storage = window.localStorage;
//    storage.removeItem(name); //清除c的值
//}
function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if (window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function () {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
}

function isAndroid() {
	var _app_para = app_para.split(',');
	if (_app_para.length >= 5) {
		if (!isBlank(_app_para[3]) && _app_para[3] == "android") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function isIos() {
	var _app_para = app_para.split(',');
	if (_app_para.length >= 5) {
		if (!isBlank(_app_para[3]) && _app_para[3] == "ios") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function cookiesetset(name, value) {
	var storage;
	if (isHxApp()) {
		if (!isBlank(item_para)) {
			var item_json = JSON.parse(item_para);
			if (item_json[name]) {
				item_json[name] = value;
				item_para = JSON.stringify(item_json);
			}
		} else {
			var item_json = new Object();
			item_json[name] = value;
			item_para = JSON.stringify(item_json);
		}

	}
	if (isAndroid()) {
		storage = window.LocalStorage;
		storage.setItem(name, encodeURIComponent(value));
	} else if (isIos()) {
		var p = {
			'key': name,
			'value': encodeURIComponent(value)
		};
		setupWebViewJavascriptBridge(function (bridge) {
			bridge.callHandler('setItem', p, function (response) {})
		})
	} else {
		storage = window.localStorage;
		if (!storage) {
			show_create("请退出无痕模式才可以登录!");
			return false;
		}
		storage.setItem(name, encodeURIComponent(value));
	}
	//if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
	//storage = window.LocalStorage;
	//storage.setItem(name, encodeURIComponent(value));
	//} else if (u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1) {
	//var p = {
	//'key' : name,
	//'value' : encodeURIComponent(value)
	//};
	//setupWebViewJavascriptBridge(function(bridge) {
	//bridge.callHandler('setItem', p, function(response) {
	//})
	//})
	//} else {
	//storage = window.localStorage;
	//if (!storage) {
	//show_create("请退出无痕模式才可以登录!");
	//return false;
	//}
	//storage.setItem(name, encodeURIComponent(value));
	//}
}

function cookieget(name) {
	// 只有获取usersafety才会有APP判断
	if (name == "usersafety") {
		// 判断APP
		if (isHxApp()) {
			var _app_para = app_para.split(',');
			if (_app_para.length == 5)
				if (!isBlank(_app_para[2])) {
					console.log("usersafety" + _app_para[2]);
					return _app_para[2];
				}
		}
	}

	if (isHxApp()) {
		try {
			if (isBlank(item_para)) {
				return null;
			}
			var item_json = JSON.parse(item_para);
			if (item_json[name]) {
				console.log(name + ":" + item_json[name]);
				return item_json[name];
			} else {
				return null;
			}
		} catch (e) {
			console.log(e.message);
			console.log(e.description);
		}
	} else {
		var storage = window.localStorage;
		if (!storage) {
			alert("请退出无痕模式才可以登录!");
			return false;
		} else {
			var arr = storage.getItem(name); //获取b的值
			if (arr != null) {
				return decodeURIComponent(arr)
			}
			return null;
		}
	}

}

function cookieremove(name) {

	var storage;
	if (isHxApp()) {
		var item_json = JSON.parse(item_para);
		if (item_json[name]) {
			delete item_json[name];
			item_para = JSON.stringify(item_json);
		}
	}
	if (isAndroid()) {
		storage = window.LocalStorage;
		storage.removeItem(name);
	} else if (isIos()) {
		setupWebViewJavascriptBridge(function (bridge) {
			bridge.callHandler('removeItem', name, function (response) {})
		})
	} else {
		storage = window.localStorage;
		storage.removeItem(name); // 清除c的值
	}

}
//获取地址问号后参数
function QueryString() {
	//构造参数对象并初始化 
	var name, value, i;
	var str = location.href; //获得浏览器地址栏URL串 
	var num = str.indexOf("?")
	str = str.substr(num + 1); //截取“?”后面的参数串 
	var arrtmp = str.split("&"); //将各参数分离形成参数数组 
	for (i = 0; i < arrtmp.length; i++) {
		num = arrtmp[i].indexOf("=");
		if (num > 0) {
			name = arrtmp[i].substring(0, num); //取得参数名称 
			value = arrtmp[i].substr(num + 1); //取得参数值 
			this[name] = value.replace(/\#$|\#top/, ""); //定义对象属性并初始化 (把最后一个#号删除了)
		}
	}
}

//返回site_id
function if_set_site_id() {
	if (isBlank(cookieget('hx_siteID'))) {
		defCity();
		if (isBlank(cookieget('hx_siteID'))) {
			var thisURL = window.location.href;
			window.location.href = 'stores.html?u=' + encodeURIComponent(thisURL);
		}
	} else {
		return cookieget('hx_siteID');
	}
}

//根据IP设置默认siteID
function defCity() {
	$.ajax({
		type: "get",
		url: loginurl + "getCityInfoNew",
		data: {},
		dataType: "jsonp",
		crossDomain: true,
		success: function (response) {
			if (response[0].status == "success") {
				cookiesetset('hx_siteID', response[0].city_id, 2);
			}
		}
	});
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2].replace(/\#$|\#top/, ""));
	return ''; //返回参数值
}

function randomString(len) {
	len = len || 10;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

//加密
function Base64() {

	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}

	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	// private method for UTF-8 encoding
	_utf8_encode = function (string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}

	// private method for UTF-8 decoding
	_utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

var show_create = function (l, k) {
	var h = "toast_notification";
	var e = 200;
	var g = 60;
	var d, dd, i;
	showclear();
	var j = e;
	d = document.getElementById(h) || document.createElement("div");
	d.id = h;
	d.style.cssText = ["vertical-align:middle", "display:block", "text-align:center", "width:" + j + "px", "height:auto", "padding:16px 10px", "background-color:#000", "opacity:0.7", "border-radius:5px", "color:#ffffff", "font-size:14px", "margin:0 -" + j / 2 + "px", "position:fixed", "top:50%", "left:50%", "word-break:break-all", "word-wrap:break-word", "z-index:80003"].join(";");
	d.innerHTML = l;
	document.body.appendChild(d);
	if (k > 0) {
		clearTimeout(i);
		i = setTimeout(showclear, k)
	} else {
		clearTimeout(i);
		i = setTimeout(showclear, 1500)
	}
};
var showclear = function () {
	var h = "toast_notification";
	var e = 200;
	var g = 60;
	var d, dd, i;
	d = document.getElementById(h);
	if (d) {
		d.innerText = "";
		document.body.removeChild(d)
	}
};

var show_loading = function () {
	var hh = "w-loading";
	var hh_bg = "w-loading_bg";
	show_loadclear();
	var dd = document.getElementById(hh) || document.createElement("div");
	dd.id = hh;
	dd.style.cssText = ["margin-left: -45px", "display:block", "margin-top: -40px", "visibility: visible", "z-index:80001"].join(";");
	dd.className = "cui-view cui-layer cui-loading";
	dd.innerHTML = "<div class=\"cui-layer-padding\"><div class=\"cui-layer-content\"><div class=\"cui-breaking-load\"><div class=\"cui-w-loading\"></div><i class=\"cui-white-logo\"></i></div></div></div>";
	dd.addEventListener('touchmove', function (event) {
		event.preventDefault();
	}, false);
	document.body.appendChild(dd);
	dd_bg = document.getElementById(hh_bg) || document.createElement("div");
	dd_bg.id = hh_bg;
	var he1 = document.body.offsetHeight >= document.documentElement.offsetHeight ? document.body.offsetHeight : document.documentElement.offsetHeight;
	var he2 = document.body.scrollHeight >= document.documentElement.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
	var he3 = document.body.clientHeight >= document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
	if (he1 < he2)
		he1 = he2;
	if (he1 < he3)
		he1 = he3;
	dd_bg.style.cssText = ["position: fixed", "left: 0px", "top: 0px", "width: 100%", "height: " + he1 + "px", "display:block", "visibility: visible", "z-index:80000"].join(";");
	dd_bg.className = "cui-view cui-mask cui-opacitymask";
	dd_bg.innerHTML = "<div></div>";
	dd_bg.addEventListener('touchmove', function (event) {
		event.preventDefault();
	}, false);
	document.body.appendChild(dd_bg);
};
var show_loadclear = function () {
	var hh = "w-loading";
	var hh_bg = "w-loading_bg";
	dd = document.getElementById(hh);
	if (dd) {
		dd.innerText = "";
		document.body.removeChild(dd)
	}
	dd_bg = document.getElementById(hh_bg);
	if (dd_bg) {
		dd_bg.innerText = "";
		document.body.removeChild(dd_bg)
	}
};

function isBlank(a) {
	if (a == "undefined" || a == null || a.length == 0) {
		return true
	} else {
		return false
	}
};

function is_weixn() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

/*
 */
function getOS() {
	var sUserAgent = navigator.userAgent;
	if (sUserAgent != "") {
		sUserAgent = sUserAgent.toLowerCase();
	}
	var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
	var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
	var bIsIpad = (sUserAgent.indexOf("ipad") > -1);
	var bIsIphoneOs = (sUserAgent.indexOf("iphone") > -1);
	var isUnix = (navigator.platform === "X11") && !isWin && !isMac;
	var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
	var bIsAndroid = (sUserAgent.indexOf("android") > -1);
	var bIsCE = (sUserAgent.indexOf("windows ce") > -1);
	var bIsWM = (sUserAgent.indexOf("windows") > -1) && ((sUserAgent.indexOf("phone") > -1) || (sUserAgent.indexOf("mobile") > -1));
	var wx = (sUserAgent.match(/MicroMessenger/i) == "micromessenger");
	if (bIsIpad || bIsIphoneOs) {
		return "1"; //ios
	}
	if (isLinux) {
		if (bIsAndroid) {
			return "2"; //Android
		} else {
			return "3"; //Linux
		}
	}
	if (isMac) {
		return "4"; //Mac
	}
	if (isUnix) {
		return "5"; //Unix
	}

	if (bIsCE || bIsWM) {
		return '6'; //wm
	}
	if (isWin) {
		var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
		if (isWin2K)
			return "7"; //Win2000
		var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
			sUserAgent.indexOf("Windows XP") > -1;
		if (isWinXP)
			return "7"; //WinXP
		var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
		if (isWin2003)
			return "7"; //Win2003
		var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
		if (isWinVista)
			return "7"; //WinVista
		var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
		if (isWin7)
			return "7"; //Win7
		var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
		if (isWin8)
			return "7"; //Win8
	}
	if (wx)
		return 8;
	return "9"; //other
}

////------------------------------------------js_app函数
////app回调函数
//function AppFunction(appstring) {
//    app_para = appstring;
//    //判断APP
//    if (isHxApp()) {
//        //------------------app中行隐藏头后脚
//        $("#heard1").hide();
//        $("#footer").hide();

//        //------------------app中行隐藏头后脚
//        var _app_para = app_para.split(',');
//        if (_app_para.length == 5) {
//            if (!isBlank(_app_para[4]) && _app_para[4] == "1") {
//                //执行加载数据，初始化
//                try {
//                    if (typeof (eval('HxAppready')) === "function") {
//                        HxAppready();
//                    }
//                } catch (e) {
//                }
//            }
//            else if (!isBlank(_app_para[4]) && _app_para[4] == "0") {
//                //当前页面就执行方法
//                try {
//                    if (typeof (eval('HxAppALLready')) === "function") {
//                        HxAppALLready();
//                    }
//                } catch (e) {
//                }
//            }
//        }
//    }
//    //    $(document.body).append("<div style=\"width:100%;z-index:1001;position:static;overflow:auto;background:rgba(145, 145, 145, .4);display:block\" id=\"background\">" + app_para + "</div> ");

//    //alert(app_para);
//}
// ------------------------------------------js_app函数
// app回调函数
function AppFunction(appstring, itemstring) {
	app_para = appstring;
	item_para = itemstring;
	// 判断APP
	if (isHxApp()) {
		// ------------------app中行隐藏头后脚
		$("#heard1").hide();
		//      $("#footer").html('');

		// ------------------app中行隐藏头后脚
		var _app_para = app_para.split(',');
		if (_app_para.length == 5) {
			if (!isBlank(_app_para[4]) && _app_para[4] == "1") {
				// 执行加载数据，初始化
				try {
					if (typeof (eval('HxAppready')) === "function") {
						HxAppready();
					}
				} catch (e) {}
			} else if (!isBlank(_app_para[4]) && _app_para[4] == "0") {
				// 当前页面就执行方法
				try {
					if (typeof (eval('HxAppALLready')) === "function") {
						HxAppALLready();
					}
				} catch (e) {}
			}
		}
	}
	// $(document.body).append("<div
	// style=\"width:100%;z-index:1001;position:static;overflow:auto;background:rgba(145,
	// 145, 145, .4);display:block\" id=\"background\">" + app_para + "</div>
	// ");

	// alert(app_para);
}
//打开URL页面(做重载判断)
function app_OpenUrl() {
	var page = "",
		newpage = "1",
		hide = "0",
		appdo = "0";
	if (arguments.length > 0)
		page = arguments[0];
	if (arguments.length > 1)
		newpage = arguments[1];
	if (arguments.length > 2)
		hide = arguments[2];
	if (arguments.length > 3)
		appdo = arguments[3];
	app_OpenUrl1(page, newpage, hide, appdo);
}
//打开URL页面
function app_OpenUrl1(page, newpage, hide, appdo) {
	//判断是不是必须要在APP中打开
	if (appdo == "1" && !isHxApp()) {
		window.location = "noapppage.html";
		return;
	}
	pages = "";
	if (newpage == "1") { //判断是否本页面打开
		if (page.indexOf("?") > 0) {
			pages = "&openNewWindow=1"
		} else {
			pages = "?openNewWindow=1"
		}
	} else {
		if (page.indexOf("?") > 0) {
			pages = "&openNewWindow=0"
		} else {
			pages = "?openNewWindow=0"
		}
	}
	if (hide == "1") { //判断显示隐藏
		pages = pages + "&hideNav=1"
	} else {
		pages = pages + "&hideNav=0"

	}
	if (isHxApp()) //判断在哪里打开
	{
		//alert(page + pages);
		window.location = page + pages;
	} else {
		window.location = page;
	}
}

//判断在请在APP中打开
function isHxApp() {
	if (isBlank(app_para)) //判断在哪里打开
		return false;
	else
		return true;
}
//通过URL判断在请在APP中打开
function isUrlHxApp() {
	if (isBlank(getUrlParam('app_para'))) //判断在哪里打开
		return false;
	else
		return true;
}
// 关闭当前页面
function app_GoBack() {
	// alert('关闭当前页');
	CallApp("Act=GoBack");
}

// 打开首面
function app_GoHome() {
	// alert('回返首页');
	CallApp("Act=GoHome");
}

// 发起定位
//function app_Location(type) {
//    AppCall.GetLocation(type);
//}
function app_Location(type) {
	CallApp("Act=GetLocation&SuccessType=" + type)
}
//打电话
function app_Tel(phone) {
	CallApp("Act=Tel&Phone=" + phone);
}
// 打开扫码
/**
 * Type   = qrtype barCode条形码  qrCode二维码  allCode 
 */
function app_QrCode(type, qrtype) {
	CallApp("Act=OpenQR&SuccessType=" + type + "&Type=" + qrtype);
}

// 打开相机拍照上传
function app_UploadPic(path, type) {
	CallApp("Act=OpenCamera&UploadUrl=" + path + "&SuccessType=" + type);
}
// 打开登录
function app_GoLogin() {
	// alert('打开登录');
	CallApp("Act=Login");
}

//清除登录信息
function app_ClearUserSafety() {
	CallApp("Act=ClearUserSafety");
}

//上传图片接口
function UploadPic() {
	CallApp("Act=UploadPic");
}

//js上传的图片之后返回地址

function UploadPicOk(pic) {
	//alert(pic);
}

//post request
function app_Post(url, usersafety, upjson, success, fail) {
	CallApp("Act=AppPost&Url=" + url + "&Usersafety=" + usersafety + "&Upjson=" + upjson + "&SuccessType=" + success + "&FailType=" + fail);
}

//分享接口
function SentParaToApp(shareTitle, shareUrl, shareImg, sharetxt) {
	//alert('分享接口');
	var shareTitle = $.url.encode(shareTitle);
	var shareUrl = $.url.encode(shareUrl);
	var shareImg = $.url.encode(shareImg);
	var sharetxt = $.url.encode(sharetxt);
	var queryStr = "Act=Share&Title=" + shareTitle + "&URL=" + shareUrl + "&Img=" + shareImg + "&shareTxt=" + sharetxt;
	//alert(queryStr);
	CallApp(queryStr);
}

//分享接口
function app_Share(shareTitle, shareUrl, shareImg, sharetxt) {
	//alert('分享接口');
	var shareTitle = $.url.encode(shareTitle);
	var shareUrl = $.url.encode(shareUrl);
	var shareImg = $.url.encode(shareImg);
	var sharetxt = $.url.encode(sharetxt);
	//alert("Act=Share&Click=1&Title=" + shareTitle + "&URL=" + shareUrl + "&Img=" + shareImg + "&shareTxt=" + sharetxt);
	CallApp("Act=Share&Click=1&Title=" + shareTitle + "&URL=" + shareUrl + "&Img=" + shareImg + "&shareTxt=" + sharetxt);
	//    var Title = $.url.encode("测试标题");
	//    var Url = $.url.encode("http://www.baidu.com");
	//    var Img = $.url.encode("http://img1.yytcdn.com/user/avatar/160223/35449554-1456235009432/-M-ab96e21ad9980710d427a9cac2a87cec_50x50.jpg");
	//    var shareTxt = $.url.encode("这是测试的内容&￥");
	//    CallApp("Act=Share&Click=1&Title=" + Title + "&URL=" + Url + "&Img=" + Img + "&shareTxt=" + shareTxt);
	//alert(Img);
}

function app_StopSound() {
	AppCall.GoBack("Act=StopSound");
}

function app_PlaySound() {
	AppCall.GoBack("Act=PlaySound");
}

function app_Vibrator() {
	AppCall.GoBack("Act=Vibrator");
}

//调用支付接口
function app_pay(parentID, successUrl, falseUrl) {
	//alert('调用支付接口');
	CallApp("Act=PayOrder&OrderNum=" + parentID + "&SuccessUrl=" + successUrl + "&FalseUrl=" + falseUrl);

}

function AppLocation(appstring) {
	// 判断APP
	try {
		if (typeof (eval('applocation')) === "function") {
			applocation(appstring);
		}
	} catch (e) {}

}

//app_GoBack、app_GoLogin、app_ClearUserSafety  注销
function app_LoginOut() {
	CallApp("Act=LoginOut");
}
//app_PlaySound、app_Vibrator  震动并且响起音乐
function app_PlaySoundAndVibrator() {
	CallApp("Act=PlaySoundAndVibrator")
}

//对齐方式 0--居左 , 1--居中, 2--居右 size字体大小 text内容
function SmPrinter(align, size, text) {
	CallApp("Act=SmPrintText&Align=" + align + "&Size=" + size + "&Text=" +
		text);
}

function app_SmPrinterBarCode(code) {
	CallApp("Act=SmPrintBarCode&Code=" + code);
}

function app_OpenMap(lat, lng, name) {
	CallApp("Act=OpenMap&Lat=" + lat + "&Lng=" + lng + "&Name=" + name);
}

function app_SmPrinterQrCode(text) {
	CallApp("Act=SmPrintQrCode&Text=" + text);
}

document.addEventListener('plusready', function () {
	var webview = plus.webview.currentWebview();
	plus.key.addEventListener('backbutton', function () {
		webview.canBack(function (e) {
			if (e.canBack) {
				webview.back();
			} else {
				webview.close(); //hide,quit
				//plus.runtime.quit();
			}
		})
	});
});

function webUrl(url) {
	window.location.href = url;
}

//返回
function myBack(url) {
	if (isHxApp()) {
		app_GoBack()
	} else {
		webUrl(url);
	}
}

//首页
function myHome(url) {
	if (isHxApp()) {
		app_GoHome()
	} else {
		webUrl(url);
	}
}

//调用app
function CallApp(para) {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS) {
		window.location.href = "APPCALL:" + para;
	}
	if (isAndroid) {
		AppCall.GoBack(para);
	}
}


//换行 line 行数
function app_BluetoothPrinterLn(line) {
	CallApp("Act=GzPrinterLn&Line=" + line);
}
//结束打印换行
function app_BluetoothPrinterEnd() {
	CallApp("Act=GzPrinterEnd");
}
//初始化打印
function app_BluetoothPrinterStart() {
	CallApp("Act=GzPrinterStart");
}

//蓝牙打印 context:打印内容  size:0-12一号字体 12-24二号字体  25-三号  bold:0不加粗 1加粗  gravity:0左对齐1居中2右对齐
function app_BluetoothPrinter(context, size, bold, gravity) {
	CallApp("Act=GzPrinter&Context=" + context + "&Size=" + size + "&Bold=" + bold + "&Gravity=" + gravity);
}
//打印切换蓝牙设备
function app_BluetoothPrinterChangeDevice() {
	CallApp("Act=GzPrinterChangeDevice");
}

//自封装打印方法
function blueToothPrint(arr) {
	if (isAndroid()) {
		app_BluetoothPrinterStart();
		app_BluetoothPrinterLn(1);
		for (j = 0, len = arr.length; j < len; j++) {
			//商户信息
			if (0 == j || 1 == j) {
				app_BluetoothPrinter(arr[j], 17, 1, 1);
			}
			//订单信息
			else if (2 < j && j < 9) {
				app_BluetoothPrinter(arr[j], 17, 0, 0);
			}
			//用户信息
			else if (j == len - 1) {
				app_BluetoothPrinter(arr[j], 17, 0, 0);
			}
			//商品明细列表
			else {
				app_BluetoothPrinter(arr[j], 9, 0, 0);
			}
		}
		app_BluetoothPrinterLn(4);
		app_BluetoothPrinterEnd();
	} else {
		blueToothPrintIOS(arr);
	}
}

function blueToothPrintIOS(arr) {
	// for (j = 0, len = arr.length; j < len; j++) {
	// 	//商户信息
	// 	if (0 == j || 1 == j) {
	// 		app_BluetoothPrinter(arr[j], 17, 1, 1);
	// 	}
	// 	//订单信息
	// 	else if (2 < j && j < 9) {
	// 		app_BluetoothPrinter(arr[j], 17, 0, 0);
	// 	}
	// 	//用户信息
	// 	else if (j == len - 1) {
	// 		app_BluetoothPrinter(arr[j], 17, 0, 0);
	// 	}
	// 	//商品明细列表
	// 	else {
	// 		app_BluetoothPrinter(arr[j], 9, 0, 0);
	// 	}
	// }
	CallApp("Act=GzPrinterIOS&Context=" + arr);
}


//调用短信接口,给该订单推送货上门提醒
function callSMS(userSafety, orderid) {
	jQuery.ajax({
		type: "get",
		url: horse_ajax + "notice",
		data: {
			safeCode: userSafety,
			orderID: orderid
		},
		dataType: "jsonp",
		crossDomain: true,
		success: function (response) {
			console.log(response[0].code + ":" + response[0].mesg);
		},
		error: function () {

		}
	})
}

//调用短信接口,告知用户订单被取消提醒
function callSMSRefuse(userSafety, orderHead) {
	jQuery.ajax({
		type: "get",
		url: horse_ajax + "noticeRefuse",
		data: {
			safeCode: userSafety,
			orderHead: orderHead
		},
		dataType: "jsonp",
		crossDomain: true,
		success: function (response) {
			console.log(response[0].code + ":" + response[0].mesg);
		},
		error: function () {

		}
	})
}




//------------------------------------------js_app函数//---------------------------------------------js_app函数//------------------------------------------js_app函数//------------------------------------------js_app函数//------------------------------------------js_app函数//------------------------------------------js_app函数//------------------------------------------js_app函数//------------------------------------------js_app函数//------------------------------------------js_app函数