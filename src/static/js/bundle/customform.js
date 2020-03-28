/**
 *
 * 扩展按钮事件处理
 *
 * @author xiacj
 * @version 1.0
 * @date 2020-02-16
 *
 */


layui.use(['element', 'form', 'table', 'checkForm', 'laydate', 'mapChooser'], function() {

	var form = layui.form,
		layer = layui.layer,
		$ = layui.$;
	table = layui.table;
	
	checkForm = layui.checkForm;
	laydate = layui.laydate;
	mapChooser = layui.mapChooser;
	//自定义插件
	var customPlugins = {};
	customPlugins["mapChooser"] = mapChooser;

	var $window = $(window);


	var file_types = {

		"application/pdf": "pdf",
		"application/x-zip-compressed": "zip",
		"image/gif": "gif",
		"image/png": "png",
		"image/jpg": "jpg",
		"image/bmp": "bmp",
		"image/jpeg": "jpg",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document":"doc",
		"application/msword":"doc",
		"application/vnd.ms-excel":"excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"excel",
		"application/vnd.openxmlformats-officedocument.presentationml.presentation":"ppt"

	};

	/**
	 * 获取表单json格式参数
	 *
	 * @param {Object} formId
	 */
	function getFormJson(form) {

		var paramJson = {};
		var arr = $(form).find("input[type!=checkbox][name],textarea[name]");

		for (var i = 0; i < arr.length; i++) {
			paramJson[arr[i].name] = $(arr[i]).val();
		}

		var arr2 = $(form).find("select[name]");
		for (var i = 0; i < arr2.length; i++) {

			paramJson[arr2[i].name] = $(arr2[i]).val();
			var nameKey = $(arr2[i]).attr("ag-sel-name");
			var text = $(arr2[i]).find("option:selected").text();
			paramJson[nameKey] = text;
		}

		//复选框
		$(".ag-chkbox").each(function(idx, chkDiv) {
			var key = $(chkDiv).attr("ag-chkbox-name");
			var chkVal = "";
			$("input[name=" + key + "]").each(function(chkIdx, chk) {
				if ($(chk)[0].checked) {
					chkVal = chkVal + $(chk).attr("customVal") + ",";
				}
			});

			if (!util.isNull(chkVal)) {

				chkVal = chkVal.substr(0, chkVal.length - 1);
				paramJson[key] = chkVal;
			}
		});



		var agFile = $(form).find("[ag-file-submit-key]");

		/**
		 * 存储附件ID
		 */
		if (agFile.length > 0) {

			var key = agFile.eq(0).attr("ag-file-submit-key");

			if (!util.isNull(key)) {

				var arr = new Array();

				$.each(agFile.eq(0).find(".ag-file-item-li"), function(i, item) {

					if (!util.isNull($(item).data("ag-file-name-savename"))) {

						arr.push($(item).data("ag-file-name-savename"));
					}

				});

				paramJson[key] = arr.join(",");
			}


		}

		return paramJson;
	};



	/**
	 * 初始化查按钮的点击事件
	 *
	 */
	function initBtnLsnr() {

		$(".ag-btn-query").on("click", queryList);

		$(".ag-btn-add").on("click", addInit);

		$(".ag-btn-update").on("click", updateInit);

		$(".ag-btn-cancel").on("click", cancel);

		$(".ag-btn-save").on("click", save);
		//用bind方法绑定可能会导致重负提交
		$(".ag-btn-del").on("click", del);

		$(".ag-btn-reset").on("click",resetForm);
	};
	
	function resetForm(){
		
			var index = $(this).attr("ag-data-index");
			var form = $(".ag-form[ag-data-index=" + index + "]");
			
			$.each(form.find("[name]"),function(i ,item){
					
					$(item).val("");
			});
		
	}

	/**
	 *
	 * 处理分页按钮事件,数据加载之后调用
	 *
	 */
	function addPageLisnr(page, index) {

		var pageHtml =
			'<a href="#" rel="pre" class="ag-btn-page-pre">&lt; 上一页</a> <a href="#" rel="next" class="ag-btn-page-next">下一页&gt;</a><span id="totalPageSpan"></span>|<span id="totalRecordSpan"></span>|<span id="pageNoSpan"></span>';
		$(".ag-area-page").html(pageHtml);

		//上一页
		$(".ag-btn-page-pre").unbind();
		$(".ag-btn-page-pre").bind("click", function() {

			var pageNo = parseInt(page.pageNo);
			if (pageNo >= 2) {

				pageNo = pageNo - 1;
				var pageSize = page.pageSize;


				var pageJson = {
					"pageNo": pageNo,
					"pageSize": pageSize
				};
				var pageJsonStr = JSON.stringify(pageJson);
				$("input[name=page]").val(pageJsonStr);

				$(".ag-btn-query[ag-data-index=" + index + "]").click();

			}


		});

		//下一页
		$(".ag-btn-page-next").unbind();
		$(".ag-btn-page-next").bind("click", function() {

			var pageNo = parseInt(page.pageNo);
			var totalPage = parseInt(page.totalPage);

			if ((pageNo + 1) <= totalPage) {

				pageNo = pageNo + 1;
				var pageSize = page.pageSize;
				var pageJson = {
					"pageNo": pageNo,
					"pageSize": pageSize
				};
				var pageJsonStr = JSON.stringify(pageJson);
				$("input[name=page]").val(pageJsonStr);

				$(".ag-btn-query[ag-data-index=" + index + "]").click();
			}

		});


		$("#totalPageSpan").html("总页数:" + page.totalPage);
		$("#totalRecordSpan").html("总记录数:" + page.totalRecord);
		$("#pageNoSpan").html("当前页:" + page.pageNo);

	};


	/**
	 * 根据列配置信息和数据，装饰数据，加入链接处理
	 *
	 * @param {Object} colInfo
	 * @param {Object} data
	 */
	function decorateData(colsStr) {

		var colModel = $.parseJSON(colsStr);

		for (var i = 0; i < colModel.length; i++) {

			for (var k = 0; k < colModel[i].length; k++) {


				if (!colModel[i][k].align) {

					colModel[i][k].align = "center";
				}

				if (colModel[i][k].btns) {

					if (!$.isArray(colModel[i][k].btns)) {

						return;
					}
					var id = "tpl_btns_" + util.randomWord(false, 8);

					colModel[i][k].templet = "#" + id;

					var appendAHtml = "";

					for (var z = 0; z < colModel[i][k].btns.length; z++) {

						var item = colModel[i][k].btns[z];

						var realUrl = decorateTpl(item.url);

						var lsnrStr = getHrefLsnr(item.openType);

						var aFunc = lsnrStr + "('" + realUrl + "','" + item.openTitle + "',"+item.width+","+item.height+")";

						var a = "<a href='javascript:void(0)'  style='padding:0px 5px' class=' layui-table-link " + item.className +
							"' onclick=" + aFunc + ">" + (item.btnVal ? item.btnVal : "操作") + "</a>";

						appendAHtml += a;



					}

					appendScript(id, appendAHtml);
				}

			}


		}

		return colModel;

	}

	/**
	 *根据href的类型获取链接处理函数名称
	 *
	 * @param {Object} openType
	 */
	function getHrefLsnr(openType) {

		var hrefLsnr = {
			"openType0": "_listHrefDownloadFile",
			"openType1": "_listHrefWindow",
			"openType2": "_listHrefTab",
		};
		var funcName = hrefLsnr["openType" + openType];
		return funcName;
	}

	function appendScript(id, a) {

		if ($("#" + id).length > 0) {

			$("#" + id).remove();
		}

		var scr = $("<script type='text/html' id='" + id + "'></script>");

		scr.append(a);

		scr.appendTo($(document.body));
	}

	/**
	 *
	 * 根据配置url和参数 转换模板
	 *
	 */
	function decorateTpl(inUrl, model) {

		var url = inUrl.replace("&amp;", "&");

		var realUrl = url;

		if (url.indexOf("?") != -1) {

			var tempArr = url.split("?");

			var realParam = "";

			var urlNoParam = tempArr[0];

			var paramStr = tempArr[1];

			var paramArr = paramStr.split("&");

			for (var k = 0; k < paramArr.length; k++) {

				var pair = paramArr[k].split("=");

				if (pair.length == 1 || util.isNull(pair[1])) {

					realParam += paramArr[k] + "&";

					continue;

				}

				/**
				 * $Query 代表从查询参数获取
				 */

				if ("$Query" == pair[1]) {

					if ($("[name=" + pair[0] + "]").length > 0) {

						realParam += pair[0] + "=" + $("[name=" + pair[0] + "]").eq(0).val() + "&";

					} else {

						realParam += pair[0] + "=" + "&";
					}

					continue;

				}
				var arr = pair[1].match(/@(\S*)@/g);

				if (arr != null) {

					for (var kk in arr) {

						pair[1] = pair[1].replace(arr[kk], "{{d." + arr[kk].substring(1, arr[kk].length - 1) + "}}");
					}

					realParam += pair[0] + "=" + pair[1] + "&";

					continue;
				}


				realParam += paramArr[k] + "&";

			}

			realUrl = urlNoParam + "?" + realParam;
		}
		
		realUrl = realUrl.replace("@ctx@",ctx);

		return realUrl;

	}

	/**
	 *
	 * 查询方法
	 */
	function queryList() {


		var index = $(this).attr("ag-data-index");
		var form = $(".ag-form[ag-data-index=" + index + "]");
		var url = $(this).attr("ag-data-url");
		
		var checkRet = checkForm.validateForm(form);
		if (!checkRet) {
			return false;
		}
		
		initPage(index);
		
		var param = getFormJson($(".ag-form[ag-data-index=" + index + "]"));
		var agCtx = util.getAgCtx(this);
		url = ctx + "/" + agCtx + url;

		util.ajaxJson("查询中,请稍后...", url, param, function(page) {

			var colsStr = $(".ag-table-header[ag-data-index=" + index + "]").html();

			var cols = decorateData(colsStr);
			
			var allWidth = 0;
			
			for(var k in cols[0]){
				
				if(!util.isNull(cols[0][k].width) ){
					
					allWidth += parseInt(cols[0][k].width);
					
					continue;
				}
				
				allWidth += 120;
				
				
			}
			
			var gdtWidth = $(document.body).width()  < allWidth ? 18 : 0 ;
			
			
			
			//执行一个 table 实例
			table.render({
				elem: $(".ag-table[ag-data-index=" + index + "]"),
				height: $(".ag-table").height()-35 - gdtWidth,
				data: page.data, //数据接口
				title: '用户表',
				page: false, //开启分页
				totalRow: false, //开启合计行
				limit:$.parseJSON(param.page).pageSize,
				cols: cols
			});
			
			buildPage(page, index);

		}, function(req) {

			var page = $("input[name=page]").val();
			req.setRequestHeader("page", page);

		});
	};


	function initPage(idx) {


		var pager = $(".ag-table[ag-data-index=" + idx + "] ").siblings(".ag-area-page");
		

		if (pager.length == 0) {

			return;
		}

		if (pager.children(".layui-table-page").length > 0) {

			return;

		}
		
		pager.empty();
		
		var pageInput = $(".ag-form[ag-data-index=" + idx + "] > input[name=page]");
		
		if (pageInput.length == 0) {
			
			var input = $("<input type='hidden' name='page' value=''>");
			
			$(".ag-form[ag-data-index=" + idx + "]").append(input);
			
			$(input).val('{"pageNo":"1","pageSize":"20"}');
		}
		
		var pageSize  = $.parseJSON($(".ag-form[ag-data-index=" + idx + "] > input[name=page]").val()).pageSize;

		var pageDiv = $('<div class="layui-table-page"></div>');

		var box = $("<div class='layui-box layui-laypage layui-laypage-default'></div>");

		var firstA = $(
			'<a href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="1"><i class="layui-icon"></i></a>');

		box.append(firstA);

		var lastA = $(
			'<a href="javascript:;" class="layui-laypage-next layui-disabled" data-page="1"><i class="layui-icon"></i></a>');

		box.append(lastA);

		var search = $(
			'<span class="layui-laypage-skip">到第<input type="text" min="1" max = "1" value="1" class="layui-input">页<button type="button" class="layui-laypage-btn">确定</button></span>'
		);

		box.append(search);

		var count = $('<span class="layui-laypage-count">共 0 条</span>');

		box.append(count);

		var limit = $(
			'<span class="layui-laypage-limits"><select class="page-select"><option value="10" >10 条/页</option><option value="20">20 条/页</option><option value="30">30 条/页</option><option value="40">40 条/页</option><option value="50">50 条/页</option><option value="60">60 条/页</option><option value="70">70 条/页</option><option value="80">80 条/页</option><option value="90">90 条/页</option></select></span>'
		);


		box.append(limit);

		pageDiv.append(box);

		pager.append(pageDiv);
		
		pager.find(".page-select").val(pageSize);
		

		/**
		 *  上一页、下一页、页码点击事件绑定
		 */
		pager.delegate(".layui-laypage-prev,.layui-laypage-next,.ipage:not(.layui-laypage-curr)", "click", function(e) {

			if ($(this).hasClass("layui-disabled")) {

				return;
			}

			var dataPage = $(this).attr("data-page");
			
			
			var pageInput = $(".ag-form[ag-data-index=" + idx + "] > input[name=page]");
			
			var json  =  $.parseJSON(pageInput.val());
			
			json.pageNo = dataPage;
			
			pageInput.val(JSON.stringify(json));

			$(".ag-btn-query").trigger("click");

			/**
			 * 输入页码点击确定事件绑定
			 */
		}).delegate(".layui-laypage-skip .layui-laypage-btn", "click", function() {

			var input = $(this).parent().find("input");

			var min = input.attr("min");

			var max = input.attr("max");

			if (isNaN(input.val())) {

				util.showDialog("请输入数字！", 0);

				return;
			}


			if (parseInt(input.val()) < min) {

				util.showDialog("最小页码：1，请重新输入！", 0);

				return;
			}

			if (parseInt(input.val()) > max) {

				util.showDialog("最大页码：" + max + "，请重新输入！", 0);

				return;
			}
			
			var pageInput = $(".ag-form[ag-data-index=" + idx + "] > input[name=page]");
			
			var json  =  $.parseJSON(pageInput.val());
			
			json.pageNo = input.val();
			
			pageInput.val(JSON.stringify(json));

			$(".ag-btn-query").trigger("click");

		}).delegate(".layui-laypage-limits select", "change", function() {
			
			var pageInput = $(".ag-form[ag-data-index=" + idx + "] > input[name=page]");
			
			var json  =  $.parseJSON(pageInput.val());
			
			json.pageSize =  $(this).val();
			
			pageInput.val(JSON.stringify(json));

		});



	}

	function buildPage(data, idx) {

		var pager = $(".ag-table[ag-data-index=" + idx + "] ").siblings(".ag-area-page");


		if (pager.length == 0) {

			return;
		}
		
		if (data == undefined) {

			data = {};

			data.pageNo = 1;

			data.totalPage = 1;

			data.totalRecord = 0;

		}
		pager.find(".ipage").remove();

		pager.find(".layui-laypage-count").html("共 " + data.totalRecord + " 条");


		pager.find(".layui-laypage-skip input").attr("max", data.totalPage);

		var prev = pager.find(".layui-laypage-prev");

		var next = pager.find(".layui-laypage-next");

		prev.removeClass("layui-disabled");

		next.removeClass("layui-disabled");

		prev.attr("data-page", parseInt(data.pageNo) <= 1 ? "1" : parseInt(data.pageNo) - 1);

		next.attr("data-page", parseInt(data.pageNo) >= parseInt(data.totalPage) ? data.totalPage : parseInt(data.pageNo) +
			1);

		var endNum = 0;

		var startNum = 0;

		if (parseInt(data.pageNo) <= 1) {

			endNum = parseInt(data.totalPage) >= 3 ? parseInt(data.pageNo) + 2 : parseInt(data.totalPage);

			startNum = 1;

			prev.addClass("layui-disabled");


		}

		if (parseInt(data.pageNo) >= parseInt(data.totalPage)) {

			endNum = parseInt(data.pageNo);

			startNum = parseInt(data.totalPage) < 3 ? 1 : parseInt(data.pageNo) - 2;

			next.addClass("layui-disabled");

		}

		if (parseInt(data.pageNo) > 1 && data.pageNo < data.totalPage) {

			startNum = parseInt(data.pageNo) - 1;

			endNum = parseInt(data.pageNo) + 1;



		}

		for (var i = startNum; i <= endNum; i++) {

			if (i == parseInt(data.pageNo)) {

				var currSpan = $('<span class="layui-laypage-curr ipage"><em class="layui-laypage-em"></em><em>' + data.pageNo +
					'</em></span>');

				next.before(currSpan);

			} else {

				var a = $('<a href="javascript:;" class="ipage" data-page="' + i + '">' + i + '</a>');

				next.before(a);
			}
		}



	}

	/**
	 *
	 * 修改初始化方法
	 *
	 ***/
	function updateInit() {

		var index = $(this).attr("ag-data-index");
		var tableId = $("table[ag-data-index=" + index + "]").attr("id");
		var checkStatus = table.checkStatus(tableId);
		var data = checkStatus.data; //获取选中行数据
		if (data.length == 0) {

			util.warning('请选择一条数据库记录!');
			return;
		}

		var pkCol = $(this).attr("ag-data-pk");
		if (util.isNull(pkCol)) {
			pkCol = "id";
		}

		var pkVal = data[0][pkCol];


		var index = $(this).attr("ag-data-index");
		var url = $(this).attr("ag-data-url");
		var winId = $(this).attr("ag-win-id");
		var winW = $(this).attr("ag-win-width");
		var winH = $(this).attr("ag-win-height");
		var title = $(this).attr("ag-win-title");

		var agCtx = util.getAgCtx(this);

		//url = apiConfig[agCtx + "_web"] + url;
		if (url.indexOf("?") == -1) {
			url = url + "?" + pkCol + "=" + pkVal;
		} else {
			url = url + "&" + pkCol + "=" + pkVal;
		}

		var opts = {
			"winId": winId
		}
		util.openWin(url, title, winW, winH, opts);

	};

	function cancel() {
		util.closeWin();
	};


	/**
	 *添加初始化方法
	 *
	 ***/
	function addInit() {

		var index = $(this).attr("ag-data-index");
		var url = $(this).attr("ag-data-url");
		var winId = $(this).attr("ag-win-id");
		var winW = $(this).attr("ag-win-width");
		var winH = $(this).attr("ag-win-height");
		var title = $(this).attr("ag-win-title");

		var opts = {
			"winId": winId
		}

		var agCtx = util.getAgCtx(this);

		//url = apiConfig[agCtx + "_web"] + url;

		util.openWin(url, title, winW, winH, opts);

	};

	/***
	 *保存方法-增加或者修改的保存方法
	 *
	 **/
	function save() {

		var index = $(this).attr("ag-data-index");
		var form = $(".ag-form[ag-data-index=" + index + "]");

		var checkRet = checkForm.validateForm(form);
		if (!checkRet) {
			return false;
		}

		var agCtx = util.getAgCtx(this);

		var url = ctx + "/" + agCtx + $(this).attr("ag-data-url");
		var param = getFormJson(form);
		
		var that = this;
		
		
		util.ajaxJson("保存中,请稍后....",url,param,function(data){
			
				var result = data.result;
				var desc = data.desc;
			
				if (result == 0) {
					util.success(desc);
			
					var queryBtn = parent.layui.$(".ag-btn-query");
					if (queryBtn.length > 0) {
						$(queryBtn).click();
						//util.closeWin();
					}
			
					var func = $(that).attr("ag-back-func");
			
					if (!util.isNull(func)) {
						
						if(func.indexOf(".") != -1){
							
							eval(func);
							
							return ;
						}
						
						window[func](data);
					}
			
			
				} else {
					util.error(desc);
				}
			
			
			
			
		});


	};

	function del() {

		var index = $(this).attr("ag-data-index");
		var tableId = $("table[ag-data-index=" + index + "]").attr("id");
		var checkStatus = table.checkStatus(tableId);
		var data = checkStatus.data; //获取选中行数据
		if (data.length == 0) {

			util.warning('请选择一条数据库记录!');
			return;
		}

		var pkCol = $(this).attr("ag-data-pk");
		if (util.isNull(pkCol)) {
			pkCol = "id";
		}

		var pkVal = data[0][pkCol];
		var opts = {
			"index": index
		};

		util.showDialog("您确定要删除选中记录么?", 3, doDel, opts);

	}

	function doDel(opts) {

		var index = opts.index;
		var tableId = $("table[ag-data-index=" + index + "]").attr("id");
		var checkStatus = table.checkStatus(tableId);
		var data = checkStatus.data; //获取选中行数据

		var btn = $(".ag-btn-del[ag-data-index=" + index + "]")
		var pkCol = $(btn).attr("ag-data-pk");
		if (util.isNull(pkCol)) {
			pkCol = "id";
		}

		var pkVal = data[0][pkCol];

		var param = {};
		param[pkCol] = pkVal;

		var url = ctx + "/" + util.getAgCtx(btn) + $(btn).attr("ag-data-url");


		util.ajaxJson("删除中,请稍后!", url, param, function(data) {

			var result = data.result;
			var desc = data.desc;

			if (result == 0) {
				util.success(desc);

				var queryBtn = layui.$(".ag-btn-query");
				if (queryBtn.length > 0) {
					$(queryBtn).click();
				}

				var func = $(this).attr("ag-back-func");

				if (!util.isNull(func)) {
					
					if(func.indexOf(".") != -1){
						
						eval(func);
						
						return ;
					}
					
					window[func](data);
				}
			} else {
				util.error(desc);
			}

		});
	}

	function createFile() {

		var formFile = new Object();
		
		formFile.config = {
			
			"ag-file-multiple": "true",
			"ag-file-delete": "true",
			"ag-file-add": "true",
			"ag-file-down": "true",
			"ag-file-max": 99,
			"ag-file-iframe-down-url":"/sys/settings/file/download",
			"ag-file-iframe-del-url" : "/sys/settings/file/delFile",
			"ag-file-iframe-add-url":"/sys/settings/file/upload",
			"ag-file-iframe-name":"downloadHidenFr",
			"ag-data-ctx":"sysmgr"
		}

		formFile.loadForm = function(obj) {

			this.form = $(obj);
			/**
			 * 当存在附件时生成附件dom 并 绑定附件相关事件
			 */
			this.loadFormFiles();
			/**
			 * 绑定事件
			 */
			this.bindLsnr();

		}



		formFile.bindLsnr = function() {

			var that = this;
			
			var width = that.form.width();
			
			that.form.find(".ag-file").width(parseInt(width /305) * 305 - 120 );
			
			window.onresize = function(){
				
					var width = that.form.width();
					
					var num = parseInt(width /305);
					
					that.form.find(".ag-file").width( num* 305 - 120 -(num == 1 ? 5 : 0));
					
			}

			that.form.delegate(".ag-file .ag-file-header .ag-file-header-button", "click", function() {
				$(this).siblings(".ag-file-header-file").trigger("click");

			});
			/**
			 *  附件添加事件
			 */
			that.form.delegate(".ag-file .ag-file-header .ag-file-header-file", "change", function(e) {

				var inputFile = $(this);

				var agFile = that.form.find(".ag-file").eq(0);

				var items = agFile.find(".ag-file-item-li");

				var maxNum = agFile.attr("ag-file-max");

				if (parseInt(maxNum) <= items.length) {

					util.showDialog("最大添加附件数量:" + maxNum + ",无法继续添加!", 0);

				} else {

					$.each(inputFile[0].files, function(i, file) {

						that.addIfile(file, inputFile.parent().parent());

					});

				}




				inputFile.after(inputFile.clone().val(""));


				inputFile.remove();


			});


			/*****预览事件****/
			that.form.delegate(".ag-file .ag-file-item-li-thumb .ag-file-item-li-thumb-icon", "click", function() {

			});


			$.each(that.form.find(".ag-file"), function(i, f) {

				f = $(f);

				if (f.attr("ag-file-down") == "true") {

					f.delegate(".ag-file-item-li-thumb-icon", "click", function() {


						$(this).parent().parent().parent().find(".ag-file-item-li-title").trigger("click");

					});


					/*****下载事件****/
					f.delegate(".ag-file-item-li .ag-file-item-li-title", "click", function() {


						var li = $(this).parents(".ag-file-item-li:first");



						var saveName = li.data("ag-file-name-savename");

						if (util.isNull(saveName)) {

							util.showDialog("未上传,不能下载！", 0);

							return;
						}

						var url = f.data("ag-file-iframe-down-url");

						url = ctx + "/" + util.getAgCtx(f) + url;

						_listHrefDownloadFile(url + "?saveName=" + saveName + "&fileId=" + saveName);

					});

				}

				if (f.attr("ag-file-delete") == "true") {

					/*****删除事件****/
					f.delegate(".ag-file-item-li .ag-file-delete .layui-icon.layui-icon-delete", "click", function() {

						var li = $(this).parents(".ag-file-item-li:first");

						var saveName = li.data("ag-file-name-savename");

						var fileThat = $(this);

						if (util.isNull(saveName)) {

							fileThat.parents(".ag-file-item-li:first").remove();

							return;
						}


						var url = f.data("ag-file-iframe-del-url");

						url = ctx + "/" + util.getAgCtx(f) + url;

						util.ajaxJson("删除中,请稍后...", url, {
							"fileId": saveName
						}, function(data) {

							if (data.result == "0") {

								fileThat.parents(".ag-file-item-li:first").remove();

								util.showDialog("删除成功!", 2);

								return;
							}

							util.showDialog("删除失败!", 0);


						});

					});

				}


			});


		}





		/**
		 * 当存在附件类名时，生成附件dom
		 */
		formFile.loadFormFiles = function() {

			var that = this;

			var fileDiv = that.form.find(".ag-file");

			if (fileDiv.length == 0) {

				return;
			}

			var defaultOpt = $.extend({},that.config);

			$.each(fileDiv, function(i, f) {

				f = $(f);

				for (var key in defaultOpt) {

					if (util.isNull(f.attr(key))) {

						f.attr(key, defaultOpt[key]);
					}
					
					f.data(key,f.attr(key));

				}

				/**
				 * 判断是否可新增附件
				 */
				if (f.attr("ag-file-add") == "true") {

					that.appendFileHeadeTpl(f);


				}


				var item = $("<ol class='ag-file-item'></ol>");

				f.append(item);

				/*********插入下载配置*********/
				if ($("[name="+f.data("ag-file-iframe-name")+"]").length == 0) {

					var iframe = $("<iframe name='"+f.data("ag-file-iframe-name")+"' class='layui-hide'></iframe>");

					f.append(iframe);
				}

			});

		}


		/**
		 * 追加添加附件区域
		 */
		formFile.appendFileHeadeTpl = function(f) {

			var headerDiv = $("<div class='ag-file-header'></div>");

			var headerTextDiv = $("<span class='ag-file-header_text'></span>");

			var headerIcon = $("<span class='ag-file-header_icon'></span>");

			var headerBtn = $("<button type='button' class='ag-file-header-button'> 添加附件.</button>");

			var multiple = f.attr("ag-file-multiple");

			var headerInput = $("<input class='ag-file-header-file' type='file' " + (multiple == "true" ? "multiple" : "") +
				" />");

			headerDiv.append(headerTextDiv);
			headerDiv.append(headerIcon);
			headerDiv.append(headerBtn);
			headerDiv.append(headerInput);


			f.append(headerDiv);
		}
		/**
		 * 上传事件
		 */

		formFile.uploadFile = function(file, layFilter) {


			var that = this;

			var form = new FormData();

			form.append("file", file);

			var moduleName = that.form.find(".ag-file").eq(0).attr("ag-file-module");

			form.append('moduleName', moduleName);

			var url = that.form.find(".ag-file").eq(0).data("ag-file-iframe-add-url");

			url = ctx + "/" + util.getAgCtx(null) + url;

			util.ajaxFile("上传中,请稍后...", url, form, function(data) {


				if (data.result != 0) {

					error(layFilter, data.desc.length > 50 ? "上传失败!":data.desc);

					return;
				}

				succ(layFilter, data);

			}, function(data) {


				var msg = "上传失败...";

				try {

					var json = $.parseJSON(data.responseText);

					if (json.message && json.message.indexOf("Maximum") != -1) {

						msg = "附件大小超出服务器限制";
					}
				} catch (e) {

				}
				

				error(layFilter, msg);

			}, function(myXhr) {

				if (myXhr.upload) {

					myXhr.upload.addEventListener('progress', function(e) {

						var progressRate = parseInt(e.loaded * 100 / e.total) + '%';


						layui.element.progress(layFilter, progressRate == "100%" ? "99%" : progressRate);

					}, false);

				}
				return myXhr;
			});

			function succ(layFilter, data) {

				layui.element.progress(layFilter, "100%");
				$("[lay-filter=" + layFilter + "]", that.form).parents(".ag-file-item-li:first").data("ag-file-name-savename",
					data.desc);
				$("[lay-filter=" + layFilter + "]", that.form).children().width("100%").text(
					'上传成功!').css({
					"text-align": "center",
					"color": "white"
				});
			}

			function error(layFilter, msg) {

				$("[lay-filter=" + layFilter + "]", that.form).children().removeClass("layui-bg-green").addClass("layui-bg-red")
					.width("100%").text(
						msg).css("text-align", "center");
				$("[lay-filter=" + layFilter + "]", that.form).parents(".ag-file-item-li:first").data("ag-file-name-savename",
					"");

			}

		}


		/**
		 *  插入附件 obj 可能是file对象 也可能是查询返回的bean
		 * @param {Object} obj
		 */
		formFile.addIfile = function(obj, f) {

			var that = this;

			var data = {};

			if (obj.__proto__.constructor && obj.__proto__.constructor.name == "File") {
				
				data.fileType = file_types[obj.type] ? file_types[obj.type] : "default";

				data.fileName = obj.name;

				data.fileSize = Math.ceil(obj.size / 1000);

				data.file = obj;

				data.opTime = util.getTime();

			} else {

				$.extend(true, data, obj);

				data.fileType = file_types[obj.fileType] ? file_types[obj.fileType] : "default";

				data.fileSize = Math.ceil(data.fileSize / 1000);
			}

			/**
			 * 根据数据追加附件模板 返回进度条唯一标识
			 */
			var layFilter = that.appendFileItemTpl(data, f);

			/**
			 * 如果是附件上传操作则向后台发送请求传输对象
			 */
			if (data.file) {

				$("[lay-filter=" + layFilter + "]", that.form).removeClass("layui-hide");

				$("[lay-filter=" + layFilter + "]", that.form).children().removeClass("layui-bg-red").removeClass(
					"layui-bg-green");

				that.uploadFile(obj, layFilter);

			}

		}

		/**
		 *  追加附件模板到指定区域
		 * @param {Object} data
		 */
		formFile.appendFileItemTpl = function(data, f) {

			var that = this;

			var li = $("<li  class='ag-file-item-li'></li>");

			li.data("ag-file-name-filename", data.fileName);
			li.data("ag-file-name-savename", data.saveName);
			li.data("ag-file-name-optime", data.opTime);
			li.data("ag-file-name-filesize", data.fileSize);

			var thumb = $("<div class='ag-file-item-li-thumb'></div>");

			var a = $("<a href='#' title='点击下载：" + data.fileName + "'><span class='ag-file-item-li-thumb-icon ag-form-type-" +
				data.fileType + "'></span></a>");

			var random = util.randomWord(false, 32);

			var progress = $('<div class="layui-progress layui-hide  layui-progress-big	" lay-filter="' + random +
				'" lay-showPercent="true">  <div class="layui-progress-bar text-white" lay-percent="0%"><span class="layui-progress-text">0%</span></div></div>'
			);

			var dl = $("<dl></dl>");

			var dt = $("<dt></dt>");

			var span = $("<span class='ag-file-blender'></span>");

			var deleteDiv = $(
				"<div class='ag-file-delete' ><a title='删除此附件' href='#' ><span class=' layui-icon layui-icon-delete'></span></a></div>"
			);

			var downA = $("<a href='#' class='ag-file-item-li-title' title='点击下载：" + data.fileName + "' >" + data.fileName +
				"</a>");

			var sizeDd = $("<dd class='ag-file-item-li-size' >" + data.fileSize + "kb</dd>");

			var timeDd = $("<dd class='ag-file-item-li-date'><time >" + util.timeDiff(data.opTime) + "</time></dd>");

			dt.append(span);


			if (f.attr("ag-file-delete") == "true") {

				dt.append(deleteDiv);
			}

			dt.append(downA);

			dl.append(dt);
			dl.append(sizeDd);
			dl.append(timeDd);

			thumb.append(a);

			thumb.append(progress);

			li.append(thumb);

			li.append(dl);

			that.form.find(".ag-file-item").append(li);

			return random;


		}


		return formFile;
	}



	/**
	 * 初始化表单数据-修改表单
	 *
	 */
	function initForm() {


		var param = util.getUrlParam();

		$(".ag-form").each(function(idx, agForm) {

			var formFile = createFile();

			formFile.loadForm(agForm);

			var condiCnt = 0;
			var dataUrl = $(agForm).attr("ag-data-url");
			
			$.each($(agForm).find("[ag-select-func]"),function(i,item){
				
				form.on("select("+$(item).attr("lay-filter")+")",function(data){
					
					window[$(item).attr("ag-select-func")].call(item,data);
				});
				
			});

			if (!util.isNull(dataUrl)) {

				for (var name in param) {

					var val = param[name];

					if (!util.isNull(val)) {
						$(agForm).find("input[name=" + name + "],select[name=" + name + "]").val(val);
						condiCnt++;
					}
				}

				var formParam = getFormJson($(agForm));
				//加载数据并补充初始化表单
				var url = ctx + "/" + util.getAgCtx($(agForm)) + dataUrl;
				
				util.ajaxJson("",url,formParam,function(data){
					
						/**
						 * 复选框
						 *
						 */
						var chkBoxDivArr = $(agForm).find(".ag-chkbox");
						if (chkBoxDivArr.length > 0) {
							var chkStr = "";
							$(chkBoxDivArr).each(function(idx, chkboxDiv) {
					
								var key = $(chkboxDiv).attr("ag-chkbox-name");
								var dataArr = data[key + "ChkBox"];
								$(dataArr).each(function(idxData, chkData) {
									var checked = 'checked=""';
									if (util.isNull(chkData.selected)) {
										checked = '';
									}
									var record = '<input type="checkbox" customVal="' + chkData.optCode + '" value="' + chkData.optCode +
										'" name="' + key + '" lay-skin="primary" title="' + chkData.optName + '" ' + checked + '>'
									chkStr = chkStr + record;
								});
					
								$(chkboxDiv).html(chkStr);
								form.render('checkbox');
					
					
							});
					
					
					
						}
						
						
						/**
						 * 附件
						 */
						if (formFile.form.find(".ag-file").length > 0) {
						
							var key = formFile.form.find(".ag-file").eq(0).attr("ag-file-key");
						
							if (!util.isNull(data[key]) && data[key].length > 0) {
						
								$.each(data[key], function(ind, file) {
						
									formFile.addIfile(file, formFile.form.find(".ag-file").eq(0));
								});
							}
						
						
						}
					
					
						for (var name in data) {
					
							var val = data[name];
							if (!util.isNull(val)) {
								$(agForm).find("input[name=" + name + "],textarea[name="+name+"]").val(val);
							}
					
							if (name.endsWith("Opt")) {
					
								var optArr = data[name];
								var selectStr = "";
					
								var selObj = $("select[name=" + name.substr(0, name.length - 3) + "]");
					
								if (selObj.attr("ag-select-default-val") == "true") {
					
									selectStr += "<option value=''>-请选择-</option>"
								}
					
								for (var i = 0; i < optArr.length; i++) {
									var selectedStr = optArr[i].selected;
									if (util.isNull(selectedStr)) {
										selectedStr = "";
									}
					
									var optBean = "<option value='" + optArr[i].optCode + "' " + selectedStr + ">" + optArr[i].optName +
										"</option>";
									selectStr = selectStr + optBean;
								}
					
					
					
					
								$(selObj).html(selectStr);
								form.render('select');
							}
					
						}
					
						//自定义插件入口
						var pluginName = $(agForm).attr("ag-plugin-name");
					
						if (!util.isNull(pluginName)) {
							//init参数根据需要在扩展
							customPlugins[pluginName].init(data);
						}
					
					
					
					
				}) ;
				
				
				
				
				};




		});


		renderForm();


	}

	//渲染表单-date
	function renderForm() {
		var agDateArr = $(".ag-date");
		$(agDateArr).each(function(idx, input) {
			
			
			var opt = {
				elem: input,
				type: $(input).attr("ag-date-format")
			}
			
			
			
			console.log(opt);
			
			laydate.render(opt);
		});
			
	}
	
	function initFormHeight(){
		
		//目前没有唯一标识判断 先根据查询按钮判断是不是查询页面
		//如果是查询页面则返回.
		if($(".ag-btn-query").length > 0 ){
			
			return;
		}
		
		$(".ag-form").css("height","calc( 100vh - 140px)");
		
		$(".ag-form").css("overflow-y","auto");
		
		
	}
	



	function initListHeight() {

		var agTable = $(".ag-table");

		if (agTable.length == 0) {

			return;
		}

		var sibHeight = -15;

		//获取容器父级--父级所有兄弟节点
		var $query = agTable.parent().siblings(":visible").not("script").not("iframe");

		for (var i = 0; i < $query.length; i++) {

			if (!$($query[i]).attr("class") || $($query[i]).attr("class").indexOf("layui-layer") != -1) {

				continue;
			}

			sibHeight += ($($query[i]).outerHeight() + util.getMarginHeight($query[i]));

		}

		sibHeight += util.getRealityOrderHeight(agTable.parent());


		agTable.parent().attr("style", "");

		agTable.parent().css('height', 'calc( 100vh - ' + sibHeight + 'px)');

		//获取容器兄弟节点高度
		$.each(agTable.siblings(":visible").not("script").not("iframe").not(".layui-form.layui-border-box.layui-table-view"),
			function(i, t) {

				sibHeight += ($(t).outerHeight() + util.getMarginHeight($(t)));
			});

		agTable.css('height', 'calc( 100vh - ' + sibHeight + 'px)');
	}





	$(document).ready(function() {

		initBtnLsnr();

		initForm();

		initListHeight();
		
		initFormHeight();

	});


});

	/**
	 * 列表链接，下载文件
	 *
	 * @param {Object} url
	 */
function _listHrefDownloadFile(url) {

		util.showDialog("确定下载文件么?", 3, "ret=_doRealDownLoad('" + url + "')");


}

function _doRealDownLoad(url) {

	var action = url;
	var form = $("<form></form>").attr("action", action).attr("method", "post");
	form[0].target = "downloadHidenFr";
	form.appendTo('body').submit().remove();

}


function _listHrefWindow(url, title,width,height) {
	
	width =  width || 1000;
	
	height = height ||1000;
	
	util.openWin(util.decode(url), title, width, height);
}


function _listHrefTab(url, title) {


	util.addTab(url, title);

}
