/**
 * @author jiangyong
 *
 * @date 2020年3月23日10:57:53
 *
 * layui-调度计划插件
 * 
 *
 * 1。两个输入参数，第一个参数定义该插件的依赖插件;第二个参数是回调函数，编写我们自定义插件的业务逻辑
 * 2.返回插件，调用exports函数，两个参数分别是 插件名称和插件对象
 *
 */
layui.define(['jquery', 'form', 'laydate'], function(exports) {


	"use strict";

	var $ = layui.jquery,
		form = layui.form;

	var laydate = layui.laydate;


	var schedu = function() {

		this.scheduType = {
			"0": {
				"desc": "按分执行",
				"type": "time",
				"format": "mm"
			},
			"1": {
				"desc": "按秒执行",
				"type": "time",
				"format": "ss"
			},
			"2": {
				"desc": "按天执行",
				"type": "time",
				"format":"HH:mm:ss"
			},
			"3": {
				"desc": "特定时间执行",
				"type": "datetime"
			},
			"4": {
				"desc": "自定义执行"
			}
		}
		this.selects = null
	};


	//组件初始化方法
	schedu.prototype.init = function() {

		this.selects = $(".ag-schedu");

		this.initSelect();

		this.buildEvent();

		form.render("select");

	}

	/**
	 * 初始化下拉框
	 */
	schedu.prototype.initSelect = function() {

		var that = this;

		$.each(that.selects, function(i, item) {

			$(item).empty();

			$(item).siblings().remove();

			$(item).append("<option value =''>--请选择--</option>");

			for (var key in that.scheduType) {

				$(item).append("<option value='" + key + "'>" + that.scheduType[key].desc + "</option>");
			}


			$(item).attr("lay-filter", "a"+util.randomWord(false, 16));

			$(item).after("<div style='position:absolute;top:0;z-index:-1'><div  style='position: relative;' id=" + $(item).attr("lay-filter") + "_date" + "></div></div>");
			
			$(item).after("<div style='position:absolute;top:0;z-index:-1'><div  style='position: relative;' id=" + $(item).attr("lay-filter") + "_date2" + "></div></div>");
			
		});
	}
	
	/**
	 * 特定时间事件
	 * @param {Object} data
	 * @param {Object} scheduObj
	 */
	schedu.prototype.clickDateTime = function(data){
			
			var that = this;
			
			var id = "#" + $(data.elem).attr("lay-filter") + "_date2";
			
			var opt = {
				elem: id,
				type: that.currScheduType.type,
				position:"fixed",
				trigger: 'click'
				,done: function(value, data, endDate) {
					
					var exeExpr = data.seconds+" "+data.minutes+" "+data.hours+" "+data.date+" "+data.month+" ? "+data.year;
					
					$("[name=scheduCron]").val(exeExpr);
					
				}
			}
			
			laydate.render(opt);
			
			$(id).click();
		
		
	}
	
	
	/**
	 *  自定义事件
	 * @param {Object} data
	 */
	schedu.prototype.customTime = function(data){
		
		util.openWin("/views/schedu/customSchedu.html", "自定义表达式配置", 1000, 1000);
	}
	
	
	/**
	 * 天,分,秒 事件
	 * @param {Object} data
	 * @param {Object} scheduObj
	 */
	schedu.prototype.clickTime = function(data){
			
			var that = this;
			
			var id = "#" + $(data.elem).attr("lay-filter") + "_date";
			
			var opt = {
				elem: id,
				type: that.currScheduType.type,
				position:"fixed",
				trigger: 'click'
				,done: function(value, data, endDate) {
					
					var  exeExpr = "";
					
					
					if (that.currScheduType.format == "ss") {
						
						exeExpr  ="0/" + data.seconds + " * * * * ?";
					}
					
					 if (that.currScheduType.format == "mm") {
					 	
						exeExpr = " 0 0/" + data.minutes + " * * * ?";
					 }
					
					if (that.currScheduType.format == "HH:mm:ss") {
						
						exeExpr = data.seconds+" "+data.minutes+" "+data.hours+" * * ? *";
					}
					
					$("[name=scheduCron]").val(exeExpr);
					
				}
			}
			
			laydate.render(opt);
		
			$(id).click();
			
			/**
			 * 展示处理
			 */
			if (that.currScheduType.format) {
				
				var li = $("#layui-laydate"+$(id).attr("lay-key") +" .layui-laydate-content .layui-laydate-list.laydate-time-list>li");
				
				if("mm" == that.currScheduType.format){
					
					li.eq(0).addClass("layui-hide");
					
					li.eq(2).addClass("layui-hide");
					
				}
				
				if("ss" == that.currScheduType.format){
					
					li.eq(0).addClass("layui-hide");
					
					li.eq(1).addClass("layui-hide");
				}
				
				if("HH:mm:ss" == that.currScheduType.format){
					
					//li.eq(2).addClass("layui-hide");
				}
				
				
					
			}
		
	}
	
	/**
	 * 绑定监听事件
	 */
	schedu.prototype.buildEvent = function() {

		var that = this;


		$.each(that.selects, function() {

			form.on("select(" + $(this).attr("lay-filter") + ")", function(data) {

				var scheduObj = that.scheduType[data.value];
				
				that.currScheduType = scheduObj;
				
				if (scheduObj.type  && scheduObj.type != "datetime") {
					
					return that.clickTime(data)
					
				}
				
				
				
				if (scheduObj.type  && scheduObj.type == "datetime") {
					
					return that.clickDateTime(data);
					
				}
				
				
				return that.customTime(data);

			});

		});

	
	}

	var schedu = new schedu();
	
	exports("schedu", schedu);
});
