// var ctx = "http://10.149.85.208:8001"//agile_sign_web的服务
// var ctxTest ="http://10.149.85.208:8003"//agile_sign_seal_web的服务

// var ctx = "http://192.168.1.250:8890"//agile_sign_web的服务
 
var ctx = apiConfig.ctx //agile_sign_web的服务
var oldVersion = apiConfig.oldVersion //agile_sign_seal_web的服务
//  var ctx = "http://192.168.1.79:8080"
var rootD = apiConfig.rootD 
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

var agCtx= util.getAgCtx(null);


var url = {
  login: ctx+"/"+agCtx+ "/sys/login/loginCheck",
  token: ctx+"/"+agCtx+ "/sys/login/auth/token", //菜单
  
  menu: ctx+"/"+agCtx + "/sys/login/auth/functions",
  deparTreeNew:ctx+"/"+agCtx+'/department/selectTopDepart',//新树结构
  deparTreeSon:ctx+"/"+agCtx+'/department/selectChildDeparts',//新树结构
  deparTreeSonTest:ctx+"/"+agCtx+'/department/selectChildDepartsTest',//新树结构测试
  comMethod: {
    upload: ctx+"/"+agCtx + "/fileTransfer/upload",
    download: ctx+"/"+agCtx + "/fileTransfer/download"
  },
  jobNumber:{
    getList:ctx+'/sys/login/queryCLoginMsgPage',
    findById:ctx+"/sys/login/queryLoginByLoginNo",
    add:ctx+"/sys/login/saveLoginMsg",
    edit:ctx+"/sys/login/updateLoginMsg",
    del:ctx+"/sys/login/deleteLoginMsg"
  },
  organization:{
    allTree:ctx+"/sys/groupmsg/queryAllArea",
    getList:ctx+'/sys/login/queryCLoginMsgPage',
    findById:ctx+"/sys/groupmsg/loadGroupMsgById",
    add:ctx+"/sys/groupmsg/add",
    edit:ctx+"/sys/groupmsg/updateGroupMsg",
    del:ctx+"/sys/groupmsg/deleteGroupMsg",
    getNodes:ctx+"/sys/groupmsg/getNodes",
    getGroupMsgByParentGroupId:ctx+"/sys/groupmsg/getParentNodes",
    qx:ctx+'/sys/groupmsg/getDsikillPower',
    initqx:ctx+"/sys/groupmsg/privilegeInit",
    save:ctx+'/sys/groupmsg/saveFunctionInfo'
  },
  
  apiDoc: {
    impression: "/static/layui/json/apiDoc.json"
  }
}


