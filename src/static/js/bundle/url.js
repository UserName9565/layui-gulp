// var ctx = "http://10.149.85.208:8001"//agile_sign_web的服务
// var ctxTest ="http://10.149.85.208:8003"//agile_sign_seal_web的服务

// var ctx = "http://192.168.1.250:8890"//agile_sign_web的服务
 
var ctx = apiConfig.ctx //agile_sign_web的服务
var ctxTest = apiConfig.ctxTest //agile_sign_seal_web的服务
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
  login: ctx + "/log/login.do",
  menu: ctx + "/log/getMenuInfo.do", //菜单
  getName:ctx + "/log/getSession.do", //用户名
  deparTree: ctx + "/department/selectDeparTree.do",
  deparTreeNew:ctx+'/department/selectTopDepart',//新树结构
  deparTreeSon:ctx+'/department/selectChildDeparts',//新树结构
  deparTreeSonTest:ctx+'/department/selectChildDepartsTest',//新树结构测试
  comMethod: {
    upload: ctx + "/fileTransfer/upload",
    download: ctx + "/fileTransfer/download"
  },
  organizationalManagement: {

    edit: ctx + "/department/update.do", //编辑
    add: ctx + "/department/add.do", //增加
    upload: ctx + "/department/selectDepartmentWithNumber.do",
    del: ctx + "/department/delete.do"
  },
  urserManagement: { //用户管理
    getList: ctx + "/user/toSelect.do", //查询列表
    getById: ctx + "/user/selectWithUserId.do", //id查询
    del: ctx + "/user/updateState.do", //停用

    edit: ctx + "/user/update.do", //编辑
    add: ctx + "/user/add.do", //增加
    type: ctx + "/user/getUserIdType.do", //用户管理-证件类型下拉
    act: ctx + "/user/getRoles.do", //用户管理-用户角色下拉
    other: ctx + "/user/getUserState.do" //用户状态下拉

  },
  roleManagement: { //角色管理
    getList: ctx + "/role/select.do", //查询列表
    getById: ctx + "/role/getDataById.do", //id查询
    del: ctx + "/role/deleteRole.do", //停用
    edit: ctx + "/role/update.do", //编辑
    add: ctx + "/role/add.do", //增加
    start: ctx + "/role/noDeleteRole.do", //启用
    type: ctx + "/role/addPermForRole.do", //分配权限
    tree: ctx + "/permission/selectPermsTree.do" //组织机构树

  },
  certificateApplication: { //证书申请
    getList: ctx + "/certInfo/select.do", //查询列表
    getById: ctx + "/certInfo/getDataById.do", //id查询
    del: ctx + "/certInfo/deleteCertInfo.do", //停用
    edit: ctx + "/certInfo/update.do", //编辑
    add: ctx + "/certInfo/addCertInfo.do", //增加
    fs: ctx + "/certInfo/getCertApplyType.do", //申请方式
    urseStatus: ctx + "/certInfo/getCertUseStatus.do", //使用方式
    sx: ctx + "/certInfo/getCertTimeliness.do", //时效
    state: ctx + "/certInfo/getCertStatus.do", //状态
    type: ctx + "/certInfo/getCertType.do", //类型
    getDataByUserInfo: ctx + "/certInfo/getDataByUserInfo.do" //类型

  },
  certificateReview: { //证书审核
    getList: ctx + "/certInfo/approvalList.do", //查询列表

    review: ctx + "/certInfo/approvalCertInfo.do", //审核
  },
  channelManagement: { //渠道管理
    getList: ctx + "/channelInfo/select.do", //查询列表
    getById: ctx + "/channelInfo/getDataById.do", //id查询
    del: ctx + "/channelInfo/delete.do", //删除
    edit: ctx + "/channelInfo/update.do", //编辑
    add: ctx + "/channelInfo/add.do", //增加
    type: ctx + "/channelInfo/getChannelState.do" //渠道管理下拉
  },
  impressionManagement: { //印模管理
    getList: ctx + "/sealModel/select.do", //查询列表
    getById: ctx + "/sealModel/getSealModelWithId.do", //id查询
    del: ctx + "/sealModel/deleteSealModel.do", //删除
    //edit: ctx + "/channelInfo/update.do", //编辑
    add: ctx + "/sealModel/add.do", //增加
    download: ctx + "/sealModel/downloadMakeSealExEFile.do", //下载
    listSearch: ctx + "/sealModel/select.do", //印模列表查询
    codeEnum: ctx + "/sealModel/getSealBvfcodeEnum.do", //印模是否包含业务码
    shape: ctx + "/sealModel/getSealShape.do", //印模形状下拉
    type: ctx + "/sealModel/getStatusCode.do" //印模状态下拉
  },
  impressionReview: {
    getList: ctx + "/sealModel/select.do", //查询列表

    review: ctx + "/sealModel/approveSealModel.do", //审核
  },
  sealManagement: { //印章管理
    getList: ctx + "/seal/select.do", //查询列表
    getById: ctx + "/seal/getDataById.do", //id查询
    del: ctx + "/seal/deleteSealWithId.do", //删除
    //edit: ctx + "/channelInfo/update.do", //编辑
    add: ctx + "/seal/addSeal.do", //增加
    download: ctx + "/seal/dbClickImg.do", //预览
    createType: ctx + "/seal/getSealCreateType.do", //创件方式查询
    modelList: ctx + "/seal/getSealModelList.do", //印模下拉
    addImg: ctx + "/seal/beforeShowSeal.do", //-印章添加-图片预览
    type: ctx + "/sealModel/getStatusCode.do", //印模状态下拉
    disableSeal: ctx + "/seal/disableSeal.do", //停用
    enableSeal: ctx + "/seal/enableSeal.do", //-启用
     
    
  },
  sealAuthorization: { //印章授权
    getList: ctx + "/seal/selectForOrg.do", //查询列表
    type:ctx + "/seal/grantSeal.do", //分配权限
    power:ctx + "/seal/getGrantBySealId.do" //分配权限
  },
  
  sealReview: {
    getList: ctx + "/seal/select.do", //查询列表

    review: ctx + "/seal/approveSeal.do", //审核
  },
  businessManagement: { //业务管理
    getList: ctx + "/business/select.do", //查询列表
    getById: ctx + "/business/getDataById.do", //id查询
    del: ctx + "/business/delete.do", //删除
    edit: ctx + "/business/update.do", //编辑
    add: ctx + "/business/add.do", //增加
    stated: ctx + "/business/getBusinessState.do", //务状态下拉
    type: ctx + "/business/getChannelList.do" //渠道下拉/
  },
  templateManagement: { //业务模板管理
    getList: ctx + "/template/select.do", //查询列表
    getById: ctx + "/template/getDataById.do", //id查询
    edit: ctx + "/template/update.do", //编辑
    add: ctx + "/template/addTemplate.do", //增加
    del: ctx + "/template/deleteTemplate.do", //删除
    isdel: ctx + "/template/selectPDFWithTemplate.do",
    type: ctx + "/business/getBusinessByChannel.do", //渠道下拉/
    list:ctx+'/template/selectList',
    download:ctx+"/template/viewTemplate",
    isup:ctx + "/template/startTemplate"
  },
  signingRules: { //文件签名规则
    getList: ctx + "/ruleInfo/select.do", //查询列表
    getById: ctx + "/ruleInfo/getDataById.do", //id查询
    edit: ctx + "/ruleInfo/updateRuleInfo.do", //编辑
    add: ctx + "/ruleInfo/addRuleInfo.do", //增加
    del: ctx + "/ruleInfo/deleteRuleInfo.do", //删除
    isdel: ctx + "/ruleInfo/checkRuleInfo.do",
    type: ctx + "/ruleInfo/getSignSeal.do", //获取签名签章下拉
    sign: ctx + "/ruleInfo/getSeal.do", //印章下拉获
    cert: ctx + "/ruleInfo/getCertInfoList.do", //证书下拉获取
    getRuleType: ctx + "/ruleInfo/getRuleType.do", //获取签章方式下拉
    teplate: ctx + "/template/getDataByBusinessNo.do", //
    views: ctxTest + "/httpSeal/sealToTemplate",
    getCode:ctx+'/ruleInfo/getRuleId.do'//获取规则编码
  },
  certificateStatistics: { //证书使用日志-证书统计
    getList: ctx + "/tSystemLoggs/selectCountSeal.do", //证书统计
  },
  historyLog: {
    getList: ctx + "/tSystemLoggs/selectSys.do",
    getLogType: ctx + "/tSystemLoggs/getLogType.do", //操作审计-日志类型下拉
    getOperateType: ctx + "/tSystemLoggs/getOperateType.do" //操作审计-操作类型下拉
  },
  certificateUsageLog: {
    getList: ctx + "/tSystemLoggs/selectSeal.do", //查询列表
  },
  selectSealimg: {
    getList: ctx + "/tSystemLoggs/selectSealimg.do", //查询列表
  },
  testSign: {
    test: ctxTest + "/httpSeal/seal",
    Busi: ctxTest + "/httpSeal/getSealImgByBusi",
    ById: ctxTest + "/httpSeal/getSealImgById",
    batchSeal: ctxTest + "/httpSeal/batchSeal",
    watermark: ctxTest + "/httpSeal/watermarkAndPwd",
    sealByXy: ctxTest + "/httpSeal/sealByXy",
    
  },
  apiDoc: {
    impression: "/static/layui/json/apiDoc.json"
  }
}


// publicFun.getLogin()
var json = [{
    title: "基础功能",
    layHref: "html6",
    level: 1,
    "pid": "0",
    id: '6',
    "icon": '&#xe702;'
  },

  {
    title: "证书管理",
    layHref: "&#xe640;",
    level: 1,
    "pid": "0",
    id: '11',
    "icon": '&#xe600;'
  },
  {
    title: "渠道管理",
    layHref: "html8",
    level: 1,
    "pid": "0",
    id: '8',
    "icon": '&#xe65c;'
  },
  {
    title: "模板管理",
    layHref: "html5",
    level: 1,
    "pid": "0",
    id: '5',
    "icon": '&#xe667;'
  },
  {
    title: "业务管理",
    layHref: "htmlsd213",
    level: 1,
    "pid": "0",
    id: '203',
    "icon": '&#xe631;'
  },
  {
    title: "报表统计",
    layHref: "htmlsd3",
    level: 1,
    "pid": "0",
    id: '200',
    "icon": '&#xe607;'
  },
  {
    title: "操作审计",
    layHref: "htmlsd213",
    level: 1,
    "pid": "0",
    id: '201',
    "icon": '&#xe686;'
  },
  {
    title: "签章接口测试",
    layHref: "htmlsd213",
    level: 1,
    "pid": "0",
    id: '202',
    "icon": '&#xe698;'
  },
  // {
  //   title: "帮助",
  //   layHref: "htmlsd21113",
  //   level: 1,
  //   "pid": "0",
  //   id: '204',
  //   "icon": '&#xe606;'
  // },

  {
    title: "机构管理",
    layHref: "basicFunction/organizationalManagement.html",
    level: 2,
    "pid": '6',
    id: 'f12'
  },
  {
    title: "角色管理",
    layHref: "basicFunction/roleManagement.html",
    level: 2,
    "pid": '6',
    id: 'f14'
  },
  {
    title: "用户管理",
    layHref: "basicFunction/urserManagement.html",
    level: 2,
    "pid": '6',
    id: 'f13'
  },




  {
    title: "证书申请",
    layHref: "certificateManagement/certificateApplication.html",
    level: 2,
    "pid": '11',
    id: 'f22'
  },
  {
    title: "证书审核",
    layHref: "certificateManagement/certificateReview.html",
    level: 2,
    "pid": '11',
    id: 'f23'
  },

  {
    title: "渠道管理",
    layHref: "channelManagement/channelManagement.html",
    level: 2,
    "pid": '8',
    id: 'f15'
  },


  {
    title: "印模管理",
    layHref: "templateManagement/impressionManagement.html",
    level: 2,
    "pid": '5',
    id: 'f6'
  },
  {
    title: "印模审批",
    layHref: "templateManagement/impressionReview.html",
    level: 2,
    "pid": '5',
    id: 'f9'
  },
  {
    title: "印章管理",
    layHref: "templateManagement/sealManagement.html",
    level: 1,
    "pid": "5",
    id: '13',
    "icon": '&#xe630;'
  },
  {
    title: "印章授权",
    layHref: "templateManagement/sealAuthorization.html",
    level: 1,
    "pid": "5",
    id: '44',
    "icon": '&#xe630;'
  },
  // {
  //   title: "印章审批",
  //   layHref: "templateManagement/sealReview.html",
  //   level: 2,
  //   "pid": '5',
  //   id: 'f8'
  // },
  {
    title: "业务模板管理",
    layHref: "templateManagement/templateManagement.html",
    level: 3,
    "pid": '5',
    id: 's15'
  },
  {
    title: "PDF文件签名规则",
    layHref: "templateManagement/signingRules.html",
    level: 2,
    "pid": '5',
    id: 'f10'
  },
  {
    title: "签章管理",
    layHref: "templateManagement/signaturemanag.html",
    level: 2,
    "pid": '5',
    id: 'f11'
  },

  {
    title: "签章服务日志统计",
    layHref: "reportStatistics/certificateStatistics.html",
    level: 2,
    "pid": '200',
    id: 'f44'
  },


  {
    title: "历史事件查询",
    layHref: "logManagement/systemLogManagement.html",
    level: 2,
    "pid": '201',
    id: 'f47'
  },
  {
    title: "签章服务日志",
    layHref: "logManagement/certificateUsageLog.html",
    level: 2,
    "pid": '201',
    id: 'f48'
  },
  {
    title: "印章图片获取日志",
    layHref: "logManagement/operationLog.html",
    level: 2,
    "pid": '201',
    id: 'f49'
  },


  // {
  //   title: "前端合成",
  //   layHref: "signatureInterfaceTest/webSynthesis.html",
  //   level: 2,
  //   "pid": '202',
  //   id: 'f65'
  // },
  {
    title: "签章测试",
    layHref: "signatureInterfaceTest/coordinateSignature.html",
    level: 2,
    "pid": '202',
    id: 'f65'
  },
  {
    title: "印章图片测试（业务获取）",
    layHref: "signatureInterfaceTest/signImgForBussy.html",
    level: 2,
    "pid": '202',
    id: 'f65'
  },
  {
    title: "印章图片测试（id获取）",
    layHref: "signatureInterfaceTest/signImgForId.html",
    level: 2,
    "pid": '202',
    id: 'f65'
  },
  {
    title: "批量签章",
    layHref: "signatureInterfaceTest/regionalSignature.html",
    level: 2,
    "pid": '202',
    id: 'f65'
  },
  {
    title: "添加水印",
    layHref: "signatureInterfaceTest/keywordSignature.html",
    level: 2,
    "pid": '202',
    id: 'f65'
  },
  // {
  //   title: "骑缝签章",
  //   layHref: "signatureInterfaceTest/acrossPageSeal.html",
  //   level: 2,
  //   "pid": '202',
  //   id: 'f65'
  // },


  {
    title: "业务管理",
    layHref: "businessManagement/businessManagement.html",
    level: 2,
    "pid": '203',
    id: 'f65'
  }
  // ,{
  //   title: "开发文档",
  //   layHref: "apiDoc/developmentDoc.html",
  //   level: 2,
  //   "pid": '204',
  //   id: 'f67'
  // },
  // {
  //   title: "接口文档",
  //   layHref: "apiDoc/apiDoc.html",
  //   level: 2,
  //   "pid": '204',
  //   id: 'f66'
  // }
]
