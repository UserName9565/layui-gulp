// var ctx = "http://10.149.85.208:8001"//agile_sign_web的服务
// var ctxTest ="http://10.149.85.208:8003"//agile_sign_seal_web的服务

// var ctx = "http://192.168.1.250:8890"//agile_sign_web的服务
 
var ctx = apiConfig.ctx //agile_sign_web的服务
var oldVersion = apiConfig.oldVersion //agile_sign_seal_web的服务
//  var ctx = "http://192.168.1.79:8080"

var cv = 2; //1  开发。2 测试
jQuery.support.cors = true;
if (!console) {

  var console = { //ie console报错 
    log: function (a) {
      return false;
    }
  }
}

var httpUrl = window.location.protocol + "//" + window.location.host;
var url = {
  login: ctx + "/sys/login/loginCheck",
  token: ctx + "/sys/login/auth/token", //菜单
  
  menu: ctx + "/sys/login/auth/functions",
  deparTreeNew:ctx+'/department/selectTopDepart',//新树结构
  deparTreeSon:ctx+'/department/selectChildDeparts',//新树结构
  deparTreeSonTest:ctx+'/department/selectChildDepartsTest',//新树结构测试
  comMethod: {
    upload: ctx + "/fileTransfer/upload",
    download: ctx + "/fileTransfer/download"
  },
  
  apiDoc: {
    impression: "/static/layui/json/apiDoc.json"
  }
}


