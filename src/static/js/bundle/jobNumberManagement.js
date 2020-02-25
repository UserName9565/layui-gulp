layui.use(['form', 'laydate', 'table', 'laypage', 'layer', 'element'], function () {

  var form = layui.form;
  var laydate = layui.laydate;
  var table = layui.table;
  var laypage = layui.laypage;
  var layer = layui.layer;
 
  var element = layui.element;
 
  //示例日期
  var objData = {
    elem: '#timeInstar',
    type:'datetime'
  }
  var objDataend = {
    elem: '#timeInend',
    type:'datetime'
  }
  var startDate=null;var endDate=objDataend.elem;layFun.layData(startDate,endDate,laydate, objData);
  layFun.layData(startDate,endDate,laydate, objDataend);
  //示例两个日期结束
  //添加校验
  form.verify(verify);
  selet();



  form.on('submit(formQuery)', function (data) {


    initTable(data.field);
    //被执行提交的form对象，一般在存在form标签时才会返回

    return false;
  });


  //分页参数配置

  //第一个实例
  $(".ag-btn-query").click();

  function selet() {
    // publicFun.companyName(publicFun.selectIn, $(".company_name"), "company_id", "company_name", false, success);
    // publicFun.equipment_type(publicFun.selectIn, $(".type_name"), "type_code", "type_name", true, success);

    function success() {


      form.render("select")
    }

  }

  function initTable(obj) {
    // var obj = {};
    var urls = url.jobNumber.getList;
    var ajaxObj = {
        url: urls,//  请求地址
        data: obj
    }
    publicFun.ajax(ajaxObj, success);
 

    function success(data) {
    
        tableRender(data)

      
    }
  }
  function tableRender(data) {
    var arr = [
        { type: "radio" }
        , { field: 'loginNoStr', title: '工号' }
        , { field: 'loginNameStr', title: '员工名称' }
        , { field: 'groupIdStr', title: '技能组' }
        , { field: 'opTime', title: '操作时间' }
        , { field: 'validFlag', title: '是否有效' }
        // , { title: '操作', minWidth: 50, templet: '#barDemo', fixed: "right", align: "center" }
    ]
    layFun.tableRender(table, laypage, data, arr)
}


   //监听表头
   table.on('toolbar(ag-table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
  //  var data = obj.data; //获得当前行数据
   var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
   var data = checkStatus.data;  //获取选中行数据
   var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    
    if (layEvent === 'add') { //编辑
      win("新增","630px","400px",'jobNumberManagementWin/jobNumberManagementWin.html?type=add',1)
    }else {
      if(data.length==0){
        layer.msg("请选择一条数据")
        return false;
      }
      if(layEvent === 'del'){
        layer.confirm('确认删除？', function (index) {
            del(data);
        });
      }else{
        win("新增","630px","400px",'jobNumberManagementWin/jobNumberManagementWin.html?type=edit&id='+data[0].loginNoStr,2)
      } 
    }
 });

  function win(title, width, height, url, tagType) {
    var obj = {
      btn: ["确定", "取消"],
      type: 2,
      area: [width, height],
      title: title,
      content: url,
      yes: function (index, layero) {
        var frameId = "#" + layero.find('iframe')[0].id;
        var sonTemp = $(frameId).contents();
        var formB = sonTemp.find(".layui-form");
        var verifyStr =  publicFun.verify(formB,verify)
        if(verifyStr){
          layer.msg(verifyStr,{icon:5})
        }else{
          dataUpdata(tagType,sonTemp,index);
          
          
        }
 
      }
    }
    layFun.layer(layer, obj)
  }



  function dataUpdata(tagType, sonTemp,index) {

    var obj = publicFun.inputParam(sonTemp.find(".layui-form"));
    obj.group = {
      groupId:sonTemp.find(".groupName").attr("groupid"),
      groupName:obj.groupName
    }
     obj.groupId = sonTemp.find(".groupName").attr("groupid");
    //  if(obj.reloginPasswd!==obj.loginPasswd){
    //    layer.msg("两个输入密码不一致");
    //    return false;
    //  }
     
    // obj.company_id = sonTemp.find(".company_name option:selected").attr("keyword");
    if (tagType == 2) {
      
      var urls = url.jobNumber.edit
    } else {
      var urls = url.jobNumber.add
    }

    publicFun.ajax({
      url:urls,
      data:obj
    }, success);

    function success(data) {
      if(data.result==0){

        if (tagType == 2) {
          layer.msg("保存成功")
        } else {
          layer.msg("添加成功")
        }
        
        $(".ag-btn-query").click();
        layer.close(index)
      }else{
        layer.msg(data.desc)
      }
    }
  }
  

  function del(obj) {
     
    var pObj = {
      url: url.jobNumber.del,//  请求地址
      data: obj[0]
    }
    publicFun.ajax(pObj,success);

    function success(data) {
 
        layer.msg("删除成功")
        $(".ag-btn-query").click();
      
    }
  }
  function repass(obj) {
    
    publicFun.ajax(url.jobNumber.pwdReset, common.type, obj, success);

    function success(data) {

      if (data.code == 0) {

        layer.msg("重置成功")
        $(".ag-btn-query").click();
      }
    }
  }
});
