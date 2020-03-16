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
			top:0,
			left:0,
			'background-color':'#000000',
			'z-index': 19891014,
			opacity: 0.4,
			height: $(window).height()
		}).appendTo("body");
		
		var msgDiv = $("<div class=\"datagrid-mask-msg\"></div>");
		
		var span = $("<span>"+msg+"</span>");
		
		msgDiv.append(span).appendTo("body");
		
			msgDiv.css({
				display: "block",
				position: "absolute",
				left: ($(document.body).outerWidth(true)-span.width()) / 2,
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
	error: function(msg,closeParent) {
		
		closeParent = closeParent == undefined ? 1 : 0;
		var opts = {
			"closeParent": closeParent
		};
		
		util.showDialog(msg, 0,"no",opts);
	},

	/** 添加选项卡
	 * @param {Object} href
	 * @param {Object} title
	 */
	addTab:function(href,title){
		
		var parentObj = util.getMainWin();
		
		var tabId = href.split("?")[0];
		
		if(parentObj.layuimini.checkTab(tabId,true)){
			
			parentObj.layuimini.delTab(tabId);
			
		}
		
		parentObj.layuimini.addTab(tabId, href, title, true);
		
		parentObj.layuimini.changeTab(tabId);
		
	},
	
	getMainWin:function(obj){
		
		var parentObj = obj|| parent;
		
		
		if(parentObj.layuimini != undefined){
			
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

			//url  = url + "&"+ "_agileAuthToken="+$.getAndSaveToken();

		} else {

			//url  = url +"?_agileAuthToken="+$.getAndSaveToken();
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
				
				if(util.isNull(callBack)){
					
					return ;
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

				if(util.isNull(callBack)){
					
					return ;
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
				
				if(util.isNull(callBack)){
					
					return ;
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
					
					if(util.isNull(callBack)){
						
						return ;
					}


					if ($.isFunction(callBack)) {
						callBack.call(this, opts);
						return;
					}

					if (callBack) {
						
						var arr = callBack.split(";")[0];
						
						arr  = arr.substring(arr.indexOf("=")+1);
						
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
	
	trans:function(str) {
		var retStr = str;
		if(!util.isNull(str)) {
			retStr = str.replace(/=/g, "_isEqual");
		}
		return retStr;
	},
	deTrans:function(str) {
		var retStr = str;
		if(!util.isNull(str)) {
			retStr = str.replace(/_isEqual/g, "=");
		}
		return retStr;
	},
	ajaxJson:function(msg,url,param,callBack,beforeSend,async){
		
		if(!util.isNull(msg)){
			
			util.load(msg);
			
		}
		
		
		$.ajax({
			type: "POST",
			url: url,
			data: JSON.stringify(param),
			contentType: "application/json",
			beforeSend: function(req) {
				
				if($.isFunction(beforeSend)){
					
					beforeSend.call(this,req);
				}
				
				
			},
			xhrFields: {
				withCredentials: false //跨域session保持
			},
			async: async == undefined ? true : async,
			dataType: "json",
			success: function(page) {
				
				util.disLoad();
				
				if($.isFunction(callBack)){
					
					callBack.call(this,page);
				}
				
			},error:function(){
				
				util.disLoad();
			}
		});
		
	},
	ajaxFile:function(msg,url,form,succFunc,errorFunc,xhrFunc){
		
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
		
				req.setRequestHeader("_agileAuthToken", $.cookie('JSESSIONID_token'));
			},
			xhrFields: {
		
				withCredentials: false //跨域session保持
			},
			xhr: function() {
				
				
				var myXhr = $.ajaxSettings.xhr();
				
				if($.isFunction(xhrFunc)){
					
					return xhrFunc.call(this,myXhr);
				}
		
				return myXhr;
		
			},
		
			success: function(data) {
		
				util.disLoad();
				
				if($.isFunction(succFunc)){
					
					return succFunc.call(this,data);
				}
		
			},
			error: function(data) {
				
				util.disLoad();
				
				if($.isFunction(errorFunc)){
					
					return errorFunc.call(this,data);
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
	
			return parseInt($(obj).css("margin-top").replace("px", "")) +
				parseInt($(obj).css("margin-bottom").replace("px", "")) +
				parseInt($(obj).css("padding-top").replace("px", "")) +
				parseInt($(obj).css("padding-bottom").replace("px", "")) +
				parseInt($(obj).css("border-top-width").replace("px", "")) +
				parseInt($(obj).css("border-bottom-width").replace("px", ""))
	
		},
		
		addToken:function(){
			
			
			var auth = $("input[type=hidden][name=agileAuthToken]",document.body);
			
			if(auth.length == 0){
				
				$(document.body).append("<input type='hidden' name='agileAuthToken' value='' />");
			}
			
			$("input[type=hidden][name=agileAuthToken]",document.body).val($.cookie('JSESSIONID_token'));
			
		},
		
		getToken:function(){
			
			return "agileAuthToken="+$("input[type=hidden][name=agileAuthToken]",document.body).val();
		}



}
