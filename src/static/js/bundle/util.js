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
    util.showDialog(1,msg);
	},
	//操作成功提示
	success:function(msg){
		util.showDialog(2,msg);
	},

	//操作失败提示
	error:function(msg){
		util.showDialog(3,msg);
	},

  //打开窗口
  openWin : function (url, title, w, h,opts){

  		var closeBtnOpt = 1;

  		if(opts  != undefined && opts.closeBtn != undefined){
  			closeBtnOpt = opts.closeBtn;
  		}

  		var winW = $(document).width();
  		var winH  = $(window).height();
  		if(winW < w){
  			w = winW - 60;
  		}

  		if(winH < h){
  			h = winH - 70;
  		}

  		if(h>700){
  			h=700;
  		}

  		var offSetX = (winW - w)/2;
  		var offSetY = (winH - h) /2;

  		if (title == null || title == '') {
  			title=false;
  		};
  		if (url == null || url == '') {
  			url="404.html";
  		};

  		//w = 300;
  		//h = 200;

  		if (w == null || w == '') {
  			w=800;
  		};
  		if (h == null || h == '') {
  			h=($(window).height() - 50);
  		};

  		if(url.indexOf("?") != -1){

  		    //url  = url + "&"+ "_agileAuthToken="+$.getAndSaveToken();

  		}else{

  		    //url  = url +"?_agileAuthToken="+$.getAndSaveToken();
  		}

  		var layIndex = layer.open({
  			type: 2,
  			area: [w+'px', h +'px'],
  			fix: false,
  			maxmin: true,
  			shade:0.4,
  			title: title,
  			content: url,
  		    skin: 'layui-layer-lan',
  			offset : [offSetY+'px' , offSetX+'px'],

  			moveOut:false,
  			closeBtn : closeBtnOpt,
  			cancel:function(){
  			//	showObj();
  			},
  			full:function(){



  			},
  			min:function(){

  			},
  			restore:function(){

  				//var body = layer.getChildFrame('body', layIndex);

  			}
  		});

  		return layIndex;
  	},

    /**
     *关闭窗口
     */
    closeWin:function (){
    	var index = parent.layer.getFrameIndex(window.name);
    	parent.layer.close(index);
    },
    /**
     *关闭所有窗口
     */
    closeAll:function (){
    	layer.closeAll();
    },

    /**
     * @param {Object} retMsg
     * @param {Object} type
     * @param {Object} callBack
     * @param {Object} timeOut
     */
    showDialog: function(retMsg, type, callBack,timeOut){

    	closeAll();

    	var winW = $(document).width();
    	var winH  = $(window).height() == 0 ?$(document).height() :$(window).height();

    	var off = [(winH/2-72)+'px',(winW/2-181)+'px'];

    	if(type == 2){
    		layer.alert(retMsg, {offset:off,title:['\u63d0\u793a\u4fe1\u606f',true],icon: 1,closeBtn:0},function(index){

    			layer.close(index);
    			if($.isFunction(callBack)){

    				callBack.call(this);

    				return ;
    			}

    			if(callBack){
    				var arr = callBack.split("=");
    				eval(arr[1]);
    			}
    		});
    	}else if(type == 1){
    		layer.alert(retMsg, {offset:off,title:['\u63d0\u793a\u4fe1\u606f',true],icon: 0,closeBtn:0},function(index){

    			layer.close(index);


    			if($.isFunction(callBack)){

    				callBack.call(this);

    				return ;
    			}

    			if(callBack){
    				var arr = callBack.split("=");
    				eval(arr[1]);
    			}
    		});
    	}else if(type == 0){
    		layer.alert(retMsg, {offset:off,title:['\u63d0\u793a\u4fe1\u606f',true],icon: 2,closeBtn:0},function(index){

    			layer.close(index);

    			if($.isFunction(callBack)){

    				callBack.call(this);

    				return ;
    			}

    			if(callBack){
    				var arr = callBack.split("=");
    				eval(arr[1]);
    			}
    		});
    	}else if(type == 3){



    		layer.confirm(retMsg,{offset:off,closeBtn:0,title:['\u63d0\u793a\u4fe1\u606f',true],yes:function(index){

    		    layer.close(index);


                if($.isFunction(callBack)){

    				callBack.call(this);
                    return ;
                }

                if(callBack){
                    var arr = callBack.split(";")[0].split("=");
                    eval(arr[1]);
                }
    		}},function(index){
    			layer.close(index);


    			if(callBack && callBack.split(";").length > 1){

                    var arr = callBack.split(";")[1].split("=");
                    eval(arr[1]);
                }

    		},function(index){
    			layer.close(index);

    		});
    	}


    }




}
