/**
 * 每周期
 */
function everyTime(dom) {
	var item = $("input[name=v_" + dom.name + "]");
	item.val("*");
	item.change();
}

/**
 * 不指定
 */
function unAppoint(dom) {
	var name = dom.name;
	var val = "?";
	if (name == "year")
		val = "";
	var item = $("input[name=v_" + name + "]");
	item.val(val);
	item.change();
}

function appoint(dom) {

}

/**
 * 周期
 */
function cycle(dom) {
	var name = dom.name;
	var ns = $(dom).parent().parent().find(".numberspinner");
	var start = ns.eq(0).val();
	var end = ns.eq(1).val();
	var item = $("input[name=v_" + name + "]");
	item.val(start + "-" + end);
	item.change();
}

/**
 * 从开始
 */
function startOn(dom) {
	var name = dom.name;
	var ns = $(dom).parent().parent().find(".numberspinner");
	var start = ns.eq(0).val();
	var end = ns.eq(1).val();
	var item = $("input[name=v_" + name + "]");
	item.val(start + "/" + end);
	item.change();
}

function lastDay(dom){
	var item = $("input[name=v_" + dom.name + "]");
	item.val("L");
	item.change();
}

function weekOfDay(dom){
	var name = dom.name;
	var ns = $(dom).parent().parent().find(".numberspinner");
	var start = ns.eq(0).val();
	var end = ns.eq(1).val();
	var item = $("input[name=v_" + name + "]");
	item.val(start + "#" + end);
	item.change();
}

function lastWeek(dom){
	var item = $("input[name=v_" + dom.name + "]");
	var ns = $(dom).parent().parent().find(".numberspinner");
	var start = ns.eq(0).val();
	item.val(start+"L");
	item.change();
}

function workDay(dom) {
	var name = dom.name;
	var ns = $(dom).parent().parent().find(".numberspinner");
	var start = ns.eq(0).val();
	var item = $("input[name=v_" + name + "]");
	item.val(start + "W");
	item.change();
}


function checkCron(){
	
	var vals = $("input[name^='v_']");
	var cron = $("#cron");
	
	vals.change(function() {
		var item = [];
		vals.each(function() {
			item.push(this.value);
		});
	    //修复表达式错误BUG，如果后一项不为* 那么前一项肯定不为为*，要不然就成了每秒执行了
	    //获取当前选中tab
		var currentIndex = 0;
		$(".layui-tab-title>li").each(function (i, item) {
		    if($(item).hasClass("layui-this")){
		        currentIndex =i;
		        return false;
		    }

		});
        //当前选中项之前的如果为*，则都设置成0
		for (var i = currentIndex; i >= 1; i--) {
		    if (item[i] != "*" && item[i - 1] == "*") {
		        item[i - 1] = "0";
		    }
		}
	    //当前选中项之后的如果不为*则都设置成*
		if (item[currentIndex] == "*") {
		    for (var i = currentIndex + 1; i < item.length; i++) {
		        if (i == 5) {
		            item[i] = "?";
		        } else {
		            item[i] = "*";
		        }
		    }
		}
		cron.val(item.join(" ")).change();
	});

	cron.change(function () {
	    btnFan();

	});
	
	
}


function secondChange(){
	
	var secondList = $(".secondList").find("input[type='checkbox']");
	$("#sencond_appoint").click(function(){
	   
		if (this.checked) {
	        if ($(secondList).filter(":checked").length == 0) {
	            $(secondList.eq(0)).attr("checked", true);
	        }
			secondList.eq(0).change();
		}
	});

	secondList.change(function() {
		var sencond_appoint = $("#sencond_appoint").prop("checked");
		if (sencond_appoint) {
			var vals = [];
			secondList.each(function() {
				if (this.checked) {
					vals.push(replace0(this.value));
				}
			});
			var val = "?";
			if (vals.length > 0 && vals.length < 59) {
				val = vals.join(","); 
			}else if(vals.length == 59){
				val = "*";
			}
			var item = $("input[name=v_second]");
			item.val(val);
			item.change();
		}
	});
	
}


function minChange(){
	
	var minList = $(".minList").find("input[type='checkbox']");
	$("#min_appoint").click(function(){
	    if (this.checked) {
	        if ($(minList).filter(":checked").length == 0) {
	            $(minList.eq(0)).attr("checked", true);
	        }
			minList.eq(0).change();
		}
	});
	
	minList.change(function() {
		var min_appoint = $("#min_appoint").prop("checked");
		if (min_appoint) {
			var vals = [];
			minList.each(function() {
				if (this.checked) {
					vals.push(replace0(this.value));
				}
			});
			var val = "?";
			if (vals.length > 0 && vals.length < 59) {
				val = vals.join(",");
			}else if(vals.length == 59){
				val = "*";
			}
			var item = $("input[name=v_min]");
			item.val(val);
			item.change();
		}
	});
	
}

function hourChange(){
	
	var hourList = $(".hourList").find("input[type='checkbox']");
	$("#hour_appoint").click(function(){
	    if (this.checked) {
	        if ($(hourList).filter(":checked").length == 0) {
	            $(hourList.eq(0)).attr("checked", true);
	        }
			hourList.eq(0).change();
		}
	});
	
	hourList.change(function() {
		var hour_appoint = $("#hour_appoint").prop("checked");
		if (hour_appoint) {
			var vals = [];
			hourList.each(function() {
				if (this.checked) {
					vals.push(replace0(this.value));
				}
			});
			var val = "?";
			if (vals.length > 0 && vals.length < 24) {
				val = vals.join(",");
			}else if(vals.length == 24){
				val = "*";
			}
			var item = $("input[name=v_hour]");
			item.val(val);
			item.change();
		}
	});
	
	
}

function dayChange(){
	
	var dayList = $(".dayList").find("input[type='checkbox']");
	$("#day_appoint").click(function(){
	    if (this.checked) {
	        if ($(dayList).filter(":checked").length == 0) {
	            $(dayList.eq(0)).attr("checked", true);
	        }
			dayList.eq(0).change();
		}
	});
	
	dayList.change(function() {
		var day_appoint = $("#day_appoint").prop("checked");
		if (day_appoint) {
			var vals = [];
			dayList.each(function() {
				if (this.checked) {
					vals.push(this.value);
				}
			});
			var val = "?";
			if (vals.length > 0 && vals.length < 31) {
				val = vals.join(",");
			}else if(vals.length == 31){
				val = "*";
			}
			var item = $("input[name=v_day]");
			item.val(val);
			item.change();
		}
	});
	
	
}

function monthChange(){
	
	var mouthList = $(".mouthList").find("input[type='checkbox']");
	$("#mouth_appoint").click(function(){
	    if (this.checked) {
	        if ($(mouthList).filter(":checked").length == 0) {
	            $(mouthList.eq(0)).attr("checked", true);
	        }
			mouthList.eq(0).change();
		}
	});
	
	mouthList.change(function() {
		var mouth_appoint = $("#mouth_appoint").prop("checked");
		if (mouth_appoint) {
			var vals = [];
			mouthList.each(function() {
				if (this.checked) {
					vals.push(this.value);
				}
			});
			var val = "?";
			if (vals.length > 0 && vals.length < 12) {
				val = vals.join(",");
			}else if(vals.length == 12){
				val = "*";
			}
			var item = $("input[name=v_mouth]");
			item.val(val);
			item.change();
		}
	});
}

function weekChange(){
	
	var weekList = $(".weekList").find("input[type='checkbox']");
	$("#week_appoint").click(function(){
	    if (this.checked) {
	        if ($(weekList).filter(":checked").length == 0) {
	            $(weekList.eq(0)).attr("checked", true);
	        }
			weekList.eq(0).change();
		}
	});
	
	weekList.change(function() {
		var week_appoint = $("#week_appoint").prop("checked");
		if (week_appoint) {
			var vals = [];
			weekList.each(function() {
				if (this.checked) {
					vals.push(this.value);
				}
			});
			var val = "?";
			if (vals.length > 0 && vals.length < 7) {
				val = vals.join(",");
			}else if(vals.length == 7){
				val = "*";
			}
			var item = $("input[name=v_week]");
			item.val(val);
			item.change();
		}
	});

}
function init(){
    
	
	/**
	 * 初始化 checkbox数据
	 */
	initCheckBox($(".secondList"),0, 60,"00");
	
	initCheckBox($(".minList"), 0,60,"00");
	
	initCheckBox($(".hourAM"),0, 12,"00");
	
	initCheckBox($(".hourPM"),12, 24);
	
	initCheckBox($(".dayList"),1, 32);
	
	initCheckBox($(".mouthList"),1, 13);
	
	initCheckBox($(".weekList"),1, 8);
	
	
	
	/**
	 * 绑定事件
	 */
	checkCron();

	secondChange();
	
	minChange();
	
	hourChange();
	
	dayChange();
	
	monthChange();
	
	weekChange();
	
	
	
	
	
	
}

function initCheckBox(obj,min,max,type){
	
	
	for(var i = min ;i<max ;i++){
	
			var index = i;
		
			if(!util.isNull(type)){
				
				index= i<10? "0"+i : i;
			}
		
		$(obj).append("<div class='layui-inline'>"+"<input type='checkbox' value='"+index+"'/>"+index+"</div>");
	}
}

function autoClick(){

	$(this).parent().parent().parent().find("input[type='radio']").eq(0).click();
	
}

function replace0(str){
	
	if(util.isNull(str)){
		
		return "";
	}
	
	if(str.length == 2 && str.substring(0,1) == "0"){
		
		str = str.substring(1);
	}
	
	return str;
}

function btnFan() {
    //获取参数中表达式的值
    var txt = $("#cron").val();
    if (txt) {
        var regs = txt.split(' ');
        
        for( var i = 0 ; i< regs.length ; i++){
        	
        	if(regs[i].length == 2 && regs[i].substring(0,1) == "0"){
        		
        		regs[i] = replace0(regs[i]);
        	}
        }
        
        $("input[name=v_second]").val(regs[0]);
        $("input[name=v_min]").val(regs[1]);
        $("input[name=v_hour]").val(regs[2]);
        $("input[name=v_day]").val(regs[3]);
        $("input[name=v_mouth]").val(regs[4]);
        $("input[name=v_week]").val(regs[5]);

//        var str = "";
//
//        if (regs.length > 6) {
//            $("input[name=v_year]").val(regs[6]);
//            str += initYear(regs[6]);
//        }
//        
//        str += initMonth(regs[4]);
//        
//        str += initWeek(regs[5]);
//
//        str += initDay(regs[3]);
//        
//        str += initObj(regs[2], "hour");
//        
//        str += initObj(regs[1], "min");
//
//        str += initObj(regs[0], "second");
//        
//        str= str.replace(/hour/g, "小时");
//        
//        str= str.replace(/min/g, "分钟");
//        
//        str= str.replace(/second/g, "秒");
//        
//        $("#cronCh").text(str);
    }
}


function initObj(strVal, strid) {
	var str ="";
    var ary = null;
    var objRadio = $("input[name='" + strid + "'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(1).attr("checked", "checked");
        $("#" + strid + "Start_0").val(ary[0]);
        $("#" + strid + "End_0").val(ary[1]);
        
        str = "周期性("+strid+")：从"+ary[0]+strid+"到"+ary[1]+strid+"执行,";
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(2).attr("checked", "checked");
        $("#" + strid + "Start_1").val( ary[0]);
        $("#" + strid + "End_1").val( ary[1]);
        
        str = "周期性("+strid+")：从"+ary[0]+strid+"开始，每"+ary[1]+strid+"执行一次,";
        
    } else {
        objRadio.eq(3).attr("checked", "checked");
        
        if (strVal != "?") {
            ary = strVal.split(",");
            for (var i = 0; i < ary.length; i++) {
                $("." + strid + "List input[value='" + ary[i] + "']").attr("checked", "checked");
            }
            
            str = "指定：("+strVal+")"+strid+'执行,';
        }
        
    }
    return str;
}

function initDay(strVal) {
	
	var str ="";
	
    var ary = null;
    var objRadio = $("input[name='day'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
        
    } else if (strVal == "?") {
        objRadio.eq(1).attr("checked", "checked");
        
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(2).attr("checked", "checked");
        $("#dayStart_0").val( ary[0]);
        $("#dayEnd_0").val( ary[1]);
        
        str="周期性（日）：从"+ary[0]+"号到"+ary[1]+"号，";
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(3).attr("checked", "checked");
        $("#dayStart_1").val( ary[0]);
        $("#dayEnd_1").val( ary[1]);
        str="周期性（日）：从"+ary[0]+"号开始，每"+ary[1]+"天执行一次，";
    } else if (strVal.split('W').length > 1) {
    	
        ary = strVal.split('W');
        objRadio.eq(4).attr("checked", "checked");
        $("#dayStart_2").val(ary[0]);
        
        str="每月"+ary[0]+"号最近的那个工作日,";
    } else if (strVal == "L") {
        objRadio.eq(5).attr("checked", "checked");
        
        str="本月最后一天，";
    } else {
        objRadio.eq(6).attr("checked", "checked");
        ary = strVal.split(",");
        for (var i = 0; i < ary.length; i++) {
            $(".dayList input[value='" + ary[i] + "']").attr("checked", "checked");
        }
        str ="指定：（"+strVal+"）天执行,";
    }
    return str;
}

function initMonth(strVal) {
	var str ="";
    var ary = null;
    var objRadio = $("input[name='mouth'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
        
    } else if (strVal == "?") {
        objRadio.eq(1).attr("checked", "checked");
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(2).attr("checked", "checked");
        $("#mouthStart_0").val( ary[0]);
        $("#mouthEnd_0").val( ary[1]);
        
        str ="周期性（月）:从"+ ary[0]+"月到"+ ary[1]+"月,";
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(3).attr("checked", "checked");
        $("#mouthStart_1").val(ary[0]);
        $("#mouthEnd_1").val( ary[1]);
        
        str ="周期性（月）：从"+ary[0]+"月开始，每"+ary[1]+"月执行一次，";

    } else {
        objRadio.eq(4).attr("checked", "checked");

        ary = strVal.split(",");
        for (var i = 0; i < ary.length; i++) {
            $(".mouthList input[value='" + ary[i] + "']").attr("checked", "checked");
        }
        
        str ="指定：（"+strVal+"）月执行，";
    }
    return str;
}

function initWeek(strVal) {
    var ary = null;
    var str ="";
    var objRadio = $("input[name='week'");
    if (strVal == "*") {
        objRadio.eq(0).attr("checked", "checked");
    } else if (strVal == "?") {
        objRadio.eq(1).attr("checked", "checked");
    } else if (strVal.split('/').length > 1) {
        ary = strVal.split('/');
        objRadio.eq(2).attr("checked", "checked");
        $("#weekStart_0").val( ary[0]);
        $("#weekEnd_0").val( ary[1]);
        
        str ="周期性（周）：从星期"+ary[0]+"到"+ary[1]+",";
    } else if (strVal.split('#').length > 1) {
        ary = strVal.split('#');
        objRadio.eq(3).attr("checked", "checked");
        $("#weekStart_1").val(ary[0]);
        $("#weekEnd_1").val( ary[1]);
        str ="周期性（周）：第"+ary[0]+"周的星期"+ary[1]+",";
        
    } else if (strVal.split('L').length > 1) {
        ary = strVal.split('L');
        objRadio.eq(4).attr("checked", "checked");
        $("#weekStart_2").val( ary[0]);
        
        str = "本月最后一个星期"+ary[0]+",";
        
    } else {
        objRadio.eq(5).attr("checked", "checked");
        ary = strVal.split(",");
        for (var i = 0; i < ary.length; i++) {
            $(".weekList input[value='" + ary[i] + "']").attr("checked", "checked");
        
        }
        str ="指定：星期（"+ary+"）执行,";
    }
    
    return str;
}

function initYear(strVal) {
	var str ="";
    var ary = null;
    var objRadio = $("input[name='year'");
    
    if (strVal == "*") {
        objRadio.eq(1).attr("checked", "checked");
        
        str ="每年";
    } else if (strVal.split('-').length > 1) {
        ary = strVal.split('-');
        objRadio.eq(2).attr("checked", "checked");
        $("#yearStart_0").val( ary[0]);
        $("#yearEnd_0").val(ary[1]);
        
        str=ary[0]+"年至"+ary[1]+"年，";
    }else{
    	
    	str =strVal+"年";
    }
    return str;
}



$(function() {

	// 初始化
	alignmentFns.initialize();
	
		init();
	});