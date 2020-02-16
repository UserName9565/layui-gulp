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
	isNull : function(val) {

		if (val == null || val == undefined || val == "" || val == "undefined"
				|| val == "null") {
			return true;
		} else {
			return false;
		}
	},
	
	//弹出加载层
	load: function(msg) {
		$("<div class=\"datagrid-mask\"></div>").css({
			display : "block",
			width : "100%",
			height : $(window).height()
		}).appendTo("body");
		$("<div class=\"datagrid-mask-msg\"></div>").html(msg)
				.appendTo("body").css({
					display : "block",
					left : ($(document.body).outerWidth(true) - 190) / 2,
					top : ($(window).height() - 45) / 2
				});
	},
	
	
	//取消加载层  
	disLoad: function() {
		$(".datagrid-mask").remove();
		$(".datagrid-mask-msg").remove();
	},
	
	//告警提示
	warning:function(msg){
		jQuery.messager.alert('提示:', msg, 'warning');
	},
	//操作成功提示
	success:function(msg){
		jQuery.messager.alert('提示:', msg, 'info');
	},
	
	//操作失败提示
	error:function(msg){
		jQuery.messager.alert('提示:', msg, 'error');
	}
	
}