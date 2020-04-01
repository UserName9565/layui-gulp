/**
 *
 * 工具类
 *
 * @author xiacj
 * @version 1.0
 * @date 2019-01-24
 *
 */
util = {

	/**
	 * 判断表单值是否为空
	 *
	 * @param 表单
	 */
	isNull: function(val) {

		if (val == null || val == undefined || val == "" || val == "undefined" ||
			val == "null") {
			return true;
		} else {
			return false;
		}
	},

	//弹出加载层
	load: function(msg) {
		$("<div class=\"datagrid-mask\"></div>").css({
			display: "block",
			width: "100%",
			position: "absolute",
			top: 0,
			left: 0,
			'background-color': '#000000',
			'z-index': 19891014,
			opacity: 0.4,
			height: $(window).height()
		}).appendTo("body");

		var msgDiv = $("<div class=\"datagrid-mask-msg\"></div>");

		var span = $("<span>" + msg + "</span>");

		msgDiv.append(span).appendTo("body");

		msgDiv.css({
			display: "block",
			position: "absolute",
			left: ($(document.body).outerWidth(true) - span.width()) / 2,
			top: ($(window).height() - 45) / 2
		});
	},

	//取消加载层
	disLoad: function() {
		$(".datagrid-mask").remove();
		$(".datagrid-mask-msg").remove();
	},

	//告警提示
	warning: function(msg) {
		util.showDialog(msg, 1);
	},
	//操作成功提示
	success: function(msg, closeParent) {
		closeParent = closeParent == undefined ? 1 : 0;
		var opts = {
			"closeParent": closeParent
		};
		util.showDialog(msg, 2, "no", opts);
	},

	//操作失败提示
	error: function(msg, closeParent) {

		closeParent = closeParent == undefined ? 1 : 0;
		var opts = {
			"closeParent": closeParent
		};

		util.showDialog(msg, 0, "no", opts);
	},

	/** 添加选项卡
	 * @param {Object} href
	 * @param {Object} title
	 */
	addTab: function(href, title) {

		var parentObj = util.getMainWin();

		var tabId = href.split("?")[0];

		if (parentObj.layuimini.checkTab(tabId, true)) {

			parentObj.layuimini.delTab(tabId);

		}

		parentObj.layuimini.addTab(tabId, href, title, true);

		parentObj.layuimini.changeTab(tabId);

	},

	getMainWin: function(obj) {

		var parentObj = obj || parent;


		if (parentObj.$("#top_tabs_box").length > 0) {

			return parentObj;
		}

		return util.getMainWin(parentObj.parent);

	},
	//打开窗口
	openWin: function(url, title, w, h, opts) {

		var closeBtnOpt = 1;

		if (opts != undefined && opts.closeBtn != undefined) {
			closeBtnOpt = opts.closeBtn;
		}

		var winW = $(document).width();
		var winH = $(window).height();
		if (winW < w) {
			w = winW - 60;
		}

		if (winH < h) {
			h = winH - 70;
		}

		if (h > 700) {
			h = 700;
		}

		var offSetX = (winW - w) / 2;
		var offSetY = (winH - h) / 2;

		if (title == null || title == '') {
			title = false;
		};
		if (url == null || url == '') {
			url = "404.html";
		};

		//w = 300;
		//h = 200;

		if (w == null || w == '') {
			w = 800;
		};
		if (h == null || h == '') {
			h = ($(window).height() - 50);
		};

		if (url.indexOf("?") != -1) {

			//url  = url + "&"+ "_agileauthtoken="+$.getAndSaveToken();

		} else {

			//url  = url +"?_agileauthtoken="+$.getAndSaveToken();
		}

		var layIndex = layer.open({
			type: 2,
			area: [w + 'px', h + 'px'],
			fix: false,
			maxmin: true,
			shade: 0.4,
			title: title,
			content: url,
			skin: 'layui-layer-lan',
			offset: [offSetY + 'px', offSetX + 'px'],

			moveOut: false,
			closeBtn: closeBtnOpt,
			cancel: function() {
				//	showObj();
			},
			full: function() {



			},
			min: function() {

			},
			restore: function() {

				//var body = layer.getChildFrame('body', layIndex);

			}
		});

		return layIndex;
	},

	/**
	 *关闭窗口
	 */
	closeWin: function() {
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
	},
	/**
	 *关闭所有窗口
	 */
	closeAll: function() {
		layer.closeAll();
	},

	/**
	 * @param {Object} retMsg
	 * @param {Object} type
	 * @param {Object} callBack
	 * @param {Object} opts
	 */
	showDialog: function(retMsg, type, callBack, opts) {

		util.closeAll();
		var winW = $(document).width();
		var winH = $(window).height() == 0 ? $(document).height() : $(window).height();

		var off = [(winH / 2 - 72) + 'px', (winW / 2 - 181) + 'px'];
		if (type == 2) {
			layer.alert(retMsg, {
				offset: off,
				title: ['\u63d0\u793a\u4fe1\u606f', true],
				icon: 1,
				closeBtn: 0
			}, function(index) {

				layer.close(index);
				if (opts != undefined && opts.closeParent == 1) {
					util.closeWin();
				}

				if (util.isNull(callBack)) {

					return;
				}

				if ($.isFunction(callBack)) {

					callBack.call(this);

					return;
				}

				if (callBack != "no") {
					var arr = callBack.split("=");
					eval(arr[1]);
				}
			});
		} else if (type == 1) {
			layer.alert(retMsg, {
				offset: off,
				title: ['\u63d0\u793a\u4fe1\u606f', true],
				icon: 0,
				closeBtn: 0
			}, function(index) {

				layer.close(index);

				if (util.isNull(callBack)) {

					return;
				}

				if ($.isFunction(callBack)) {

					callBack.call(this);

					return;
				}

				if (callBack != "no") {
					var arr = callBack.split("=");
					eval(arr[1]);
				}
			});
		} else if (type == 0) {
			layer.alert(retMsg, {
				offset: off,
				title: ['\u63d0\u793a\u4fe1\u606f', true],
				icon: 2,
				closeBtn: 0
			}, function(index) {

				layer.close(index);

				if (util.isNull(callBack)) {

					return;
				}

				if ($.isFunction(callBack)) {

					callBack.call(this);

					return;
				}

				if (callBack != "no") {
					var arr = callBack.split("=");
					eval(arr[1]);
				}
			});
		} else if (type == 3) {

			layer.confirm(retMsg, {
				offset: off,
				closeBtn: 0,
				title: ['\u63d0\u793a\u4fe1\u606f', true],
				yes: function(index) {

					layer.close(index);

					if (util.isNull(callBack)) {

						return;
					}


					if ($.isFunction(callBack)) {
						callBack.call(this, opts);
						return;
					}

					if (callBack) {

						var arr = callBack.split(";")[0];

						arr = arr.substring(arr.indexOf("=") + 1);

						console.log(arr);

						eval(arr);
					}
				}
			}, function(index) {
				layer.close(index);


				if (callBack && callBack.split(";").length > 1) {

					var arr = callBack.split(";")[0].split("=");

					eval(arr[1]);
				}

			}, function(index) {
				layer.close(index);

			});
		}


	},

	/**
	 *获取查询字符串参数
	 *
	 */
	getUrlParam: function() {

		var param = {};

		try {

			var queryStr = window.location.search.substr(1);
			$.each(queryStr.split("&"), function(i, t) {

				var arr = t.split("=");
				if (!util.isNull(arr[0]) && arr.length == 2) {

					param[arr[0]] = util.decode(arr[1]);
				}

			});

		} catch (e) {

			console.log(e);
		}

		return param;

	},

	encode: function(url) {
		return encodeURI(url);
	},

	decode: function(url) {

		return decodeURIComponent(url).replace(/\+/g, " ");
	},
	getAgCtx: function(obj) {

		if (obj == undefined || obj == null) {

			return "sysmgr";
		}

		var ctx = $(obj).attr("ag-data-ctx");

		return util.isNull(ctx) ? "sysmgr" : ctx;
	},
	/*
	 ** randomWord 产生任意长度随机字母数字组合
	 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
	 **
	 */

	randomWord: function(randomFlag, min, max) {
		var str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
				'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
				'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];

		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	},
	/**
	 * 时间计算差
	 *
	 * @param {Object} timesData
	 */
	timeDiff: function(timesData) {

		var dateBegin = new Date(timesData.replace(/-/g, "/")); //将-转化为/，使用new Date

		var dateEnd = new Date(); //获取当前时间

		var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数

		if (dateDiff < 0) {

			return "未知";
		}

		var dayDiff = parseInt(dateDiff / (24 * 3600 * 1000)); //计算出相差天数

		var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数

		var hours = parseInt(leave1 / (3600 * 1000)) //计算出小时数

		//计算相差分钟数
		var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数

		var minutes = parseInt(leave2 / (60 * 1000)) //计算相差分钟数

		//计算相差秒数
		var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数

		var seconds = parseInt(leave3 / 1000);

		var timesString = '';

		if (dayDiff > 0) {
			timesString = dayDiff + '天之前';
		} else if (dayDiff < 1 && hours > 0) {
			timesString = hours + '小时之前';
		} else if (dayDiff < 1 && hours < 1 && minutes > 0) {

			timesString = minutes + '分钟之前';
		} else if (dayDiff < 1 && hours < 1 && minutes < 1) {
			timesString = seconds + '秒之前';
		}

		return timesString;
	},
	getTime: function(datetime) {

		var date = datetime ? new Date(datetime) : new Date();

		var y = date.getFullYear() + '-';
		var mm = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var d = date.getDate() + ' ';
		var h = ((date.getHours() + "").length == 1 ? "0" + date.getHours() : date.getHours()) + ':';
		var m = ((date.getMinutes() + "").length == 1 ? "0" + date.getMinutes() : date.getMinutes()) + ':';
		var s = ((date.getSeconds() + "").length == 1 ? "0" + date.getSeconds() : date.getSeconds());

		return y + mm + d + h + m + s;
	},

	trans: function(str) {
		var retStr = str;
		if (!util.isNull(str)) {
			retStr = str.replace(/=/g, "_isEqual");
		}
		return retStr;
	},
	deTrans: function(str) {
		var retStr = str;
		if (!util.isNull(str)) {
			retStr = str.replace(/_isEqual/g, "=");
		}
		return retStr;
	},
	ajaxJson: function(msg, url, param, callBack, beforeSend, async) {

		if (!util.isNull(msg)) {

			util.load(msg);

		}


		$.ajax({
			type: "POST",
			url: url,
			data: JSON.stringify(param),
			contentType: "application/json;charset=UTF-8",
			beforeSend: function(req) {

				req.setRequestHeader("agileauthtoken", util.getToken());

				if ($.isFunction(beforeSend)) {

					beforeSend.call(this, req);
				}


			},
			xhrFields: {
				withCredentials: false //跨域session保持
			},
			async: async ==undefined ? true : async,
			dataType: "json",
			success: function(page) {

				util.disLoad();

				if ($.isFunction(callBack)) {

					callBack.call(this, page);
				}

			},
			error: function() {

				util.disLoad();
			}
		});

	},
	ajaxFile: function(msg, url, form, succFunc, errorFunc, xhrFunc) {

		util.load(msg);

		$.ajax({
			type: "post",
			url: url,
			//		enctype: "multipart/form-data",
			contentType: false,
			processData: false,
			crossDomain: true,
			dataType: "json",
			data: form,
			beforeSend: function(req) {

				req.setRequestHeader("agileauthtoken", util.getToken());
			},
			xhrFields: {

				withCredentials: false //跨域session保持
			},
			xhr: function() {


				var myXhr = $.ajaxSettings.xhr();

				if ($.isFunction(xhrFunc)) {

					return xhrFunc.call(this, myXhr);
				}

				return myXhr;

			},

			success: function(data) {

				util.disLoad();

				if ($.isFunction(succFunc)) {

					return succFunc.call(this, data);
				}

			},
			error: function(data) {

				util.disLoad();

				if ($.isFunction(errorFunc)) {

					return errorFunc.call(this, data);
				}

			}
		});

	},
	getMarginHeight: function(obj) {

		return parseInt($(obj).css("margin-top").replace("px", "")) +
			parseInt($(obj).css("margin-bottom").replace("px", ""))
	},

	/**
	 * 刨除 height属性高度外 所有高度
	 * @param {Object} obj
	 */
	getRealityOrderHeight: function(obj) {

		
		var height = parseInt($(obj).css("margin-top").replace("px", "")) +
			parseInt($(obj).css("margin-bottom").replace("px", "")) +
			parseInt($(obj).css("padding-top").replace("px", "")) +
			parseInt($(obj).css("padding-bottom").replace("px", "")) ;
		
		var top  =parseInt($(obj).css("border-top-width").replace("px", "")) ;
		
		var bottom = parseInt($(obj).css("border-bottom-width").replace("px", ""));
		
		return height + (isNaN(top) ? 0 : top) + (isNaN(bottom) ? 0 : bottom);
			

	},

	addToken: function(value) {

		// var obj = util.getMainWin();

		// var auth = $("input[type=hidden][name=agileauthtoken]", obj.$("#top_tabs_box"));

		// if (auth.length == 0) {

		// 	obj.$("#top_tabs_box").append("<input type='hidden' name='agileauthtoken' value='' />");
		// }
		// obj.$("#top_tabs_box").find("input[type=hidden][name=agileauthtoken]").val(util.getToken());

		util.setSession("agileauthtoken", value);
	},

	getToken: function() {


		//return util.getMainWin().$("#top_tabs_box").find("input[type=hidden][name=agileauthtoken]").val();

		return util.getAndSaveToken();
		//return util.getToken();
	},
	/**
	 * 小于10的数字前加0
	 * @param {Object} num
	 */
	formatSmallNum: function(num) {
		var newnum = parseInt(num);
		if (newnum < 10) { // 调整日小于10时的格式
			newnum = 0 + '' + newnum;
		}
		return newnum
	},

	/**
	 * 处理加减月时，当日大于28时，将新的日在新的月份中合理化
	 * @param {Object} newyear
	 * @param {Object} newmonth
	 * @param {Object} newday
	 */
	adjustNewDay: function(newyear, newmonth, newday) {

		var monthbs = [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1] // 定义月份的大小

		var newAdjustedDay = newday;
		if (monthbs[newmonth - 1] < 1 && newday > 28) { // 将新的日在新的月份中合理化
			if (newmonth != 2) { // 不是二月时
				newAdjustedDay = 30
			} else {
				if ((newyear % 4 == 0) && (newyear % 100 != 0 || newyear % 400 == 0)) { // 二月时判断是否为闰年
					newAdjustedDay = 29
				} else {
					newAdjustedDay = 28
				}
			}
		}
		return newAdjustedDay;
	},
	/**
	 * 获取当月份最大天数
	 * @param {Object} newyear
	 * @param {Object} month
	 */
	getMonthMaxDays: function(newyear, month) {

		var monthbs = [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1] // 定义月份的大小
		var newmonthdays = 31;
		if (monthbs[month - 1] < 1) {
			if (month != 2) {
				newmonthdays = 30
			} else {
				if ((newyear % 4 == 0) && (newyear % 100 != 0 || newyear % 400 == 0)) { // 二月时判断是否为闰年
					newmonthdays = 29
				} else {
					newmonthdays = 28
				}
			}
		}
		return newmonthdays;
	},
	/**
	 * 用来计算增减天数的递归
	 * @param {Object} year
	 * @param {Object} month
	 * @param {Object} day
	 * @param {Object} delayTime
	 */
	recursionDays: function(year, month, day, delayTime) {
		var newyear = year;
		var newmonth = month;
		var newday = day + delayTime;
		var newmonthdays = util.getMonthMaxDays(year, month);
		if (newday <= newmonthdays) {
			newmonth = util.formatSmallNum(newmonth)
			newday = util.formatSmallNum(newday)
			return newyear + "" + newmonth + "" + newday
		} else {
			newmonthdays = util.getMonthMaxDays(year, month); // 目标月最大天数
			newmonth = month + 1;
			newdelay = newday - newmonthdays;
			newday = 0;
			if (newmonth > 12) {
				newyear = newyear + 1;
				newmonth = newmonth - 12;
			}
			return util.recursionDays(newyear, newmonth, newday, newdelay)
		}
	},
	addTodayTime: function(offset, fmt) {

		return util.addTime(new Date().toString(), offset, fmt);
	},
	addTime: function(date, delay, fmt) {

		date = new Date(date);

		var year = date.getFullYear(); // 获取年

		var month = date.getMonth(); // 获取月

		var day = date.getDay(); // 获取日

		var newdate;

		if (delay.endWith("M")) { // 处理月份加
			delayTime = parseInt(delay.substring(0, delay.length - 1)) // 获取要加的月数
			var newyear = year
			var newmonth = month + delayTime;
			var newday = day;
			if (newmonth > 12) { // 月份加后大于12
				var newyear = newyear + 1;
				var newmonth = newmonth - 12;
			}
			newday = util.adjustNewDay(newyear, newmonth, newday);
			newmonth = util.formatSmallNum(newmonth);
			newday = util.formatSmallNum(newday);
			newdate = newyear + "" + newmonth + "" + newday; // 组装新日期
		}
		if (delay.endWith("D")) { // 处理天数加
			delayTime = parseInt(delay.substring(0, delay.length - 1)) // 获取要加的天数
			newdate = util.recursionDays(year, month, day, delayTime); // 通过递归方式计算delayTime天后的日期
		}

		if (delay.endWith("Y")) { // 处理年数加

			delayTime = parseInt(delay.substring(0, delay.length - 1)) // 获取要加的天数

			newyear = year + delayTime;

			newdate = newyear + "" + newmonth + "" + newday; // 组装新日期
		}

		return new Date(newdate).format(fmt);
	},
	setSession: function(key, val) {
		sessionStorage.setItem(key, val);
	},
	getSessoin: function(key) {
		return sessionStorage.getItem(key);
	},
	delSession: function(key) {

		sessionStorage.removeItem(key);
	},
	getAndSaveToken: function() {
		var token;
		var searchStr = location.search;
		if (!util.isNull(searchStr)) {
			searchStr = searchStr.substr(1);
			var arr = searchStr.split("&");
			for (var i = 0; i < arr.length; i++) {
				var arr2 = arr[i].split("=");
				if (arr2[0] == "agileauthtoken") {
					token = arr2[1];
					util.setSession("agileauthtoken", token);
					break;
				}
			}
		}

		if (util.isNull(token)) {
			token = util.getSessoin("agileauthtoken");
		}

		return token;
	},
	/**
	 * 判断ie版本
	 * 
	 */
	IEVersion: function() {

		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
		var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
		var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
		if (isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if (fIEVersion == 7) {
				return 7;
			} else if (fIEVersion == 8) {
				return 8;
			} else if (fIEVersion == 9) {
				return 9;
			} else if (fIEVersion == 10) {
				return 10;
			} else {
				return 6; //IE版本<=7
			}
		} else if (isEdge) {
			return -1; //edge
		} else if (isIE11) {
			return 11; //IE11  
		} else {
			return -1; //不是ie浏览器
		}

	}
}

String.prototype.endWith = function(str) {

	var reg = new RegExp(str + "$");

	return reg.test(this);
}
String.prototype.startWith = function(str) {

	var reg = new RegExp("^" + str);

	return reg.test(this);
}
