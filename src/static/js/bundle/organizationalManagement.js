
  
layui.use([ 'dtree', 'layer','form', 'element'], function () {

  
  var layer = layui.layer;
  var dtree = layui.dtree;
  var form = layui.form;
    var element = layui.element;var firstTag = true;
  //示例日期
   

  initTable();
  function initTable() {
    publicFun.organization(publicFun.treeNode,1,dtree,false,form);
     
  }
  
  
  $(".add").on("click",function(){
    if($(".groupId").val().length==0){
      layer.msg("请选择组织机构")
      return false;
    }
    win("新增子机构","630px","400px",'organizationManagementWin/organizationManagementWin.html?type=add&id='+$(".groupId").val()+"&name="+encodeURI($(".groupName").val()),1)
  })
  $(".edit").on("click",function(){

    if($(".groupId").val().length==0){
      layer.msg("请选择组织机构")
      return false;
    }
    layer.confirm("确认修改？",function(index){
      dataUpdata(2,$(".orgmanag"),index)
    })
    // win("修改机构","630px","400px",'organizationalManagementWin/organizationalManagementWin.html?type=edit&id='+$(".groupId").val()+"&name="+encodeURI($(".pName").val()),2)
  })
  $(".del").on("click",function(){
    if($(".groupId").val().length==0){
      layer.msg("请选择组织机构")
      return false;
    }
     del();
  })
  $('.authmanag').on("click",function(){
    if($(".groupId").val().length==0){
      layer.msg("请选择组织机构")
      return false;
    }
    win("权限管理","830px","500px",'organizationManagementWin/authorityManagement.html?type=add&id='+$(".groupId").val()+"&name="+encodeURI($(".groupName").val()),3)
    
  })
  function win(title, width, height, url,tagType) {
    var obj = {
      btn: ["确定", "取消"],
      type: 2,
      area: [width, height],
      title: title,
      content: url,
      yes:function(index,layero){
        var frameId = "#" + layero.find('iframe')[0].id;
        var sonTemp = $(frameId).contents();
        var formB = sonTemp.find(".layui-form");
        var verifyStr =  publicFun.verify(formB,verify)
        if(verifyStr){
          layer.msg(verifyStr,{icon:5})
        }else{

          if(tagType==3){
            var iframeWin = window[layero.find('iframe')[0]['name']];//得到iframe页的窗口对象，执行iframe页的方法：
            iframeWin.getTree(index,success);
            function success(data){
              layer.msg("分配成功")
              // $(".submission").click();
              layer.close(index)
            }
          }else{

            dataUpdata(tagType,sonTemp,index);
          }
         
        }
        
         
         
      }
    }
    layFun.layer(layer, obj)
  }
  
   
  
  function dataUpdata(tagType,sonTemp,index){
     
    var obj =  publicFun.inputParam(sonTemp.find(".layui-form"));
    // <input type="hidden" name="equipment_typecode"><input type="hidden" name="company_id"> company_name equipment_typename
  
    
    if(tagType==2){
      obj.departNumber = $(".groupId").val();
      var urls = url.organization.edit
    }else{
      var urls = url.organization.add
    }
     var obj2 = {
       url:urls,
       data:obj
     }
    publicFun.ajax(obj2,success);
    function success(data){
     
     

        if(tagType==2){
          layer.msg("保存成功")
        }else{
          layer.msg("添加成功")
        }
        // initTable();
        layer.close(index)
          
       
    }
  }
  

  function del(){
    layer.confirm("确认删除选中数据？", function (index) {

      var obj = {
        url:url.organization.del,
        data:{
          groupId:$(".groupId").val()
        },
        type:"get"
      };
      obj.departNumber = $(".groupId").val();
      publicFun.ajax(obj,success)
      function success(data){
        
       
           
            layer.msg("删除成功")
            initTable();
          //   var nodeList = $.fn.zTree.getZTreeObj("ag-tree");//获取ztree对象  
          // var nodeList = zTreeObj.getNodes();　
          // zTreeObj.expandNode(nodeList[0],true,false,true)
          
          // var node = zTreeObj.getNodeByParam("departCode", "1");
          // zTreeObj.selectNode(node);
          
          // zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, node);//
         
      }
    })
  }
});

