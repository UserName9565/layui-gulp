
var util = {
  isNull: function(val) {

		if (val == null || val == undefined || val == "" || val == "undefined" ||
			val == "null") {
			return true;
		} else {
			return false;
		}
	},
  getString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;

    }
  },
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
  getUrl: function (urls) {
    if (cv == 1) {
      var n = (urls.split('/')).length - 1;

      if (n == 1) {

        urls = "../" + urls.substr(urls.lastIndexOf('/', urls.lastIndexOf('/') - 1) + 1);
      } else {
        urls = urls.substr(urls.lastIndexOf('/', urls.lastIndexOf('/') - 1) + 1);

      }

    } else {

      if (urls.indexOf('.html?') > 0) {

        urls = url.comMethod.getUrl + "?data=views/" + urls.replace(".html?", "&")
      } else {
        urls = url.comMethod.getUrl + "?data=views/" + urls.replace(".html", "")
      }
    }

    return urls
  },
  IEVersion: function () {
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
      return 'edge'; //edge
    } else if (isIE11) {
      return 11; //IE11
    } else {
      return -1; //不是ie浏览器
    }
  },
  activeXHide: function (box) {

    document.getElementById(box).style.width = "0px";
    document.getElementById(box).style.height = "0px";
  },
  activeXShow: function (box, width, height) {

    // var box = document.getElementById(box)
    // box.style.display = "block"
    if (!width) {
      width = "100%"
    }
    if (!height) {
      height = "600px"
    }

    document.getElementById(box).style.width = width;
    document.getElementById(box).style.height = height;
  },
  getPath: function (file) { //获取file的真实地址

    var url = null;
    if (window.createObjcectURL != undefined) {
      url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
  getLogin: function (wen) {
    var obj = null;
    try {
      obj = JSON.parse($.cookie('getPostal'));
      if(!obj){
        return ''
         
      }
      return obj[wen]
   }
   catch(err){
      return ''
      location.href = "./views/login-1.html"
   }
  },
  ajax: function (pObj,success,error) {
    //obj.url  请求地址
   //obj.data  请求数据
   //success   成功回调
   //error     失败回调
   // let defaultObj = {
   //     type:"post",

   // }
   var obj_ajax = {
     pageSize:10,
     isWait:false,
     messageTag:false,
     type:"post"
   };
   pObj = $.extend({},obj_ajax,pObj);
   $.each(pObj.data, function (i, o) { //为了去除ie8 空字符串传到后台变为null的问题
     if (o === "") {
       pObj.data[i] = ""
     }
   })
   
   if (!pObj.isWait) {
     var coverIndex = layer.load(1, {
       shade: [0.1, '#fff'] //0.1透明度的白色背景
     });

   }

   if(pObj.type=="get"){
       var req = pObj.data;
   }else{

     var req = JSON.stringify(pObj.data);
   }
   var url = ''
   if(pObj.url.indexOf("?")!=-1){
     url= pObj.url + "&t=" + Math.random()
   }else{
     url= pObj.url + "?t=" + Math.random()
   }
   jQuery.support.cors = true;
   $.ajax({
     type: pObj.type,
     url:url ,
     dataType:"json",
     cache: false,
     async: true,
     headers: {
       'agileauthtoken': util.getLogin("token")
    },
      
     contentType: "application/json; charset=utf-8",
     data:req,
     
     success: function (data) {
      
       
       if (!pObj.isWait) {
         layer.close(coverIndex)
       }
       if (!data) {
         return false;
       }
       if (typeof data == 'string') {

         data = JSON.parse(data);


       }
        
       // if (data.result == 0) {
           success(data)
       // }   else {
       //   if (pObj.messageTag) {
       //     layer.msg(data.message)
       //   } else {

       //     layer.msg("请求失败")
       //   }
       // }
     },
     error: function (data) {
       
       if (!pObj.isWait) {
         layer.close(coverIndex)
       }
       layer.msg("请求失败")

     }

   });
 },
 inputParam: function (box) {//自动组装表单数据
  var obj = {};
  $.each(box.find("[name]"), function () {
    
    if($(this).attr("type")=="radio"){

      obj[$(this).attr("name")] = box.find('input[name='+$(this).attr("name")+']:checked').val();

    }else{

      obj[$(this).attr("name")] = $(this).val();
    }
  })
  return obj;
} ,
  verify: function (box, veri) {//表单校验
    var str = false;
  
    var pin = box.find("[lay-verify]");

    pin.each(function (i, o) {

      if($(this).attr("isVer")){
        return true;
      }
      if ($(this)[0].tagName == "INPUT" || $(this)[0].tagName == "TEXTAREA") {
        var value1 = $(this).val()
      } else if ($(this)[0].tagName == "SELECT") {
        var value1 = $(this).find("option:selected").html();
      }
      var v = $(this).attr("lay-verify")
      if (v) {
        if (veri[v] instanceof Function) {
          str = veri[v](value1, $(this))
          if (str) {
            $(this).focus().addClass("layui-form-danger")
            return false;
          }
        } else if (veri[v] instanceof Array) {
          if (veri[v][0].test(value1)) {
            return veri[v][1];
          }
          if (str) {
            return false;
          }
        }

      }
    })
    return str;
  }
}
 
var verify = {
  username: function (value, item) { //value：表单的值、item：表单的DOM对象

      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
    }

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,
  pass: [
    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  ],
  phoneNo: function (value, item) {
   
    if (value.length != 0) {
      if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/.test(value)) {
        return '请填写正确手机号码';
      }
    }
    if (value.length == 0) {
      return '请填写正确手机号码';
    }
  },
  opcode:function (value, item) {
    if (value.length != 0) {
      if (!/^[a-zA-Z0-9]{1,20}$/.test(value)) {

        return '业务编码为20以下数字，字母或组合';
      }
    }else{
      return '请填写业务编码';
    }
  },
  requiredM: function (value, item) {
  
    if (!value || value == 0 || value == "请选择..."||value=='') {

      return '必填项不能为空';
    }
  },
  isChar:function (value, item) {

    if (value.length != 0) {
      if (/[\u4e00-\u9fa5]/g.test(value)) {

        return '规则编码不能填写中文';
      }
    }else{
      return '必填项不能为空';
    }
  }
}
 